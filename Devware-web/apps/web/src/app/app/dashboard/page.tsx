"use client"

import PageNavbar, {  PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/app/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/app/components/layout/PageContent'
import ProfileImage from '../../components/assets/profile.png'
import EmptyBox from '../../components/assets/emptyBox/EmptyBox.webp'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import handleTwitter from "@/utils/handleTwitter";
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'

export const runtime = 'edge'

interface UserData{
    username: string
}
function Dashboard() {
    const [userData, setUser] = useState<string>("")
    useEffect(function (){
        something()
    }, [])
    const [userPosts, setUserPosts] = useState("")

    async function something(){
       try{
        const user = await axios.get("http://localhost:3000/api/user")
        if(!user.data.email){
           alert('hell no!!')
            return;
        }
        if (user.data !== undefined){
        setUser(user.data)}
       }catch(err){
        console.log(err)
         window.location.href = "http://localhost:3000/"
       }
       
        
        try{
            const posts = await axios.get("http://localhost:3000/api/userPost");
        if(!posts.data.Posts){
            alert("Error occured mid-way!")
            return;
        }
        
        setUserPosts(posts.data.Posts)
        }catch(err){
            console.log(err)
            alert("Dummy still not fixed!")
        }
    }
    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent>
                        <Image
                            src={ProfileImage}
                            alt='User'
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                        <div>
                            {/* //@ts-ignore */}
                            <p className='text-sm font-semibold text-red-800'>{userData?.userName}</p>
                            {/* //@ts-ignore */}
                            <p className='text-xs font-medium text-gray-500'>{userData?.email.slice(0,10) + "...." + userData?.email.slice(20,-1)}</p>
                        </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                <PageNavbarPrimaryButton className='h-8 gap-1 w-60 bg-primary hidden duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'>
                        <button className='flex gap-1 py-2 px-1' onClick={handleTwitter}>
                            <span>Connect your Twitter</span>
                            <svg style={{height:20,width:20}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                        </button>
                    </PageNavbarPrimaryButton>

                    <PageNavbarPrimaryButton className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'>
                        <Add size={16} />
                        <Link href={"/app/post"}>
                        New Post
                        </Link>
                    </PageNavbarPrimaryButton>
                </PageNavbarRightContent>
            </PageNavbar>

            <PageContent>
                <div className='flex flex-row justify-between gap-6'>
                <div className="bg-gradient-to-r from-purple-400 to-pink-100 h-80 w-1/2 font-medium rounded-lg text-gray-800 p-6 flex flex-col justify-between shadow-lg">
    <div>
        <h1 className="font-semibold text-3xl mb-2">Hey Developer!</h1>
        <p className="text-lg mb-4">Let's elevate your presence on X:</p>
        <ul className="list-disc ml-6 mb-6">
            <li>Express your <span className='font-semibold text-purple-700'>innovations</span></li>
            <li>Share insights from your Personal Journey</li>
            <li>Cultivate engagement through Interactive Content</li>
        </ul>
        <p className="text-base mb-4">Whether you're a seasoned pro or just starting out, there's always room to grow!</p>
    </div>
    <Link href={"/app/post"}>
    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-8 rounded-md shadow-md transition duration-300 ease-in-out">
        Start Creating
    </button>
    </Link>
</div>



                    <div className="bg-gradient-to-l from-purple-400 to-pink-100 h-80 w-1/2 rounded-lg text-black p-8 flex flex-col justify-between">
                <div>
        <h1 className="font-bold text-xl mb-4">🌟 Pro Tip: Boost Your Content Game</h1>
        <p className="text-base mb-4">Incorporating posts you love into your knowledge base can:</p>
        <ul className="list-disc ml-6">
            <li>Extend your reach</li>
            <li>Personalize your content</li>
            <li>Elevate its quality and tone</li>
        </ul>
    </div>
    <div>
        <h2 className="font-semibold text-lg mt-6">Ready to Level Up?</h2>
        <p className="text-base">Don't miss out, add them all now!</p>
        <Link href={"/app/knowledge_base"}>
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
        Add knowledge base
    </button>
        </Link>
    </div>
</div>

                </div>
                {(userPosts?.length > 0) ? (
    <div className="flex flex-col gap-10">
        <h1 className="font-semibold text-2xl text-white mt-5">Your Previously Generated Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
              {/* //@ts-ignore */}
            {userPosts.map((item, index) => (
                <div key={index} className="bg-gray-100 text-black p-5 rounded-lg">
                    <h3>{item.content}</h3>
                </div>
            ))}
        </div>
    </div>
) : (
    <div className=" flex justify-center items-center flex-col text-black p-5 rounded-lg">
        <Image
            src={EmptyBox}
            alt="User"
            width={300}
            height={300}
            className=""
        />
        <h1 className="font-semibold text-2xl -mt-5 text-white">Generate a New Post to Fill This Space</h1>
    </div>
)}

                

            </PageContent>
        </div>
    )
}

export default Dashboard
