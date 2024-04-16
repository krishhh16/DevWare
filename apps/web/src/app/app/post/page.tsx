"use client"

import { useState } from "react"


export default function() {
    const [userText, setUserText] = useState('')
    const [userSelect, setUserSelect] = useState("")
    return (
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md">
    <form>
        <div className="mb-4">
            <textarea className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={userText} onChange={(e) => setUserText(e.target.value)} placeholder="Share your today's thoughts"></textarea>
        </div>
        <div className="mb-4">
            <select id="dropdownMenu" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => { setUserSelect(e.target.value) }}>
                <option value="Personal Experience">Personal Experience</option>
                <option value="New Exposure">New Exposure</option>
                <option value="New Learning">New Learning</option>
                <option value="Updates">Updates</option>
            </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">Generate Post</button>
    </form>
</div>

    )
    
}
