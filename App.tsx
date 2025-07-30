import { View, Text, FlatList, ListRenderItem, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createTodo, getTodos, Todo } from './api/todo'
import { useMutation } from '@tanstack/react-query'

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setLoading(true)
    try {
      const response = await getTodos()
      setTodos(response)
      setError(null)
    } catch (error: any) {
      console.log(error);
      setError(error.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      console.log("Success", data);
    }
  })

  const handleTodo = () => {
    addMutation.mutate(todos)
    setTodos("")
  }

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    return (
      <View>
        <Text>{item.todos}</Text>
      </View>
    )
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error}</Text>

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        onChangeText={setTodos}
        value={todos}
        placeholder='Add a Todo'
      />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodo}
      />
    </View>
  )
}

export default App
