"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {

 const [isClient, setisClient] = useState(false);
 const { isOpen, close } = usePracticeModal();

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
        src="/heart.svg"
        alt="Heart"
        height={100}
        width={100}
      />
    </div>
    <DialogTitle className="text-center font-bold text-2xl">
      Practice lesson
    </DialogTitle>
    <DialogDescription className="text-center text-base">
       Use practice lesson to regain hearts and points.You cannot
       loose hearts or points in practice lessons.
    </DialogDescription>
  </DialogHeader>
  <div className="flex justify-center w-full">
</div>
<div className="flex justify-center w-full">
  <Button 
    variant="primary" 
    className="w-full" 
    size="lg" 
    onClick={close}
  >
    I understand
  </Button>
</div>



</DialogContent>

    </Dialog>

 );
};