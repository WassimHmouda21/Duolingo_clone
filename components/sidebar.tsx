import { cn } from "@/lib/utils";
import Image from "next/image";
import { ClerkLoaded,
      ClerkLoading,
      UserButton } from "@clerk/nextjs";
import { SidebarItem } from "./ui/sidebar-item";
import { Loader } from "lucide-react";
import Link from "next/link";
type Props = {
    className?: string;
  };


export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
           className,
          )}
          >
            <Link href="/learn">
           <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                      <Image src="/Duolingo.png" height={40} width={40} alt="Mascot" />
                      <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                         Lingo
                      </h1>
                  </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                 label="Learn" 
                 href={"/learn"} 
                 iconSrc={"/Learn.png"}
                 />
                  <SidebarItem
                 label="Leaderboard" 
                 href={"/leaderboard"} 
                 iconSrc={"/Leaderboard.png"}
                 />
                  <SidebarItem
                 label="quests" 
                 href={"/quests"} 
                 iconSrc={"/Quests.jpg"}
                 />
                  <SidebarItem
                 label="shop" 
                 href={"/shop"} 
                 iconSrc={"/shop.png"}
                 />
                
            </div>
            <div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />

                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    );
};