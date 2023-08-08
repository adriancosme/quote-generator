"use client"
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
    children: ReactNode;
}

interface ModalContextProps {
    modalState: boolean;
    setModalState: (value: boolean) => void;
    processingQuote: boolean;
    setProcessingQuote: (value: boolean) => void;
    quoteReceived: string | null;
    setQuoteReceived: (value: string | null) => void;
}

export const ModalContext = createContext<ModalContextProps>({
    modalState: false,
    processingQuote: false,
    setProcessingQuote: (_value: boolean) => { },
    quoteReceived: null,
    setQuoteReceived: (_value: string | null) => { },
    setModalState: (_value: boolean) => { },
});
export function ModalProvider({ children }: Props) {
    const [modalState, setModalState] = useState(false);
    const [processingQuote, setProcessingQuote] = useState(false);
    const [quoteReceived, setQuoteReceived] = useState<string | null>(null);
    return <ModalContext.Provider value={{ modalState, setModalState, processingQuote, setProcessingQuote, quoteReceived, setQuoteReceived }}>{children}</ModalContext.Provider>
}

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context;
}

export default ModalProvider;
