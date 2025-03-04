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
        
} 