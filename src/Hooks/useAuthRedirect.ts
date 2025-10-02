'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (session) {
      // User is authenticated, redirect to dashboard
      router.replace('/dashboard');
    }
  }, [session, status, router]);

  return { session, status };
}

export function useProtectedRoute() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // User is not authenticated, redirect to signin
      router.replace('/auth/signin');
    }
  }, [session, status, router]);

  return { session, status };
}
