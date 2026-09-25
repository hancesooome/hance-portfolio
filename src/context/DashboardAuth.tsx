import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const AUTHORIZED_DASHBOARD_EMAIL = 'hancedagondon@gmail.com';

interface DashboardAuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  sendAccessLink: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const DashboardAuthContext = createContext<DashboardAuthContextValue | undefined>(undefined);

export const DashboardAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(data.session ?? null);
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isAuthorized = session?.user?.email?.toLowerCase() === AUTHORIZED_DASHBOARD_EMAIL;

  const sendAccessLink = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return { error: 'Enter an email address.' };
    }

    if (normalizedEmail !== AUTHORIZED_DASHBOARD_EMAIL) {
      return { error: 'This dashboard is restricted to the site owner.' };
    }

    const redirectTo = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: { emailRedirectTo: redirectTo },
    });

    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    loading,
    isAuthorized,
    sendAccessLink,
    signOut,
  }), [session, loading, isAuthorized]);

  return <DashboardAuthContext.Provider value={value}>{children}</DashboardAuthContext.Provider>;
};

export const useDashboardAuth = () => {
  const context = useContext(DashboardAuthContext);

  if (!context) {
    throw new Error('useDashboardAuth must be used within a DashboardAuthProvider');
  }

  return context;
};
