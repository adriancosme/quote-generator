'use client'
import { ReactNode, SyntheticEvent } from "react";
import { GenerateQuoteButton as GenerateQuoteButtonSC, GenerateQuoteButtonText } from "./QuoteGeneratorElements";
import { useModalContext } from "@/context/modal-provider";
import { API } from "aws-amplify";
import { generateAQuote } from "@/graphql/queries";


interface Props {
    children: ReactNode;
}

interface GenerateAQuoteData {
    generateAQuote: {
        statusCode: number;
        headers: { [key: string]: string };
        body: string;
    }
}

export default function GenerateQuoteButton({ children }: Props) {
    const { setModalState, setProcessingQuote, setQuoteReceived } = useModalContext();
    const handleOnClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        setModalState(true);
        setProcessingQuote(true);
        try {
            const runFunction = "runFunction";
            const runFunctionStringified = JSON.stringify(runFunction);
            const response = await API.graphql<GenerateAQuoteData>({
                query: generateAQuote,
                authMode: "AWS_IAM",
                variables: {
                    input: runFunctionStringified
                }
            });
            const responseStringified = JSON.stringify(response);
            const responseReStringified = JSON.stringify(responseStringified);
            const bodyIndex = responseReStringified.indexOf("body=") + 5;
            const bodyAndBase64 = responseReStringified.substring(bodyIndex);
            const bodyArray = bodyAndBase64.split(",");
            const body = bodyArray[0];
            console.log(body);
            setQuoteReceived(body);
            setProcessingQuote(false);
            
        } catch (error) {
            console.log(error);
        } finally {
            setProcessingQuote(false);
        }
    }
    return (
        <GenerateQuoteButtonSC onClick={handleOnClick} type="button">
            <GenerateQuoteButtonText>
                {children}
            </GenerateQuoteButtonText>
        </GenerateQuoteButtonSC>);
}
