"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react"


export const UserAvatar = () => {

    const { data: session,status } = useSession();

    console.log(session?.user.profilePicture);

    return (
        <div className="flex justify-center items-center">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={session?.user.profilePicture || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black">
                    <DropdownMenuItem className="cursor-pointer focus:bg-white/20">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-4 cursor-pointer focus:bg-white/20 focus:text-red-700" onClick={() => signOut({ callbackUrl: "/" })}>Log out <LogOut size={15} /></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}