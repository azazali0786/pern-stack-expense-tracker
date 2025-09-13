import {Transition} from "@headlessui/react";
import React, {Fragment} from "react";

const TransitionWrapper = ({children})=>{
    return (
        <Transition 
            as={Fragment}
            enter='Transition ease-out duration-100'
            enterform='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='Transition ease-in duration-75'
            leaveform='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
        >
            {children}
        </Transition>
    );
};

export default TransitionWrapper;