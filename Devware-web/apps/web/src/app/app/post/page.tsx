"use client"

import { useState, useEffect } from "react"
import axios from 'axios'

export const runtime = 'edge'

export default function() {
    const [userThought, setUserText] = useState('');
    const [type, setUserSelect] = useState("");
    const [userTone, setUserTone]  = useState("");
    const [post, setPost] = useState('')
    const [credits, setCreds] = useState(0)
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        handleCreds();
    }, [])

    async function handleCreds()  {
        const creds = await axios.get('http://localhost:3000/api/handleCredit')

        if (!creds.data.success){
            alert("Unable to get credits")
        }else {
            setCreds(creds.data.credits)
            console.log(credits)
        }
    }
    const postGenerate = async (e) => {
        e.preventDefault();
        setLoading(true)
        const thoughts = encodeURIComponent(userThought)
        const response = await axios.get(`http://localhost:8000/?context=${type}&tone=${userTone}&thoughts=${thoughts}`)
        
        if (response.data.success) {
            setPost(response.data.post.content)
            setLoading(false)
            const res = await axios.post("http://localhost:3000/api/handleCredit")
            
            if(res.data.success){
                setCreds(res.data.credits)
                const resPost = await axios.post("http://localhost:3000/api/userPost", {
                    post: response.data.post.content
                })
            }
        }else {
            alert('Unable to post')
        }
    }
    return (
        <div className=" mx-5 bg-white shadow-md p-6 rounded-md mt-10">
            <form onSubmit={postGenerate}>
                <h1 className="text-black">Credits Left: {6 - credits} today</h1>
                <div className="mb-4">
                    <textarea className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={userThought} onChange={(e) => setUserText(e.target.value)} placeholder="Share your today's thoughts"></textarea>
                </div>
                <div className="mb-4">
                    <h1 className="text-black">Context</h1>
                    <select id="dropdownMenu" defaultValue="New Exposure" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => { setUserSelect(e.target.value) }}>
                        <option value="Personal Experience">Personal Experience</option>
                        <option value="New Exposure">New Exposure</option>
                        <option value="New Learning">New Learning</option>
                        <option value="Updates">Updates</option>
                    </select>
                </div>
                <div className="mb-4">
                    <h1 className="text-black">Tone</h1>
                    <select id="dropdownMenu" defaultValue="professional" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => { setUserTone(e.target.value) }}>
                        <option value="professional">Professional tone</option>
                        <option value="casual">Casual</option>
                        <option value="excited">Excited</option>
                        <option value="humorous">Humorous</option>
                    </select>
                </div>
                {(credits < 6) ?
                    loading ?
                        <button type="submit" disabled className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">

                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>
                        :
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">Generate Post</button>
                    :
                    <button onClick={() => { window.location.href = "http://localhost:3000/contact" }} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">Oopsie! You have exceeded your daily limits:( Contact team to increase it!</button>

                }
            </form>
            {post ?
               <div className="bg-blue-100 rounded-lg p-4 mt-5">
    <h2 className="text-black font-bold text-lg mb-2">{post}</h2>
    <a
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`}
      className="inline-flex border p-2 border-black rounded-lg items-center text-blue-600 transition-colors duration-200"
      rel="noopener noreferrer"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
      Post it on Twitter
    </a>
  </div>
                :
                <div>

                </div>
            }
        </div>

    )

}
