"use client"
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
    children: ReactNode;
}

export const ModalContext = createContext({
    modalState: false,
    setModalState: (_value: boolean) => { },
});
export function ModalProvider({ children }: Props) {
    const [modalState, setModalState] = useState(false);
    return <ModalContext.Provider value={{ modalState, setModalState }}>{children}</ModalContext.Provider>
}

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context;
}

export default ModalProvider;
