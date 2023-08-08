'use client'

import { quotesQueryName } from "@/graphql/queries"
import { GraphQLResult } from "@aws-amplify/api-graphql"
import { API } from "aws-amplify"
import { useEffect, useState } from "react"
interface Quote {
    id: string
    queryName: string
    quotesGenerated: number
    createdAt: string
    updatedAt: string
}

// type guard for our fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
    quotesQueryName: {
        items: [Quote];
    };
}> {
    return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}

export default function QuotesGeneratedCounter() {
    const [numberOfQuotes, setNumberOfQuotes] = useState<number>(0)

    const getQuotesGenerated = async () => {
        try {
            const response = await API.graphql<Quote>({
                query: quotesQueryName,
                authMode: "AWS_IAM",
                variables: {
                    queryName: "LIVE"
                }
            });
            if (!isGraphQLResultForquotesQueryName(response)) {
                throw new Error("Unexpected response from API.graphql")
            }
            if (!response.data) {
                throw new Error("No data in response")
            }

            const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
            setNumberOfQuotes(receivedNumberOfQuotes);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuotesGenerated();
    }, []);
    return <>
        Quotes Generated {numberOfQuotes}
    </>
}