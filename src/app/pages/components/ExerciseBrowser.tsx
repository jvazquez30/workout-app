'use client'

import { useState } from 'react';
import { fetchWithAuth } from '../../workout_api/service';
import { Exercise } from '../../../../types/exercise';

export default function ExerciseBrowser() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setError('Please enter a search term');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await fetchWithAuth('');
            const filteredData = data.filter((exercise: Exercise) =>
                exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredData.length === 0) {
                setError('No exercises found');
            }

            setExercises(filteredData);
        } catch (err) {
            setError('Failed to load exercises');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search exercises..."
                    className="flex-1 p-2 border rounded text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercises.map((exercise) => (
                    <div key={exercise._id} className="border rounded p-4">
                        <h3 className="font-bold">{exercise.name}</h3>
                        <p className="text-sm text-gray-600">Category: {exercise.category}</p>
                        <div className="mt-2 space-y-1">
                            <p className="text-xs">Level: {exercise.level}</p>
                            <p className="text-xs">Equipment: {exercise.equipment || 'None'}</p>
                            <div className="text-xs">
                                Primary Muscles: {exercise.primaryMuscles.join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 