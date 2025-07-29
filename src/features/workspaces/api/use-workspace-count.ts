import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';

export const useWorkspaceCount = () => {
  return useQuery(api.workspaces.count); // Your backend should return total workspaces for logged-in user
};
