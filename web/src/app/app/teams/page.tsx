"use client"

import PageNavbar, { PageNavbarIconButton, PageNavbarLeftContent, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Add, ExportCurve, Notification, Profile, SearchNormal1 } from 'iconsax-react'
import PageContent from '@/components/layout/PageContent'
import { PrimaryButton, OutlineButton } from '@/components/ui/Button'
import MembersTable from '@/components/teams/MembersTable'
import axios, { AxiosResponse } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'

function Teams() {
    const [userData, setUser] = useState<SetStateAction<Promise<AxiosResponse<any, any>>>>()
    const [userChange, setUserChange] = useState(true)
    const [emailChange, setEmailChange] = useState(true)

    useEffect(()=> {
        something()
    }, [])

    async function something(){
        const user = await axios.get("http://localhost:3000/api/user")
        console.log(user.data)
        setUser(user.data)
    }
    return (
        <div className='text-gray-500 w-full'>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className='text-sm font-semibold text-red-800'>Profile Settings</h1>
                        <p className='text-xs font-medium'>Manage Your account details from this interface</p>
                    </div>
                </PageNavbarLeftContent>
                </PageNavbar>

            <PageContent>
                {/* header */}
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Username</label>
                    <input type ="text" onChange={() => setUserChange(false)} placeholder={userData?.userName} />
                        <OutlineButton>
                    <div>
                        {   userChange ?
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change username to update credentials</h1>
                            :
                            <h1 onChange={() => {}} className='text-sm justify-center font-semibold text-red-800' >Update Username</h1>
                        }
                    </div>
                        </OutlineButton>
                    </div>

                </div>
                    <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Email Adress</label>
                    <input type ="email" onChange={() => {setEmailChange(false)}} placeholder={userData?.email} />
                        <OutlineButton>
                    <div>
                        {   emailChange ?
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change Email to update credentials</h1>
                            :
                            <h1 className='text-sm justify-center font-semibold text-red-800' >Update Email</h1>
                        }
                    </div>
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Password</label>
                        <OutlineButton>
                    <div>
                          <h1 className='text-sm justify-center font-semibold text-red-800' >Update Password</h1>
                        
                    </div>
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />


            </PageContent>

        </div>
    )
}

export default Teams
