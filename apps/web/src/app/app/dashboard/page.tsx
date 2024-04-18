"use client"

import PageNavbar, {  PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/components/layout/PageContent'
import ProfileImage from '@/components/assets/profile.png'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import handleTwitter from "@/utils/handleTwitter";
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
function Dashboard() {
    const [userData, setUser] = useState<AxiosResponse<any, any>>()
    useEffect(()=> {
        something()
    }, [])

    async function something(){
        const user = await axios.get("http://localhost:3000/api/user")
        console.log(user)
        setUser(user.data)
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
                        <div className=''>
                            <p className='text-sm font-semibold text-red-800'>{userData?.userName}</p>
                            <p className='text-xs font-medium text-gray-500'>{userData?.email}</p>
                        </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                <PageNavbarPrimaryButton className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'>
                        <button onClick={handleTwitter}>
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
                <div className='space-y-4 columns-1 sm:columns-2 lg:columns-3'>
                    
                </div>

            </PageContent>

        </div>
    )
}

export default Dashboard
