import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, {Fragment} from "react";

const DialogWrapper = ({isOpen, closeModel, children})=>{
    return(
        <Transition appear show= {isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={closeModel}>
            <TransitionChild 
                as={Fragment}
                enter='ease-out duration-300'
                enterForm='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveForm='opacity-100'
                leaveTo='opacity-0'
            >
                <div className="fixed inset-0 bg-black/60"/>
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild 
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterForm='opacity-0 scale-95'
                     enterTo='opacity-100 scale-100'
                     leave='ease-in duration-200'
                     leaveForm='opacity-100 scale-100'
                     leaveTo='opacity-0 scale-95'
                    >
                        {children}
                    </TransitionChild>
                </div>

            </div>
            </Dialog>

        </Transition>
    )
}