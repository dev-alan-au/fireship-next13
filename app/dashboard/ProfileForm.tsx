'use client';
import { User } from "@prisma/client";

type ProfileFormProps = {
    user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
    async function updateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name')
        };

        await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
    }

    return (
        <div>
            <h2>Update your profile</h2>
            <form onSubmit={updateUser}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" defaultValue={user.name ?? ''} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}