import { useState } from "react";
  
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  }from "@/components/ui/dialog";

import{useCreateChannelModel} from "../Store/use-create-channel-model";
import { useCreateChannel } from "../api/use-create-channel";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

  export const CreateChannelModel = () => {

  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModel()
  const {mutate, isPending} = useCreateChannel();
 const router = useRouter();

  const [name,setName] = useState("");

  const handleClose = () =>{
    setName("");
    setOpen(false);
  };



  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value)
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    mutate(
      {name, workspaceId },
      {
        onSuccess: (id) =>{
          toast.success("channel created !");
          router.push(`/workspace/${workspaceId}/channel/${id}`)
          console.log(id); // trial
          handleClose()
        },
        onError: () => {
          toast.error("failed to create channel")
      },
      }     
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
    <DialogHeader>
        <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
          value={name}
          disabled ={isPending}
          onChange={handleChange}
          required
          autoFocus
          minLength={3}
          maxLength={80}
          placeholder='e.g. plane-budget'
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>
              Add
            </Button>

          </div>
        </form>
      </DialogContent>
    </Dialog>
    );
  }