import { useParams } from 'react-router-dom'
import AddToDo from '../components/common/AddToDo'
import AllToDos from '../components/common/AllToDos'
import { useQuery } from '@tanstack/react-query'
import { fetchTodosByListId } from '../Apis/AllApis'
import type { ListWithTodosType } from '../Helpers/Types'
import type { AxiosError } from 'axios'

function List() {
  const { id } = useParams<{ id: string }>()

  const {
    data: list,
    isLoading,
    isError,
    error,
  } = useQuery<ListWithTodosType | null, AxiosError>({
    queryKey: ['list'],
    queryFn: () => fetchTodosByListId(id || ''),
    retry:false,
  })

  if (isLoading) return <div className="text-white">Loading...</div>
  if (isError || !list) {
    console.log("Error fetching list:", error)
    return <div className="text-red-400">Error loading list</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br w-full flex flex-col items-center px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
          {list.name}
        </h1>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">{list.description}</p>
      </header>

      <section className="w-full max-w-xl bg-gray-700 p-6 rounded-2xl shadow-lg mb-8">
        <AddToDo listId={list._id} />
      </section>

      <section className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <AllToDos todos={list.todos} listId={list._id} />
      </section>
    </div>
  )
}

export default List
