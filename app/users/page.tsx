import { prisma } from '@/lib/prisma';
import UserCard from '@/components/UserCard/UserCard';
import styles from './page.module.css';

export default async function UsersPage() {
    const users = await prisma.user.findMany();

    return (
        <div className={styles.grid}>
            {users.map(user => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    )
}