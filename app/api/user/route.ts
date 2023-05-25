import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
    const data = await req.json();

    console.log({email}, {data})

    const user = await prisma.user.update({
        where: { email },
        data
    });

    console.log(user)

    return NextResponse.json(user);
}