"use client"

import { useState } from "react"
import axios from 'axios'

export default function() {
    const [userThought, setUserText] = useState('');
    const [type, setUserSelect] = useState("");
    const [userTone, setUserTone]  = useState("");
    const [post, setPost] = useState('')
    const postGenerate = async (e) => {
        e.preventDefault();
        const thoughts = encodeURIComponent(userThought)
        const response = await axios.get(`http://localhost:8000/?context=${type}&tone=${userTone}&thoughts=${thoughts}`)
        
        if (response.data.success) {
            setPost(response.data.post.content)
        }else {
            alert('Unable to post')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md">
    <form onSubmit={postGenerate}>
        <div className="mb-4">
            <textarea className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={userThought} onChange={(e) => setUserText(e.target.value)} placeholder="Share your today's thoughts"></textarea>
        </div>
        <div className="mb-4">
            <h1 className="text-black">Context</h1>
            <select id="dropdownMenu" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => { setUserSelect(e.target.value) }}>
                <option value="Personal Experience">Personal Experience</option>
                <option value="New Exposure">New Exposure</option>
                <option value="New Learning">New Learning</option>
                <option value="Updates">Updates</option>
            </select>
        </div>
        <div className="mb-4">
            <h1 className="text-black">Tone</h1>
            <select id="dropdownMenu" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => { setUserTone(e.target.value) }}>
                <option value="professional">Professional tone</option>
                <option value="casual">Casual</option>
                <option value="excited">Excited</option>
                <option value="humorous">Humorous</option>
            </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">Generate Post</button>
    </form>
    { post ?
    <div className="text-green-500">
        <h2>{post}</h2>
        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}"` }>Post it on twitter</a>
    </div> :
    <div>

    </div>
    }
</div>

    )
    
}
