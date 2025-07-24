import ListCard from "../components/common/ListCard"
import { useQuery } from "@tanstack/react-query"
import { fetchUserLists } from "../Apis/AllApis"
import type { ListType } from "../Helpers/Types"
import ListCardSkeleton from "../components/loadingComponent/ListCardSkeleton"
import { useState } from "react"
import CreateListForm from "../components/common/CreateListForm"


const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: lists, isLoading, isError, error } = useQuery<ListType[]>({
    queryKey: ['lists'],
    queryFn: fetchUserLists,
  });

  if (isLoading) {
    return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 gap-6">
      <h1 className="text-white text-4xl font-bold mb-6">Your Lists are loading...</h1>
      <ListCardSkeleton/>
      <ListCardSkeleton/>
      <ListCardSkeleton/>
    </div>
    )
  }

  if (isError) {
    console.error("Error fetching lists:", error)
    return <h1 className="text-red-500 text-4xl font-bold mb-6"> Faild to load Lists...</h1>
  }

  if (!lists || lists.length === 0) {
    return <h1 className="text-red-500 text-4xl font-bold mb-6">No List found ! Create your List First..</h1>
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 gap-6">
      <header className="flex w-full justify-between items-center px-6 py-4 ">
        <h1 className="text-white text-4xl font-bold mb-6">Your Lists</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-[#40A2E3] px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
        >
          + New List
        </button>
      </header>

      {showForm && <CreateListForm onClose={() => setShowForm(false)} />}

      {lists.map(list => (
        <ListCard
          key={list._id}
          id={list._id}
          name={list.name}
          description={list.description}
          todos={list.todos}
        />
      ))}
    </div>
  )
}

export default Home;


