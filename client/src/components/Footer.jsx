import React from 'react'

export default function Footer() {
  return (
    <>
    <div className="bg-gray-800 text-white text-center p-4 mt-8">
        <p className="text-sm">
            This App is made with ❤️ by Aryan Lokhande
        </p>
    </div>
    <div className="bg-gray-900 text-white text-center p-2">
        <p className="text-xs">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
    </div>

      
    </>
  )
}
