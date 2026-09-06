import React, { useState } from 'react'
import useAuthContext from '../context/AuthContext'
import {useNavigate, Link} from 'react-router-dom'
import { showError ,showSuccess} from '../Utils/toast'

const Register = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const {register} = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {

    e.preventDefault();

   
    if(password != confirmPassword){
      showError("Password and Confirm Password not same.. Please Match")
      return
    }

    if(password.length < 6){
      showError("Password atleast minium 6 characrers required")
      return
    }

    setLoading(true)

    const userRegistaration = await register(name,email,password)

    if(userRegistaration.success){
      showSuccess("Account created successfully!");
      navigate("/login")
    }else{
      showError(userRegistaration.error)
    }
    setLoading(false);

  }
  return (
    <>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-4 ">
          <div className="w-full max-w-md">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
              <p className="text-slate-500 mt-2">Join ShopVerse Today!!!</p>
              {error && (<div className='bg-red-100 border-red-400 text-red-700 px-4 py-2 rounded-4 mt-3'>
                {error}
              </div>)}
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <form  className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input type="text" value={name} required placeholder="Vivek"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input type="email" value={email} required placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input type="password" value={password} required  placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <input type="password" value={confirmPassword} required placeholder="Confirm your password"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                 />
                </div>
    
                <button type="submit" disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    loading
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
    
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Register