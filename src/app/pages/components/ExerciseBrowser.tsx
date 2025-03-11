"use client"
import React, { useState, useEffect } from 'react';
import { getAllExercises, getFilteredExercises, } from '../../workout_api/service';
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

    const categories = ['strength', 'stretching','plyometrics'];
    const muscles = ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'quads', 'hamstrings', 'glutes', 'calves', 'adductors', 'abductors', 'serratus anterior', 'obliques', 'lats', 'rhomboids', 'traps', 'rotator cuffs', 'lower back', 'upper back'];
    const difficulties = ['beginner', 'intermediate', 'advanced'];

    // Add this function to handle all filters

    useEffect(() => {
        async function handleFilters() {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await getFilteredExercises({
                    searchTerm: searchTerm || undefined,
                    category: selectedCategory || undefined,
                    muscle: selectedMuscle || undefined,
                    difficulty: selectedDifficulty || undefined
                });

                if (error) throw new Error(error);
                setExercises(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
        if (searchTerm || selectedCategory || selectedMuscle || selectedDifficulty) {
            handleFilters();
        } else {
            loadExercises();
        }
    }, [searchTerm, selectedCategory, selectedMuscle, selectedDifficulty]);

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

    return (
        <div className="exercise-browser">
            <h2>Exercise Browser</h2>
            <div className="filters-container space-y-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for an exercise"
                    className="border border-gray-300 rounded-md p-2 w-full text-black"
                />
              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='text-black p-2 border border-gray-300 rounded-md w-full'>
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedMuscle}
                        onChange={(e) => setSelectedMuscle(e.target.value)}
                        className='text-black p-2 border border-gray-300 rounded-md w-full'>
                        <option value="">All Muscles</option>
                        {muscles.map(muscle => (
                            <option key={muscle} value={muscle}>
                                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className='text-black p-2 border border-gray-300 rounded-md w-full'>
                        <option value="">All Difficulties</option>
                        {difficulties.map(difficulty => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}


            {
                loading ? (
                    <div className='text-center'>
                        <p className='text-gray-500'>Loading Exercises...</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2'>
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
                )
            }
        </div>
    )
}

export default ExerciseBrowser;