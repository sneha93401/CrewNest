'use client';

import { useEffect, useState } from 'react';

import { CreateWorkspaceModel } from '@/features/workspaces/components/create-workspace-model';
import { CreateChannelModel } from '@/features/channels/components/create-channel-model';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <CreateChannelModel/>
      <CreateWorkspaceModel />
    </>
  );
};
