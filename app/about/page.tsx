import { Metadata } from 'next/';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'We are a social media company',
}

export default function AboutPage() {
    return (
        <main>
            <h1>About</h1>
            <p>We are a social media company!</p>
        </main>
    )
}