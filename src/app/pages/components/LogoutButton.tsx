'use client'

import { createClient } from "../../utils/supabase/client";

export default function LogoutButton() {
    return (
        <button
            onClick={async () => {
                const supabase = createClient()
                await supabase.auth.signOut()
                window.location.href = '/'
            }}
            className="px-2 py-1 bg-nordicGray text-white rounded hover:bg-nordicGray/80"
        >
            Logout
        </button>
    )
}