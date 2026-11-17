import type { Session } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { accountsConfigured, supabase } from '../lib/supabase';

export type Profile = { name: string; city: string; state: string };
export type SignUpInput = Profile & { email: string; password: string };

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  userId: string | null;
  email: string | null;
  profile: Profile | null;
  /** Returns needsConfirmation=true when Supabase asks the user to confirm their email first. */
  signUp: (input: SignUpInput) => Promise<{ needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function requireClient() {
  if (!supabase) throw new Error("Accounts aren't switched on yet.");
  return supabase;
}

/** Turns Supabase error messages into friendlier wording. */
export function friendlyAuthError(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/invalid login credentials/i.test(msg)) return 'That email and password don\'t match. Please try again.';
  if (/email not confirmed/i.test(msg)) return 'Please confirm your email first. Check your inbox for the link.';
  if (/already registered|already exists/i.test(msg)) return 'There is already an account with that email. Try signing in.';
  if (/password should be at least/i.test(msg)) return 'Your password needs to be at least 8 characters.';
  if (/network|fetch/i.test(msg)) return 'Couldn\'t reach the server. Check your internet connection.';
  return msg;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  // Remember whose profile was loaded, so a signed-out user never sees a stale one.
  const [loaded, setLoaded] = useState<{ userId: string; profile: Profile | null } | null>(null);
  const [loading, setLoading] = useState(accountsConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!supabase || !userId) return;
    supabase
      .from('profiles')
      .select('name, city, state')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => setLoaded({ userId, profile: data ?? null }));
  }, [userId]);
  const profile = userId && loaded?.userId === userId ? loaded.profile : null;

  const signUp = useCallback(async ({ email, password, name, city, state }: SignUpInput) => {
    const { data, error } = await requireClient().auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim(), city: city.trim(), state: state.trim() } },
    });
    if (error) throw error;
    // Supabase returns a user with no identities when the email is already registered.
    if (data.user && data.user.identities?.length === 0) throw new Error('already registered');
    return { needsConfirmation: !data.session };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await requireClient().auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await requireClient().auth.signOut();
  }, []);

  const deleteAccount = useCallback(async () => {
    const client = requireClient();
    const { error } = await client.rpc('delete_account');
    if (error) throw error;
    await client.auth.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await requireClient().auth.resetPasswordForEmail(email.trim());
    if (error) throw error;
  }, []);

  const value = useMemo(
    () => ({
      configured: accountsConfigured,
      loading,
      userId,
      email: session?.user.email ?? null,
      profile,
      signUp, signIn, signOut, deleteAccount, resetPassword,
    }),
    [loading, userId, session, profile, signUp, signIn, signOut, deleteAccount, resetPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
