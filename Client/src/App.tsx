import { type JSX } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import List from "./pages/List"
import Home from "./pages/Home"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./components/loadingComponent/LoadingSpinner"
import { fatchAuthUser } from "./Apis/AllApis"
import type { UserType } from "./Helpers/Types"
import type { AxiosError } from "axios"


function App(): JSX.Element {

  const {data: user, isLoading} = useQuery<UserType|null, AxiosError, UserType | null, ['CheckUser']>({
    queryKey: ['CheckUser'],
    queryFn: fatchAuthUser
  })
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center px-4 py-8">
        <LoadingSpinner size="lg"/>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center px-4 py-8">
      <Routes>
        <Route path="/" element={user? <Home/> : <Navigate to={'/auth'}/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/auth" element={!user? <Auth/> : <Navigate to={'/'}/>}/>
        {/* <Route path="/auth" element={ <Auth/>}/> */}
        <Route path="/todo-list/:id" element={ user? <List/>: <Navigate to={'/auth'}/>}/>
      </Routes>
    </div>
  )
}

export default App
