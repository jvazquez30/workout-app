import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import LogoutButton from '../components/LogoutButton'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <div>
        <LogoutButton />
      </div>

      <div>
        <p>Welcome {data.user.email}</p>
        <p>Today is {new Date().toLocaleDateString()}</p>
        
      </div>
    </div>
  )
}