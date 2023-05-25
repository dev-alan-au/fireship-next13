import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import FollowButton from '@/components/Follow/FollowButton';

interface Props {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params }: Props) {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    return { title: `${user?.name}'s profile page` }
}

export default async function UserPage({ params }: Props) {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    const { name, bio, image } = user ?? {};

    return (
        <div>
            <h1>{name}</h1>
            <img
                width={300}
                src={image ?? '/mememan.webp'}
                alt={`${name}'s profile`}
                className={styles.cardImage}
            />
            <h3>Bio</h3>
            <p>{bio}</p>
            {/* @ts-expect-error Server Component */}
            <FollowButton targetUserId={params.id} />
        </div>
    )
}