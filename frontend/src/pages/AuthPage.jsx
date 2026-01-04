import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

  const [login, setLogin] = useState(true)

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[rgba(255,255,255,0.03)] border border-gray-800 rounded-2xl items-center shadow-xl p-8">
        { login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin}/> }
      </div>
</div>
)
}

export default AuthPage