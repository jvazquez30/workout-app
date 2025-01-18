import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center gap-4'>
      <form className='flex flex-col items-center justify-center gap-2 border-2 border-gray-300 p-4 rounded-md'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className='text-black' required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className='text-black' required />
        <button formAction={login} className='bg-nordicGray text-white p-2 rounded-md'>Log in</button>
      </form>

      <div className='flex flex-col items-center justify-center'>
        <p>Don&apos;t have an account?</p>
      <form className='flex flex-col items-center justify-center gap-2 border-2 border-gray-300 p-4 rounded-md'>
        {/* <label htmlFor="first_name">First name:</label>
        <input id="first_name" name="first_name" type="text" className='text-black' required />
        <label htmlFor="last_name">Last name:</label>
        <input id="last_name" name="last_name" type="text" className='text-black' required /> */}
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className='text-black' required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className='text-black' required />
        <button formAction={signup} className='bg-nordicGray text-white p-2 rounded-md'>Sign up</button>
      </form>
      </div>
    </div>
  )
}