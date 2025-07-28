"use client";

import { Loader } from "lucide-react";
import type { PropsWithChildren } from "react";

import type { Id } from "@/../convex/_generated/dataModel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Profile } from "@/features/members/components/profile";
import { Thread } from "@/features/messages/components/thread";
import { usePanel } from "@/hooks/use-panel";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

const WorkspaceIdLayout = ({ children }: Readonly<PropsWithChildren>) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();

  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh_-_40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="slack-clone-workspace-layout"
        >
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={10} minSize={10}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={25} defaultSize={30} maxSize={32}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <div className="user-profile">
                    <Profile
                      memberId={profileMemberId as Id<"members">}
                      onClose={onClose}
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
