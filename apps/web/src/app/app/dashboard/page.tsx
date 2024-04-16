"use client"

import PageNavbar, {  PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/components/layout/PageContent'
import ProfileImage from '@/components/assets/profile.png'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
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
                    {/* <div className='flex items-center justify-between gap-2'> */}
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
                    {/* </div> */}
                </PageNavbarLeftContent>

                <PageNavbarRightContent>

                    <PageNavbarPrimaryButton className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'>
                        <Add size={16} />
                        New Post
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
