'use client';
import { useSession } from 'next-auth/react';

type AuthCheckProps = {
    children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
    const { data: session, status } = useSession();
    console.log(session, status)
    if (status !== 'authenticated') return (<></>);

    return (<>{children}</>);
}