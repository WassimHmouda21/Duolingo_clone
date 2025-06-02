"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
 const router = useRouter();
 const [isClient, setisClient] = useState(false);
 const { isOpen, close } = useHeartsModal();

 useEffect(() => setisClient(true), []);

const onClick = () => {
  close();
  router.push("/store");
};

 if (!isClient) {
    return null;
 }

 return (
    <Dialog open={isOpen} onOpenChange={close}>
   <DialogContent className="max-w-md">
  <DialogHeader className="flex flex-col items-center text-center">
    <div className="mb-5">
      <Image
        src="/mascot-bad.jpeg"
        alt="Mascot"
        height={80}
        width={80}
      />
    </div>
    <DialogTitle className="text-center font-bold text-2xl">
      You ran out of hearts!
    </DialogTitle>
    <DialogDescription className="text-center text-base">
       Get Pro for unlimited hearts, or purchase them in the store.
    </DialogDescription>
  </DialogHeader>
  <div className="flex justify-center w-full">
  <Button 
    variant="primary" 
    className="max-w-xs w-full" 
    size="lg" 
    onClick={onClick}
  >
    Get unlimited hearts
  </Button>
</div>
<div className="flex justify-center w-full">
  <Button 
    variant="dangerOutline" 
    className="w-full" 
    size="lg" 
    onClick={close}
  >
    No thanks
  </Button>
</div>



</DialogContent>

    </Dialog>

 );
};