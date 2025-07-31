'use client';

import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { UserButton } from '@/features/auth/components/user-button'; 

import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'; 
import { useCreateWorkspaceModel } from '@/features/workspaces/store/use-create-workspace-model'; 

export default function Home() {
   
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModel(); 

  const { data = [], isLoading = true } = useGetWorkspaces() || {}; // Add fallbacks

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 bg-[#004030]/95 text-white">
      <Loader className="size-5 animate-spin" />
      <UserButton />
    </div>
  );
};