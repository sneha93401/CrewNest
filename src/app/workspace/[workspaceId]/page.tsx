'use client';

import { Loader, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { useCreateChannelModel } from '@/features/channels/Store/use-create-channel-model';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
// import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useCurrentMember } from '@/features/members/api/use-current-member';
const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModel();
const {data:workspace,isLoading:workspaceLoading} =  useGetWorkspace({id: workspaceId});
  // const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });
const {data:member, isLoading:memberLoading} = useCurrentMember({
  workspaceId
});
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isadmin = useMemo(()=>member?.role === 'admin', [member?.role])

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) return;

    if (channelId) router.push(`/workspace/${workspaceId}/channel/${channelId}`);

    else if (!open && isadmin) setOpen(true);
  }, [member,memberLoading, isadmin,  channelsLoading, workspace, open, setOpen, router, workspaceId]);

  if (workspaceLoading || channelsLoading || memberLoading ) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 bg-[#5E2C5F]/95 text-white">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 bg-[#5E2C5F]/95 text-white">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm">Workspace not found! you have to make Workspace first.</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 bg-[#5E2C5F]/95 text-white">
      <TriangleAlert className="size-5 text-muted-foreground" />
      <span className="text-sm">No Channel(s) found! you have to make channel first.</span>
    </div>
  );

};

export default WorkspaceIdPage;