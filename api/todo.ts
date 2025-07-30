// const API_URL = process.env.RN_PUBLIC_API_URL;
const API_URL = 'http://localhost:3000';

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

export async function createTodo(text: string): Promise<Todo> {
    const todo = {
        id: Date.now().toString(),
        todo: text,
        completed: false
    }

    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(todo),
    })

    const data = response.json()
    return data
}

export async function deleteTodo(id: string): Promise<void> {
    const result = await fetch(`${API_URL}/todos${id}`, {
        method: "DELETE"
    })
    const data = result.json()
    return data
}

export async function updateTodo(todo: Todo): Promise<Todo> {
    const result = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const data = result.json()
    return data
}

export async function getTodosById(id: string): Promise<Todo> {
    const result = await fetch(`${API_URL}/todos/${id}`)
    const data = result.json()
    return data
}