// components/AuthRedirect.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const profile = useQuery(api.profiles.getProfileByUserId);
  const user = useQuery(api.users.current); // Assuming you have this

  useEffect(() => {
    if (user && profile === null) {
      // router.push('/user-detail-form');
      router.push('/complete-profile');
    }
  }, [user, profile, router]);

  return <>{children}</>;
}
