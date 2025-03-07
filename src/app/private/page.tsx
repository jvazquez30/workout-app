

import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import LogoutButton from '../pages/components/LogoutButton'
import WorkoutDash from '../pages/components/WorkoutDash'

export default async function PrivatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, age')
        .eq('id', data.user.id)
        .single()

    if (profileError) {
        console.error('Error fetching profile data:', profileError)
    }

    return (
        <div>
            <div className="flex justify-between items-center p-2">
                <a
                    href="/profile"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Edit Profile
                </a>
                <LogoutButton />
            </div>

            <div id="welcome-message" className="flex flex-col items-center justify-center p-4">
                <p className='text-2xl font-bold'>Welcome {profileData?.first_name || data.user.email}</p>
                <p className='text-lg'>Today is {new Date().toLocaleDateString()}</p>
            </div>

            <WorkoutDash />
        </div>
    )
} 