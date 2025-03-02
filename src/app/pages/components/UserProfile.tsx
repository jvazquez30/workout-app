'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../utils/supabase/client'

export default function UserProfile() {
    const [firstName, setFirstName] = useState('')
    const [age, setAge] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadProfile() {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) throw new Error('No user found')

                const { data, error } = await supabase
                    .from('profiles')
                    .select('first_name, age')
                    .eq('id', user.id)
                    .single()

                if (error) throw error

                if (data) {
                    setFirstName(data.first_name || '')
                    setAge(data.age || '')
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load profile')
            } finally {
                setIsLoading(false)
            }
        }

        loadProfile()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setError(null)
        setSuccessMessage(null)

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('No user found')

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    first_name: firstName,
                    age: age,
                    updated_at: new Date().toISOString()
                })

            if (error) throw error

            setSuccessMessage('Profile updated successfully!')
            setIsEditing(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-md mx-auto p-6 bg-nordicGray rounded-lg shadow-lg">
                <p className="text-white">Loading profile...</p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-nordicGray rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Profile Settings</h2>

            {!isEditing ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-white">First Name: {firstName || 'Not set'}</p>
                        <p className="text-white">Age: {age || 'Not set'}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                            placeholder="Enter your first name"
                            required
                        />
                        <label htmlFor="age" className="block text-sm font-medium text-white mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                            placeholder="Enter your age"
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-500 text-white rounded">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mt-4 p-3 bg-green-500 text-white rounded">
                    {successMessage}
                </div>
            )}
        </div>
    )
} 