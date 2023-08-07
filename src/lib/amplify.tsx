'use client'
import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';
Amplify.configure({...awsExports, ssr: true});

export default function AmplifyProvider({ children }: React.PropsWithChildren) {
    return <>{children}</>
}