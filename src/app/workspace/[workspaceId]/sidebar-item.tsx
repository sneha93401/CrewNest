// 'use client';

// import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
// import { Trash } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { toast } from 'sonner';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { useConfirm } from '@/hooks/use-confirm';
// import { useWorkspaceId } from '@/hooks/use-workspace-id';
// import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
// import { useRemoveWorkspace } from '@/features/workspaces/api/use-remove-workspace';

// interface PreferencesModelProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   initialValue: string;
// }

// export const PreferencesModel = ({ open, setOpen, initialValue }: PreferencesModelProps) => {
//   const router = useRouter();
//   const workspaceId = useWorkspaceId();
//   const [ConfirmDialog, confirmDeleteWorkspace] = useConfirm('Are you sure?', "This action can't be undone.");

//   const [value, setValue] = useState(initialValue);
//   const [editOpen, setEditOpen] = useState(false);

//   const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
//   const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

//   const handleRemove = async () => {
//     const ok = await confirmDeleteWorkspace();

//     if (!ok) return;

//     removeWorkspace(
//       {
//         id: workspaceId,
//       },
//       {
//         onSuccess: () => {
//           toast.success('Workspace removed.');

//           setOpen(false);
//           router.replace('/');
//         },
//         onError: () => {
//           toast.error('Failed to remove workspace.');
//         },
//       },
//     );
//   };

//   const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     updateWorkspace(
//       {
//         id: workspaceId,
//         name: value,
//       },
//       {
//         onSuccess: () => {
//           toast.success('Workspace updated.');
//           setEditOpen(false);
//         },
//         onError: () => {
//           toast.error('Failed to update workspace.');
//         },
//       },
//     );
//   };

//   return (
//     <>
//       <ConfirmDialog />

//       <Dialog open={open || isUpdatingWorkspace || isRemovingWorkspace} onOpenChange={setOpen}>
//         <DialogContent className="overflow-hidden bg-gray-50 p-0">
//           <DialogHeader className="border-b bg-white p-4">
//             <DialogTitle>{value}</DialogTitle>
//           </DialogHeader>

//           <VisuallyHidden.Root>
//             <DialogDescription>Your workspace preferences</DialogDescription>
//           </VisuallyHidden.Root>

//           <div className="flex flex-col gap-y-2 px-4 pb-4">
//             <Dialog open={editOpen || isUpdatingWorkspace} onOpenChange={setEditOpen}>
//               <DialogTrigger asChild>
//                 <button
//                   disabled={isUpdatingWorkspace || isRemovingWorkspace}
//                   className="flex w-full cursor-pointer flex-col rounded-lg border bg-white px-5 py-4 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//                 >
//                   <div className="flex w-full items-center justify-between">
//                     <p className="text-sm font-semibold">Workspace name</p>

//                     <p className="cursor-pointer text-sm font-semibold text-[#1264A3] hover:underline">Edit</p>
//                   </div>

//                   <p className="text-sm">{value}</p>
//                 </button>
//               </DialogTrigger>

//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Rename this workspace</DialogTitle>
//                 </DialogHeader>

//                 <VisuallyHidden.Root>
//                   <DialogDescription>Rename your workspace to match your case.</DialogDescription>
//                 </VisuallyHidden.Root>

//                 <form className="space-y-4" onSubmit={handleEdit}>
//                   <Input
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     disabled={isUpdatingWorkspace}
//                     required
//                     autoFocus
//                     minLength={3}
//                     maxLength={20}
//                     placeholder="Workspace name e.g 'Work', 'Personal', 'Home'"
//                   />

//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline" disabled={isUpdatingWorkspace}>
//                         Cancel
//                       </Button>
//                     </DialogClose>

//                     <Button disabled={isUpdatingWorkspace}>Save</Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>

//             <button
//               disabled={isRemovingWorkspace}
//               onClick={handleRemove}
//               className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//             >
//               <Trash className="size-4" />
//               <p className="text-sm font-semibold">Delete workspace</p>
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };





// import { type VariantProps, cva } from 'class-variance-authority';
// import type { LucideIcon } from 'lucide-react';
// import Link from 'next/link';
// import type { IconType } from 'react-icons/lib';

// import type { Id } from '@/../convex/_generated/dataModel';
// import { Button } from '@/components/ui/button';
// import { useWorkspaceId } from '@/hooks/use-workspace-id';
// import { cn } from '@/lib/utils';

// const sidebarItemVariants = cva('flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden', {
//   variants: {
//     variant: {
//       default: 'text-[#f9EDFFCC]',
//       active: 'text-[#481349] bg-white/90 hover:bg-white/90',
//     },
//   },
//   defaultVariants: {
//     variant: 'default',
//   },
// });

// interface SidebarItemProps {
//   id: string;
//   icon: LucideIcon | IconType;
//   label: Id<'channels'> | string;
//   variant?: VariantProps<typeof sidebarItemVariants>['variant'];
// }

// export const SidebarItem = ({ id, icon: Icon, label, variant }: SidebarItemProps) => {
//   const workspaceId = useWorkspaceId();

//   return (
//     <Button variant="transparent" size="sm" className={cn(sidebarItemVariants({ variant }))} asChild>
//       <Link href={`/workspace/${workspaceId}/channel/${id}`}>
//         <Icon className="mr-1 size-3.5 shrink-0" />
//         <span className="truncate text-sm">{label}</span>
//       </Link>
//     </Button>
//   );
// };


import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

import type { Id } from '@/../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';

const sidebarItemVariants = cva('flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden', {
  variants: {
    variant: {
      default: 'text-[#f9EDFFCC]',
      active: 'text-[#481349] bg-white/90 hover:bg-white/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface SidebarItemProps {
  id: string;
  icon: LucideIcon | IconType;
  label: Id<'channels'> | string;
  variant?: VariantProps<typeof sidebarItemVariants>['variant'];
}

export const SidebarItem = ({ id, icon: Icon, label, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button variant="transparent" size="sm" className={cn(sidebarItemVariants({ variant }))} asChild>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="mr-1 size-3.5 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};