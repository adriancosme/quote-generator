'use client'
import { ReactNode } from "react";
import { GenerateQuoteButton as GenerateQuoteButtonSC, GenerateQuoteButtonText } from "./QuoteGeneratorElements";
import { useModalContext } from "@/context/modal-provider";


interface Props {
    children: ReactNode;
}

export default function GenerateQuoteButton({ children }: Props) {
    const { setModalState } = useModalContext();
    const handleOnClick = (e: any) => {
        e.preventDefault();
        setModalState(true);
    }
    return (
        <GenerateQuoteButtonSC onClick={handleOnClick} type="button">
            <GenerateQuoteButtonText>
                {children}
            </GenerateQuoteButtonText>
        </GenerateQuoteButtonSC>);
}
