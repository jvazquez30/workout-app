export default function VerifyEmailPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Check your email</h1>
                <p className="mb-4">
                    We&apos;ve sent you an email with a confirmation link. Please check your inbox and click the link to verify your account.
                </p>
                <p className="text-sm text-gray-500">
                    After verifying your email, you can return to the{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        login page
                    </a>
                </p>
            </div>
        </div>
    )
} 