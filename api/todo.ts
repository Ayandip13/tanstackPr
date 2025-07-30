const API_URL = process.env.RN_PUBLIC_API_URL;

export interface Todo {
    id: string,
    todos: string,
    completed: boolean
}

export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`)
    const data = await response.json()
    return data
}