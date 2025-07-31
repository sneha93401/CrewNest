// src/features/profiles/api/use-current-profile.ts
import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';

export const useCurrentProfile = (userId?: string) => {
  return useQuery(api.profiles.getProfile, userId ? { userId } : "skip");
};
