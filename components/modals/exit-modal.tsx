"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
 const router = useRouter();
 const [isClient, setisClient] = useState(false);
 const { isOpen, close } = useExitModal();

 useEffect(() => setisClient(true), []);

 if (!isClient) {
    return null;
 }

 return (
    <Dialog open={isOpen} onOpenChange={close}>
   <DialogContent className="max-w-md">
  <DialogHeader className="flex flex-col items-center text-center">
    <div className="mb-5">
      <Image
        src="/mascot_sad.jpg"
        alt="Mascot"
        height={80}
        width={80}
      />
    </div>
    <DialogTitle className="text-center font-bold text-2xl">
      Wait, don't go!
    </DialogTitle>
    <DialogDescription className="text-center text-base">
        You're about to meave the lesson. Are you sure?
    </DialogDescription>
  </DialogHeader>
  <div className="flex justify-center w-full">
  <Button 
    variant="primary" 
    className="max-w-xs w-full" 
    size="lg" 
    onClick={close}
  >
    Keep learning
  </Button>
</div>
<div className="flex justify-center w-full">
  <Button 
    variant="dangerOutline" 
    className="w-full" 
    size="lg" 
    onClick={() => {
        close();
        router.push("/learn");
    }}
  >
    End session
  </Button>
</div>



</DialogContent>

    </Dialog>

 );
};