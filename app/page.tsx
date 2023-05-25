import styles from './page.module.css'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('api/auth/signin');
  console.log(session)

  return (
    <main className={styles.main}>

    </main>
  )
}
