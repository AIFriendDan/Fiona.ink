# Instagram Feed Integration Instructions

## Current Status
✅ Mock Instagram feed is currently displayed with placeholder data
🔄 Ready to connect to real Instagram API when credentials are available

## How to Connect Your Real Instagram Account

### Step 1: Convert to Instagram Business Account
1. Open Instagram app on your phone
2. Go to Settings > Account
3. Select "Switch to Professional Account"
4. Choose "Business" or "Creator"
5. Complete the setup process

### Step 2: Create a Meta App
1. Go to https://developers.facebook.com/apps
2. Click "Create App"
3. Select "Business" as app type
4. Fill in app details and create
5. Add "Instagram" product to your app

### Step 3: Get Your Credentials
You'll need these 3 pieces of information:

1. **App ID** - Found in App Dashboard
2. **App Secret** - Found in App Dashboard > Settings > Basic
3. **Instagram Business Account User ID** - Get from Graph API Explorer

### Step 4: Update Backend Configuration

Add these to `/app/backend/.env`:

```env
INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
INSTAGRAM_USER_ID=your_user_id_here
```

### Step 5: Get Access Token

Run the OAuth flow to get your access token:
1. Visit: http://localhost:8000/api/auth/login
2. Authorize the app
3. Copy the long-lived token from the response
4. Add to `.env` file:

```env
INSTAGRAM_LONG_LIVED_TOKEN=your_token_here
```

### Step 6: Update Frontend Component

Replace the mock data in `/app/frontend/src/components/InstagramFeed.jsx` with real API calls:

```javascript
// Replace mockPosts with API call
useEffect(() => {
  const fetchInstagramPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/instagram/media/${INSTAGRAM_USER_ID}`
      );
      setPosts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      setLoading(false);
    }
  };

  fetchInstagramPosts();
}, []);
```

### Step 7: Add Auto-Refresh (Optional)

To automatically fetch new posts every 5 minutes:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchInstagramPosts();
  }, 300000); // 5 minutes

  return () => clearInterval(interval);
}, []);
```

## Backend API Endpoints (When Implemented)

- `GET /api/instagram/profile/{user_id}` - Get profile info
- `GET /api/instagram/media/{user_id}` - Get recent media posts
- `GET /api/auth/login` - Start OAuth flow
- `GET /api/auth/callback` - OAuth callback handler

## Rate Limits

Instagram Graph API has rate limits:
- 200 calls per hour per user
- Implement caching to avoid hitting limits
- Consider refreshing feed every 5-10 minutes max

## Token Refresh

Long-lived tokens expire after 60 days. Set up automatic refresh:

1. Check token expiry date
2. Refresh before expiration using `/refresh_access_token` endpoint
3. Update stored token

## Testing

Once connected, test these scenarios:
- ✅ Posts display correctly in grid
- ✅ Likes and comments show
- ✅ Clicking posts opens Instagram
- ✅ Mobile responsive layout works
- ✅ Auto-refresh updates feed
- ✅ Error handling for API failures

## Troubleshooting

**Issue: "Invalid OAuth Token"**
- Check that your token is a long-lived token
- Verify it hasn't expired (60 days)
- Ensure the account is Business/Creator type

**Issue: "Rate Limit Exceeded"**
- Implement caching
- Increase refresh interval
- Check for infinite loops in API calls

**Issue: "No posts showing"**
- Verify user ID is correct
- Check account privacy settings
- Ensure app has proper permissions

## Need Help?

Refer to the comprehensive integration playbook I provided for detailed implementation steps, or reach out with your specific issue.

---

**Current Mock Data Location:**
- Component: `/app/frontend/src/components/InstagramFeed.jsx`
- Mock data: Lines 10-87 (mockPosts array)
