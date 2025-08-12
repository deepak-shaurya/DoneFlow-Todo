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

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleEditSubmit(id)
    }
    if (e.key === 'Escape') {
      setEditId(null)
      setEditValue('')
    }
  }

  return (
    <ul className="flex flex-col gap-4 animate-fade-in">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-900 text-white rounded-lg px-2 sm:px-4 py-2 sm:py-3 shadow-md transition-all duration-300 ${
            todo.completed ? 'opacity-50' : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="flex items-center justify-center flex-shrink-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 accent-purple-600 transition-all cursor-pointer"
              />
            </div>
            {editId === todo._id ? (
              <div className="flex flex-col xs:flex-row w-full gap-1 sm:gap-2 min-w-0">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, todo._id)}
                  className="flex-1 min-w-0 px-2 py-1 text-xs sm:text-sm md:text-base rounded bg-gray-800 border border-gray-600 text-white outline-none focus:ring-1 focus:ring-purple-500 transition"
                  autoFocus
                />
                <button
                  onClick={() => handleEditSubmit(todo._id)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 rounded transition-all duration-300 flex-shrink-0 touch-manipulation"
                >
                  Save
                </button>
              </div>
            ) : (
              <span
                className={`flex-1 min-w-0 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 break-words leading-tight sm:leading-normal ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.task}
              </span>
            )}
          </div>
          {editId !== todo._id && (
            <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-0 sm:ml-4 justify-end sm:justify-start flex-shrink-0">
              <button
                onClick={() => handleEdit(todo._id, todo.task)}
                className="text-purple-400 hover:text-purple-600 transition p-1 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                aria-label="Edit todo"
              >
                <Pencil size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => deleteTodo({ todoId: todo._id, listId: listId })}
                className="text-red-400 hover:text-red-600 transition p-1 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                aria-label="Delete todo"
              >
                <Trash2 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default AllToDos