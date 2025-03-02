import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import UserProfile from '../pages/components/UserProfile'
import LogoutButton from '../pages/components/LogoutButton'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <a
                    href="/private"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                    ← Back to Dashboard
                </a>
                <LogoutButton />
            </div>
            <UserProfile />
        </div>
    )
} 