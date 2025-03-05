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

export async function getExercisesByCategory(category: string, params: ExerciseQueryParams = {}): Promise<ApiResponse<Exercise[]>> {