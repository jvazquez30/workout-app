"use client"
import React, { useState, useEffect } from 'react';
import { getAllExercises, searchExercises, getExercisesByCategory, getExercisesByMuscle, getExercisesByDifficulty, } from '../../workout_api/service';
import { Exercise } from '../../../../types/exercise';

interface ExerciseBrowserProps {
    onExerciseSelect: (exercise: Exercise) => void;
}

const ExerciseBrowser: React.FC<ExerciseBrowserProps> = ({ onExerciseSelect }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const categories = ['strength', 'endurance', 'flexibility', 'balance', 'coordination', 'power', 'speed', 'stamina', 'agility', 'balance', 'coordination', 'power', 'speed', 'stamina', 'agility'];
    const muscles = ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'quads', 'hamstrings', 'glutes', 'calves', 'adductors', 'abductors', 'serratus anterior', 'obliques', 'lats', 'rhomboids', 'traps', 'rotator cuffs', 'lower back', 'upper back'];
    const difficulties = ['beginner', 'intermediate', 'advanced'];

    useEffect(() => {
        loadExercises();
    }, [])

    async function loadExercises() {
        try {
            const { data, error } = await getAllExercises();
            if (error) throw new Error(error);
            setExercises(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await searchExercises(searchTerm)
            if (error) throw new Error(error)
            setExercises(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    async function handleCategoryFilter(category: string) {
        setSelectedCategory(category);
        setError(null);
        setLoading(true);

        try {
            const { data, error } = await getExercisesByCategory(category)
            if (error) throw new Error(error);
            setExercises(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    async function handleMuscleFilter(muscle: string) {
        setSelectedMuscle(muscle);
        setError(null);
        setLoading(true);

        try {
            const { data, error } = await getExercisesByMuscle(muscle)
            if (error) throw new Error(error);
            setExercises(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    async function handleDifficultyFilter(difficulty: string) {
        setSelectedDifficulty(difficulty);
        setError(null);
        setLoading(true);

        try {
            const { data, error } = await getExercisesByDifficulty(difficulty)
            if (error) throw new Error(error);
            setExercises(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="exercise-browser">
            <h2>Exercise Browser</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for an exercise"
                    className="border border-gray-300 rounded-md p-2 m-2 text-black"
                />
                <button
                    type="submit"
                    className="bg-nordicGray text-white rounded-md px-2 py-1"
                    disabled={loading}
                >

                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            <div className="filter-buttons">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className='text-black m-2 p-2 border border-gray-300 rounded-md'>

                    <option
                        value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedMuscle}
                    onChange={(e) => handleMuscleFilter(e.target.value)}
                    className='text-black m-2 p-2 border border-gray-300 rounded-md'
                >

                    <option
                        value="">Select Muscle</option>
                    {muscles.map(muscle => (
                        <option key={muscle} value={muscle}>
                            {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedDifficulty}
                    onChange={(e) => handleDifficultyFilter(e.target.value)}
                    className='text-black m-2 p-2 border border-gray-300 rounded-md'
                >

                    <option
                        value="">Select Difficulty</option>
                    {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

         {error && <p className="text-red-500">{error}</p>}


         {loading ? (
             <div className='text-center'>
                <p className='text-gray-500'>Loading Exercises...</p>
            </div>
         ) : (
             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {exercises.length === 0 ? (
                    <p className='text-gray-500'>No exercises found</p>
                ) : (
                    exercises.map(exercise => (
                        <div key={exercise.id} className='bg-nordicGray text-white rounded-md p-4'>
                            <h3 className='text-lg font-bold'>{exercise.name}</h3>
                            <p className='text-sm'>{exercise.instructions}</p>
                        </div>
                    ))
                )}
            </div>
        )}
        </div>
    )
}

export default ExerciseBrowser;