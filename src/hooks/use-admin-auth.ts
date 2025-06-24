'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase/clientApp';

const auth = getAuth(app);
const adminEmail = 'admin@example.com';

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.email === adminEmail) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            router.push('/');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading, isAdmin };
}
