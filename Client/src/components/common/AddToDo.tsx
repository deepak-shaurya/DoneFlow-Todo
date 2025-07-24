import { useState } from 'react'
import { useAddTodo } from '../../Apis/TodoHooks/useAddTodo'

type Props = {
  listId: string
}

function AddToDo({ listId }: Props) {
  const [todo, setTodo] = useState('')
  const { mutate: addTodo, isPending } = useAddTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo.trim()) return
    addTodo({listId, task: todo})
    setTodo('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full px-4 py-2 rounded-lg shadow-md outline-none text-white bg-gray-900 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all duration-300 active:scale-95 disabled:opacity-50"
      >
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default AddToDo
