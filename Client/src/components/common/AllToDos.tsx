import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useToggleTodo } from '../../Apis/TodoHooks/useToggleTodo'
import { useDeleteTodo } from '../../Apis/TodoHooks/useDeleteTodo'
import { useEditTodo } from '../../Apis/TodoHooks/useEditTodo'
import type { TodoType } from '../../Helpers/Types'

type Props = {
  todos: TodoType[]
  listId: string
}

function AllToDos({ todos, listId }: Props) {

  const { mutate: toggleTodo } = useToggleTodo()
  const { mutate: deleteTodo } = useDeleteTodo()
  const { mutate: editTodo } = useEditTodo()

  const [editId, setEditId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleEdit = (id: string, currentTask: string) => {
    setEditId(id)
    setEditValue(currentTask)
  }

  const handleEditSubmit = (id: string) => {
    if (editValue.trim()) {
      editTodo({ todoId: id, task: editValue.trim() })
      setEditId(null)
      setEditValue('')
    }
  }

  return (
    <ul className="flex flex-col gap-4 animate-fade-in">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex justify-between items-center bg-gray-900 text-white rounded-lg px-4 py-3 shadow-md transition-all duration-300 ${
            todo.completed ? 'opacity-50' : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
              className="w-5 h-5 accent-purple-600"
            />

            {editId === todo._id ? (
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-1 rounded-md bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <button
                  onClick={() => handleEditSubmit(todo._id)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md transition-all duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <span
                className={`flex-grow text-base sm:text-lg transition-all duration-300 ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.task}
              </span>
            )}
          </div>

          {editId !== todo._id && (
            <div className="flex gap-3 ml-4">
              <button
                onClick={() => handleEdit(todo._id, todo.task)}
                className="text-purple-400 hover:text-purple-600 transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteTodo({todoId: todo._id, listId: listId})}
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default AllToDos
