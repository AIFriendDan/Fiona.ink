import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast.success("Login Successful", {
        description: "Welcome back! Redirecting to admin dashboard...",
      });
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
    } else {
      toast.error("Login Failed", {
        description: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            FIONA<span className="text-electric-purple">.</span>INK
          </h1>
          <p className="text-gray-400">Admin Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                <Mail className="inline mr-2" size={16} />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@fiona.ink"
                className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2 block">
                <Lock className="inline mr-2" size={16} />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-electric-purple hover:bg-electric-purple/90 text-white py-6 text-base shadow-lg shadow-electric-purple/30"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-400 hover:text-electric-cyan transition-colors"
            >
              ← Back to Website
            </button>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          This area is restricted to authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
