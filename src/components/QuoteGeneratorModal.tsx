'use client'
import { useModalContext } from "@/context/modal-provider"
import { Fade, Modal } from "@mui/material"
import { ModalCircularProgress, QuoteGeneratorModalContainer, QuoteGeneratorModalInnerContainer, QuoteGeneratorSubtitle, QuoteGeneratorTitle } from "./QuoteGeneratorElements";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuoteGenerator from "./QuoteGenerator";
import { ImageBlobContainer } from "./animations/AnimationElements";
import ImageBlob from "./animations/ImageBlob";
import AnimatedDownloadButton from "./animations/AnimatedDownloadButton";

const QuoteGeneratorModal = () => {
    const { modalState, processingQuote, quoteReceived, setModalState, setProcessingQuote, setQuoteReceived } = useModalContext();
    const handleClose = () => {
        setModalState(false);
        setProcessingQuote(false);
        setQuoteReceived(null);
    }
    const wiseDevQuote = '"If you can center a div, anything is possible."';
    const wiseDevQuoteAuthor = "- a wise senior software engineer";

    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    const handleDownload = () => {
        const link = document.createElement('a');
        if (typeof blobUrl === 'string') {
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        }
    };

    // Function: Handle the receiving of quote card
    useEffect(() => {
        if (quoteReceived) {
            const binaryData = Buffer.from(quoteReceived, 'base64');
            const blob = new Blob([binaryData], { type: 'image/png' });
            const blobUrlGenerated = URL.createObjectURL(blob);
            console.log(blobUrlGenerated);
            setBlobUrl(blobUrlGenerated);

            return () => {
                URL.revokeObjectURL(blobUrlGenerated);
            }
        }
    }, [quoteReceived])
    return (
        <Modal
            id="quote-generator-modal"
            aria-labelledby="quote-generator-modal-title"
            aria-describedby="quote-generator-modal-opens-and-closes-quote-generator"
            open={modalState}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={modalState}>
                <QuoteGeneratorModalContainer>
                    <QuoteGeneratorModalInnerContainer>
                        {/* State 1: Processing Quote  */}
                        {
                            (processingQuote === true && quoteReceived === null) ?
                                (
                                    <>
                                        <ModalCircularProgress size={"8rem"} thickness={2.5} />
                                        <QuoteGeneratorTitle>Generating Quote...</QuoteGeneratorTitle>
                                        <QuoteGeneratorSubtitle style={{ marginTop: "20px" }}>
                                            {wiseDevQuote}
                                            <br></br>
                                            <span style={{ fontSize: 26 }}>{wiseDevQuoteAuthor}</span>
                                        </QuoteGeneratorSubtitle>
                                    </>
                                ) : null
                        }
                        {/* State 2: Quote Received   */}
                        {
                            (quoteReceived !== null) ?
                                <>
                                    <QuoteGeneratorTitle>Quote Generated!</QuoteGeneratorTitle>
                                    <QuoteGeneratorSubtitle style={{ marginTop: "20px" }}>
                                        See a preview:
                                    </QuoteGeneratorSubtitle>
                                    <ImageBlobContainer>
                                        <ImageBlob
                                            blobUrl={blobUrl}
                                        />
                                    </ImageBlobContainer>
                                    <AnimatedDownloadButton
                                        handleDownload={handleDownload}
                                    />
                                </>
                                : null
                        }
                    </QuoteGeneratorModalInnerContainer>
                </QuoteGeneratorModalContainer>
            </Fade>
        </Modal>
    )
}

export default QuoteGeneratorModal;