import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { authenticateUser } from "../Apis/AllApis"
import type { JSX } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UserType } from "../Helpers/Types"
import LoadingSpinner from "../components/loadingComponent/LoadingSpinner"


const Auth = () : JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const { mutate, isPending } = useMutation<
    UserType | null,
    Error,
    { body: { name?: string; username: string; password: string }; endpoint: string }>({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      console.log("User authenticated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["CheckUser"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during authentication:", error);
      alert("Authentication failed. Please try again.");
    },
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = isLogin ? "/api/user/login" : "/api/user/register"
    const body = isLogin
      ? { username: form.username, password: form.password }
      : { ...form }

    mutate({body, endpoint})
    //setForm({ name: "", username: "", password: "" }) // Reset form
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-700 rounded-2xl p-8 shadow-2xl transition-all">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-xl font-semibold transition-all duration-300 ${
              isLogin ? "bg-purple-600 text-white" : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-xl font-semibold transition-all duration-300 ${
              !isLogin ? "bg-purple-600 text-white" : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={form.name}
              className="w-full p-3 rounded-xl bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            className="w-full p-3 rounded-xl bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full p-3 rounded-xl bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold"
          >
            {isPending? <LoadingSpinner size="md"/> : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
