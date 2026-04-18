#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class TattooBookingAPITester:
    def __init__(self, base_url="https://fiona-ink.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_booking_id = None

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json() if response.text else {}
                    if response_data:
                        print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    response_data = {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")
                response_data = {}

            return success, response_data

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )

    def test_create_booking(self):
        """Test creating a new booking"""
        booking_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-555-123-4567",
            "tattooIdea": "Dragon tattoo on my back with intricate details and vibrant colors",
            "preferredDate": "2025-02-15",
            "bodyPlacement": "Upper back",
            "size": "10x12 inches"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "api/bookings",
            201,
            data=booking_data
        )
        
        if success and 'id' in response:
            self.created_booking_id = response['id']
            print(f"   Created booking ID: {self.created_booking_id}")
            
        return success, response

    def test_create_booking_minimal(self):
        """Test creating a booking with only required fields"""
        booking_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com", 
            "phone": "+1-555-987-6543",
            "tattooIdea": "Small rose tattoo on wrist"
        }
        
        return self.run_test(
            "Create Booking (Minimal)",
            "POST",
            "api/bookings",
            201,
            data=booking_data
        )

    def test_create_booking_validation_error(self):
        """Test booking creation with invalid data"""
        invalid_data = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid email
            "phone": "123",  # Too short
            "tattooIdea": "Short"  # Too short
        }
        
        return self.run_test(
            "Create Booking (Validation Error)",
            "POST",
            "api/bookings",
            422,  # Validation error
            data=invalid_data
        )

    def test_get_all_bookings(self):
        """Test getting all bookings"""
        return self.run_test(
            "Get All Bookings",
            "GET",
            "api/bookings",
            200
        )

    def test_get_booking_by_id(self):
        """Test getting a specific booking by ID"""
        if not self.created_booking_id:
            print("⚠️  Skipping - No booking ID available")
            return False, {}
            
        return self.run_test(
            "Get Booking by ID",
            "GET",
            f"api/bookings/{self.created_booking_id}",
            200
        )

    def test_get_booking_not_found(self):
        """Test getting a non-existent booking"""
        return self.run_test(
            "Get Booking (Not Found)",
            "GET",
            "api/bookings/non-existent-id",
            404
        )

    def test_get_booking_stats(self):
        """Test getting booking statistics"""
        return self.run_test(
            "Get Booking Stats",
            "GET",
            "api/bookings/stats/count",
            200
        )

    def test_update_booking_status(self):
        """Test updating booking status"""
        if not self.created_booking_id:
            print("⚠️  Skipping - No booking ID available")
            return False, {}
            
        status_data = {"status": "confirmed"}
        
        return self.run_test(
            "Update Booking Status",
            "PATCH",
            f"api/bookings/{self.created_booking_id}/status",
            200,
            data=status_data
        )

    def test_get_bookings_with_filter(self):
        """Test getting bookings with status filter"""
        return self.run_test(
            "Get Bookings (Filtered)",
            "GET",
            "api/bookings?status=pending&limit=10",
            200
        )

def main():
    print("🚀 Starting Tattoo Booking API Tests")
    print("=" * 50)
    
    tester = TattooBookingAPITester()
    
    # Test sequence
    test_results = []
    
    # Basic API tests
    test_results.append(tester.test_api_root())
    
    # Booking creation tests
    test_results.append(tester.test_create_booking())
    test_results.append(tester.test_create_booking_minimal())
    test_results.append(tester.test_create_booking_validation_error())
    
    # Booking retrieval tests
    test_results.append(tester.test_get_all_bookings())
    test_results.append(tester.test_get_booking_by_id())
    test_results.append(tester.test_get_booking_not_found())
    
    # Statistics test
    test_results.append(tester.test_get_booking_stats())
    
    # Status update test
    test_results.append(tester.test_update_booking_status())
    
    # Filtered retrieval test
    test_results.append(tester.test_get_bookings_with_filter())
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.created_booking_id:
        print(f"\n📝 Created booking ID for further testing: {tester.created_booking_id}")
    
    # Return exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())