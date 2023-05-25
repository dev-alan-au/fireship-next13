import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
    const { targetUserId } = await req.json();

    const currentUserId = await prisma.user
        .findUnique({ where: { email } })
        .then(user => user?.id!);

    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId,
        }
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
    const targetUserId = req.nextUrl.searchParams.get('targetUserId');

    const currentUserId = await prisma.user
        .findUnique({ where: { email } })
        .then(user => user?.id!);

    const record = await prisma.follows.delete({
        where: {
            followingId_followerId: {
                followerId: currentUserId,
                followingId: targetUserId!,
            }
        }
    })

    return NextResponse.json(record);
}