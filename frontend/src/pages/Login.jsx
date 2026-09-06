import React, { useState } from 'react'
import useAuthContext from '../context/AuthContext'
import { useNavigate, Link} from 'react-router-dom'
import { showSuccess } from '../Utils/toast'

const Login = () => {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {login} = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    let logggedIn = await login(email, password)

    if(logggedIn.success){
      showSuccess(`Welcome back, ${logggedIn.data.isAdmin ? 'Admin' :''} ${logggedIn.data.name}!`);
      navigate("/")
    }else{
        showError(logggedIn.error);
      setLoading(false)
    }
  }
  return (
   <>
   <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-24">
         <div className="w-full max-w-md">
           <div className="text-center mb-8">
             <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
             <p className="text-slate-500 mt-2">Sign in to your account</p>
             {error && (<div className='bg-red-100 border-red-400 text-red-700 px-4 py-2 rounded-4 mt-3'>
                {error}
              </div>)}
           </div>
   
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
             <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   Email Address
                 </label>
                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                   className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                 />
               </div>
   
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                   Password
                 </label>
                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password"
                   className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                 />
               </div>
   
               <button type="submit" disabled={loading}
                 className={`w-full py-3 rounded-xl font-semibold transition ${
                   loading
                     ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                     : "bg-indigo-600 text-white hover:bg-indigo-700"
                 }`}
               >
                 {loading ? "Signing in..." : "Sign In"}
               </button>
             </form>
   
             <p className="mt-6 text-center text-sm text-slate-500">
               Don&apos;t have an account?{" "}
               <Link
                 to="/register"
                 className="text-indigo-600 font-semibold hover:underline"
               >
                 Create one
               </Link>
             </p>
           </div>
         </div>
       </div>
   </>
  )
}

export default Login