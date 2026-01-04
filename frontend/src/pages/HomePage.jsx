import React from 'react'
import UrlForm from '../components/UrlForm'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[rgba(255,255,255,0.03)] border border-gray-800 rounded-2xl items-center shadow-xl p-8">
        <h1 className="text-2xl font-semibold mb-2">Shorten your URL</h1>
        <p className="text-sm text-gray-400 mb-6">Paste a long link and get a short, shareable URL.</p>
          <UrlForm />
      </div>
</div> 
  )
}

export default HomePage