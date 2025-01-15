import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import LogoutButton from '../components/LogoutButton'
import WorkoutDash from '../components/WorkoutDash'
export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <div id="logout-button" className="flex justify-end p-2">
        <LogoutButton />
      </div>

      <div id="welcome-message" className="flex flex-col items-center justify-center p-4">
        <p className='text-2xl font-bold'>Welcome {data.user.email}</p>
        <p className='text-lg'>Today is {new Date().toLocaleDateString()}</p>
        
      </div>
      <WorkoutDash /> 
    </div>
  )
}