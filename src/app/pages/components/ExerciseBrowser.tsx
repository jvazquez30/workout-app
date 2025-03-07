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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const categories = ['Strength', 'Endurance', 'Flexibility', 'Balance', 'Coordination', 'Power', 'Speed', 'Stamina', 'Agility', 'Balance', 'Coordination', 'Power', 'Speed', 'Stamina', 'Agility'];
    const muscles = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Forearms', 'Abs', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Adductors', 'Abductors', 'Serratus Anterior', 'Obliques', 'Lats', 'Rhomboids', 'Traps', 'Rotator Cuffs', 'Lower Back', 'Upper Back'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

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
        setSelectedMuscle('');
        setSelectedDifficulty('');
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
        setSelectedCategory('');
        setSelectedDifficulty('');
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
        setSelectedCategory('');
        setSelectedMuscle('');
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
                <button type="submit" className="bg-nordicGray text-white rounded-md px-2 py-1">

                    {loading ? 'Searching...' : 'Search'}
                </button>

                <div className="filter-buttons">
                    <select value={selectedCategory} onChange={(e) => handleCategoryFilter(e.target.value)}></select>
                </div>

            </form>
        </div>
    )
}

export default ExerciseBrowser;