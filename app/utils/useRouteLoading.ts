'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useRouteLoading = () => {
  const [loading, setLoading] = useState(false);

  // Avoid using `useRouter` in environments where the router is not mounted
  if (typeof window === 'undefined') {
    return false; // Prevent usage on the server
  }

  const router = useRouter();

  useEffect(() => {
    // Ensure router.events is accessible
    if (!router?.events) return;

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return loading;
};

export default useRouteLoading;
