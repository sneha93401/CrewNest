
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useCreateWorkspace } from '../api/use-create-workspace';
import { useCreateWorkspaceModel } from '../store/use-create-workspace-model';

export const CreateWorkspaceModel = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [open, setOpen] = useCreateWorkspaceModel();
  const { isPending, mutate } = useCreateWorkspace();
  const [showNote, setShowNote] = useState(false);


  // const handleClose = () => {
  //   setOpen(false);
  //   setName('');
  // };
const handleClose = () => {
  if (!name.trim()) {
    setShowNote(true);
    return;
  }

  setOpen(false);
  setName('');
  setShowNote(false);
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ name },
      {
        onSuccess: (id) => {
          toast.success('Workspace created!');
          router.push(`/workspace/${id}`);

          handleClose();
        },
        onError: (error) => {
          console.error('[CREATE_WORKSPACE]: ', error);
          toast.error('Failed to create workspace.');
        },
      },
    );
  };

  return (
    <Dialog open={open || isPending} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            maxLength={20}
            placeholder="Workspace name e.g 'Work', 'Personal', 'Home'"
          />
          {showNote && (
    <p className="text-sm text-red-500">
      Note: you have to make at least one workspace.
    </p>
  )}

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

