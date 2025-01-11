'use client'

import { createClient } from "../../../utils/supabase/client";

export default function LogoutButton() {
    return (
        <button
            onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signOut()
                window.location.href = '/'
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Logout
        </button>
    )
} 