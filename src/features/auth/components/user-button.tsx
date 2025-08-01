"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
    const {signOut} = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if(!data){
        return null;
    }

    const {image,name } = data;

    const avatarFallbackText = name!.charAt(0).toUpperCase();
    
    return (
        <DropdownMenu modal={false} >
            <DropdownMenuTrigger className="outline-none relative flex jusify-center items-center">
                <Avatar className=" size-10 hover:opacity-75 transition ">
                    <AvatarImage  alt = {name} src={image}/>
                    <AvatarFallback className="bg-[#040705] text-white">
                        {avatarFallbackText}
                    </AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => signOut()} className="h-10">
                <LogOut className="size-4 mr-2"/>
                Log Out
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}



// 'use client';

// import { useAuthActions } from '@convex-dev/auth/react';
// import { Loader, LogOut } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// import { useCurrentUser } from '../api/use-current-user';

// export const UserButton = () => {
//   const router = useRouter();
//   const { signOut } = useAuthActions();
//   const { data, isLoading } = useCurrentUser();

//   if (isLoading) {
//     return <Loader className="size-4 animate-spin text-muted-foreground" />;
//   }

//   if (!data) {
//     return null;
//   }

//   const { image, name } = data;

//   const avatarFallback = name?.charAt(0).toUpperCase();

//   return (
//     <DropdownMenu modal={false}>
//       <DropdownMenuTrigger className="relative outline-none">
//         <Avatar className="size-10 transition hover:opacity-75">
//           <AvatarImage alt={name} src={image} />

//           <AvatarFallback className="text-base">{avatarFallback}</AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="center" side="right" className="w060">
//         <DropdownMenuItem
//           onClick={async () => {
//             await signOut();

//             router.replace('/auth');
//           }}
//           className="h-10"
//         >
//           <LogOut className="mr-2 size-4" />
//           Log out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
