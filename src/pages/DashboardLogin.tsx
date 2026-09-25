import React, { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Mail, ShieldAlert, Send, LogOut } from 'lucide-react';
import { useDashboardAuth } from '../context/DashboardAuth';

export const DashboardLogin = () => {
  const { isAuthorized, loading, session, sendAccessLink, signOut } = useDashboardAuth();
  const [email, setEmail] = useState('hancedagondon@gmail.com');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || '/dashboard';
  }, [location.state]);

  if (loading) {
    return <div className="pt-32 text-center text-warm-gray/50">Loading access panel...</div>;
  }

  if (isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    const result = await sendAccessLink(email);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Access link sent. Check the inbox for the admin email address.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-midnight flex items-center justify-center">
      <div className="w-full max-w-lg glass rounded-3xl border border-white/10 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-orange-vibrant/15 text-orange-vibrant">
            <ShieldAlert size={22} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-gray/40 font-mono">Private Access</p>
            <h1 className="text-3xl font-bold text-white tracking-tighter">Dashboard Login</h1>
          </div>
        </div>

        <p className="text-warm-gray/60 mb-8 leading-relaxed">
          This area is restricted to the site owner. Enter the owner email to receive a secure sign-in link.
        </p>

        {session?.user?.email && !isAuthorized && (
          <div className="mb-6 p-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-100 text-sm flex items-start gap-3">
            <ShieldAlert size={18} className="mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Signed in with an unauthorized account.</p>
              <p className="text-amber-100/80 mt-1">Sign out and use the owner email to continue.</p>
            </div>
            <button
              onClick={async () => {
                await signOut();
                navigate('/dashboard/login', { replace: true });
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-xs font-mono uppercase tracking-widest text-warm-gray/35 mb-2">Owner email</span>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray/30" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-orange-vibrant/50 transition-all"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}
          {message && <p className="text-sm text-emerald-400">{message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-vibrant text-white rounded-2xl font-semibold hover:bg-orange-vibrant/90 transition-all disabled:opacity-50"
          >
            <Send size={18} />
            {isSubmitting ? 'Sending link...' : 'Send secure sign-in link'}
          </button>
        </form>
      </div>
    </div>
  );
};
