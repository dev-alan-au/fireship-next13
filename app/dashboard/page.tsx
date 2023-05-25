import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProfileForm from './ProfileForm';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    const currentUserEmail = session?.user?.email!;

    console.log(session?.user)

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    if (!user) {
        throw new Error('User not found.');
    }

    return (
        <>
            <h1>Dashboard</h1>
            <ProfileForm user={user} />
        </>
    )
}