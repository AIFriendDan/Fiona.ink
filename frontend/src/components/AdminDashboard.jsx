import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import {
  LogOut,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Ruler,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBookings();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = filterStatus !== 'all' ? { status: filterStatus } : {};
      
      const response = await axios.get(
        `${BACKEND_URL}/api/bookings`,
        {
          params,
          withCredentials: true
        }
      );
      
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/bookings/stats/count`,
        { withCredentials: true }
      );
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/bookings/${bookingId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      toast.success('Status Updated', {
        description: `Booking status changed to ${newStatus}`,
      });
      
      fetchBookings();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50', icon: Clock },
      confirmed: { color: 'bg-blue-500/20 text-blue-500 border-blue-500/50', icon: CheckCircle },
      completed: { color: 'bg-green-500/20 text-green-500 border-green-500/50', icon: CheckCircle },
      cancelled: { color: 'bg-red-500/20 text-red-500 border-red-500/50', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                FIONA<span className="text-electric-purple">.</span>INK
              </h1>
              <p className="text-sm text-gray-400">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-700 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-500/10 border-yellow-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-yellow-500">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-500/10 border-blue-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-500">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">{stats.confirmed}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500/10 border-green-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-500">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-500/10 border-red-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-red-500">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{stats.cancelled}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Booking Requests</h2>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="py-12 text-center">
              <AlertCircle className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400 text-lg">No bookings found</p>
              <p className="text-gray-600 text-sm mt-2">New booking requests will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="bg-gray-900/50 border-gray-800 hover:border-electric-purple/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">{booking.name}</CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        Submitted {formatDate(booking.created_at)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Contact Info */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white">
                          <Mail size={16} className="text-electric-cyan" />
                          <a href={`mailto:${booking.email}`} className="hover:text-electric-cyan transition-colors">
                            {booking.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Phone size={16} className="text-electric-cyan" />
                          <a href={`tel:${booking.phone}`} className="hover:text-electric-cyan transition-colors">
                            {booking.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Tattoo Details */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase">Tattoo Details</h4>
                      <div className="space-y-2">
                        {booking.body_placement && (
                          <div className="flex items-center gap-2 text-white">
                            <MapPin size={16} className="text-neon-green" />
                            {booking.body_placement}
                          </div>
                        )}
                        {booking.size && (
                          <div className="flex items-center gap-2 text-white">
                            <Ruler size={16} className="text-neon-green" />
                            {booking.size}
                          </div>
                        )}
                        {booking.preferred_date && (
                          <div className="flex items-center gap-2 text-white">
                            <Calendar size={16} className="text-neon-green" />
                            {booking.preferred_date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tattoo Idea */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Tattoo Idea</h4>
                    <p className="text-white bg-black/30 p-4 rounded-lg">
                      {booking.tattoo_idea}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-800 flex-wrap">
                    <span className="text-sm text-gray-400">Actions:</span>
                    <div className="flex gap-2 flex-wrap">
                      {booking.status !== 'confirmed' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          size="sm"
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 border border-blue-500/50"
                        >
                          Confirm
                        </Button>
                      )}
                      {booking.status !== 'completed' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          size="sm"
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/50"
                        >
                          Complete
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          size="sm"
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50"
                        >
                          Cancel
                        </Button>
                      )}
                      {booking.status === 'confirmed' && booking.preferred_date && (
                        <Button
                          onClick={() => sendReminder(booking.id, booking.name)}
                          size="sm"
                          className="bg-electric-cyan/20 hover:bg-electric-cyan/30 text-electric-cyan border border-electric-cyan/50"
                        >
                          📧 Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
