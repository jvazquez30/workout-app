import { Exercise } from '../../../types/exercise'

const BASE_URL = 'https://libapi.vercel.app/api/exercises'

interface ExerciseQueryParams {
    lang?: string
    page?: number
    limit?: number
    category?: string
    muscle?: string
    difficulty?: string
    equipment?: string
}

interface ApiResponse<T> {
    data: T
    error: string | null
}

/**
 * Fetches all exercises from the API with optional filtering parameters
 * @param params Optional query parameters for filtering exercises
 * @returns Promise containing exercise data and any potential errors
 */
export async function getAllExercises(params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    try {
        const queryParams = new URLSearchParams({
            lang: params.lang || 'en',
            page: (params.page || 0).toString(),
            limit: (params.limit || 300).toString(),
            ...(params.category && { category: params.category }),
            ...(params.muscle && { muscle: params.muscle }),
            ...(params.difficulty && { difficulty: params.difficulty }),
            ...(params.equipment && { equipment: params.equipment })
        })

        const response = await fetch(`${BASE_URL}?${queryParams.toString()}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return {
            data,
            error: null
        }
    } catch (error) {
        console.error('Fetch error:', error)
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}

/**
 * Searches exercises based on a search term, filtering by name, primary muscles, or category
 * @param searchTerm The term to search for in exercise details
 * @param params Optional query parameters for additional filtering
 * @returns Promise containing filtered exercise data and any potential errors
 */
export async function searchExercises(searchTerm: string, params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    try {
        const { data, error } = await getAllExercises(params)

        if (error) {
            return { data: [], error }
        }

        const filteredExercises = data.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return {
            data: filteredExercises,
            error: null
        }
    } catch (error) {
        console.error('Search error:', error)
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}

/**
 * Fetches exercises filtered by a specific category
 * @param category The category to filter exercises by
 * @param params Optional additional query parameters
 * @returns Promise containing category-filtered exercise data and any potential errors
 */
export async function getExercisesByCategory(category: string, params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    return getAllExercises({ ...params, category })
}

/**
 * Fetches exercises filtered by a specific muscle group
 * @param muscle The muscle group to filter exercises by
 * @param params Optional additional query parameters
 * @returns Promise containing muscle-filtered exercise data and any potential errors
 */
export async function getExercisesByMuscle(muscle: string, params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    try {
        // get all exercises first
        const { data, error } = await getAllExercises(params)

        if (error) {
            return { data: [], error }
        }

        // filter exercises by muscle
        const filteredExercises = data.filter(exercise =>
            exercise.primaryMuscles.some(m =>
                m.toLowerCase().includes(muscle.toLowerCase())
            ) ||
            (exercise.secondaryMuscles && exercise.secondaryMuscles.some(m =>
                m.toLowerCase().includes(muscle.toLowerCase())
            ))
        );

        return {
            data: filteredExercises,
            error: null
        }
    } catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

/**
 * Fetches exercises filtered by difficulty level
 * @param difficulty The difficulty level to filter exercises by
 * @param params Optional additional query parameters
 * @returns Promise containing difficulty-filtered exercise data and any potential errors
 */
export async function getExercisesByDifficulty(difficulty: string, params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    try {
        // Get all exercises first
        const { data, error } = await getAllExercises(params)

        if (error) {
            return { data: [], error }
        }
        
        // Filter exercises by difficulty
        const filteredExercises = data.filter(exercise => 
            exercise.level.toLowerCase() === difficulty.toLowerCase()
        )

        return {
            data: filteredExercises,
            error: null
        }
    } catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}