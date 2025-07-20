'use client';

import { Button } from '@/components/ui/button';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from '@/store/auth/AuthenticationSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const isInitialized = useSelector(selectIsAuthInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = user?.role;
  // Redirect authenticated users
  useEffect(() => {
    if (!isInitialized || !isAuthenticated) return;

    switch (role) {
      case 'ADMIN':
        router.replace('/admin/dashboard');
        break;
      case 'STUDENT':
        router.replace('/student');
        break;
      case 'USER':
        router.replace('/');
        break;
      default:
        router.replace('/login');
    }
  }, [isInitialized, isAuthenticated, role, router]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Unauthenticated user view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Button
          className="bg-blue-500 text-white"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
      </div>
    );
  }



  if (role === 'USER') {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p className="text-muted-foreground">Welcome to the School Campus</p>
      </div>
    );
}

  // If user is authenticated, but redirect hasn't happened yet
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
};

export default Page;
