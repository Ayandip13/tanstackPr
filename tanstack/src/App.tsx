import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function App() {

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <div>{data.slice(0, 20).map((todo: any) => <p>{todo.title}</p>)}</div>
      <button onClick={() => refetch()}>
        Refetch
      </button>
    </>
  )
}

const getTodos = async () => {
  const resp = await axios.get('https://jsonplaceholder.typicode.com/todos')
  return resp.data
}

export default App