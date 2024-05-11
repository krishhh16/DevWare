"use client"

import PageNavbar, { PageNavbarLeftContent } from '@/app/components/layout/PageNavbar'
import PageContent from '@/app/components/layout/PageContent'
import { OutlineButton } from '@/app/components/ui/Button'
import axios, { AxiosResponse } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import z from "zod"
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const provider = new GithubAuthProvider();
provider.addScope('repo')
const firebaseConfig = {
  apiKey: "AIzaSyDz_x22m7vDU9RrE7KHXH_1rBINGK4XbTY",
  authDomain: "devware-b01ed.firebaseapp.com",
  projectId: "devware-b01ed",
  storageBucket: "devware-b01ed.appspot.com",
  messagingSenderId: "363045197813",
  appId: "1:363045197813:web:4cc581110467a1132cb2bc",
  measurementId: "G-K30WJG12BQ"
};

const app = initializeApp(firebaseConfig);
const prov = new GithubAuthProvider();

const emailSchema = z.coerce.string().email({message: "Invalid email address"});

enum UserEnum {
    USERNAME,
    EMAIL,
    PASSWORD
}
function Teams() {
    const [userData, setUser] = useState<SetStateAction<Promise<AxiosResponse<any, any>>>>()
    const [userChange, setUserChange] = useState(true)
    const [emailChange, setEmailChange] = useState(true)
    const [passwordChange, setPasswordChange] = useState(true)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGitLogin = () => {
        const auth = getAuth();
      signInWithPopup(auth, provider)
      .then(result => {
        console.log(result.user)
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token)
    
        const user = result.user;
        const {displayName, photoURL, email} = result.user;
    
      })
      .catch(err => {
        console.log('something went wrong')
      })
      }
    async function updateUserData(which: UserEnum, data: String) {
        const field: string = which === UserEnum.USERNAME ? 'username' : (which === UserEnum.EMAIL ? 'email' : 'password');
        if (which === UserEnum.EMAIL){
            try {
                emailSchema.parse(email)
                alert("success")
            }catch(err){
                alert(err)
                return
            }
        }

        console.log({data, which})
        const response = await axios.post("http://localhost:3000/api/updateUser" , {
            data: {
                field,
                data
            }
        })

        console.log(response.data)
        if(!response.data.success){
            alert('An error occured while updating your creds.')
        }else {
            alert("User data updated!")
            
        }
    }

    useEffect(()=> {
        something()
    }, [])

    async function something(){
        const user = await axios.get("http://localhost:3000/api/user")
        console.log(user.data)
        setUser(user.data)
    }
    return (
        <div className='text-gray-500 w-full m-4 ml-4'>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div className="text-white flex flex-col mt-10">
                        <h1 className="text-3xl font-semibold mb-2 ">Profile Settings</h1>
                        <p className="text-gray-400 mb-10">Manage your account details from this interface</p>
                    </div>
                </PageNavbarLeftContent>
                </PageNavbar>
            <PageContent>
                <div className="space-y-6">
                    <div className="border-b border-gray-700 pb-5">
                        <label className="block text-lg font-medium mb-1 text-white" htmlFor="username">Username</label>
                        <div className="flex items-center">
                        <input
                        className="bg-gray-800 border-none text-sm rounded-md p-2" 
                        type="text" onChange={(e) => {
                            setUserChange(false)
                            setUserName(e.target.value)
                            console.log(username)
                        }} placeholder={userData?.userName} value={userChange ? userData?.userName : username} />
                        <div className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md">
                            <OutlineButton>
                                    {userChange ?
                                        <h1 className='block text-sm font-small mb-1 text-center pt-0.8'>Change username to update credentials</h1>
                                        :
                                        <h1 onClick={() => {
                                            updateUserData(UserEnum.USERNAME, username)
                                        }} className='block text-sm font-small mb-1 text-center pt-0.8' >Update Username</h1>
                                    }
                            </OutlineButton>
                        </div>
                        </div>
                    </div>
                </div>

               
                <div className="space-y-6">
                    <div className="border-b border-gray-700 pb-5">
                    <label className="block text-lg font-medium mb-1 text-white" htmlFor="username">Email Address</label>
                    <div className="flex items-center">
                    <input type ="email"
                    className="bg-gray-800 border-none text-sm rounded-md p-2 w-[21%]"  
                    onChange={(e) => {
                        setEmailChange(false)
                        setEmail(e.target.value)
                        console.log(email)
                        }} placeholder={userData?.email} 
                        value={ emailChange ? userData?.email : email}
                    />
                        <div className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md">
                        <OutlineButton>
                        {   emailChange?
                        <div>
                            <h1 className='block text-sm font-small mb-1 text-center pt-0.8' >Change Email to update credentials</h1>
                        </div>
                            :
                            <div onClick={() => {updateUserData(UserEnum.EMAIL, email)}}>
                                <h1 className='block text-sm font-small mb-1 text-center pt-0.8'>Update Email</h1>
                             </div>
                        }
                        </OutlineButton>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border-b border-gray-700 pb-5">
                        <label className="block text-lg font-medium mb-1 text-white" htmlFor="username">Password</label>
                        <div className="flex items-center">
                            <input
                                value={password}
                                className="bg-gray-800 border-none text-sm rounded-md p-2 w-1/4"
                                type="password" onChange={(e) => {
                                    setPasswordChange(false)
                                    setPassword(e.target.value)
                                    console.log(email)
                                }} />
                            
                            <div className='ml-4 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md'>
                            <OutlineButton>
                                <div onClick={() => {
                                    updateUserData(UserEnum.PASSWORD, password)
                                }}>
                                    <h1 className='block text-sm font-small mb-1 text-center pt-0.8 w-60'>Update Password</h1>

                                </div>
                            </OutlineButton>
                            </div>
                        </div>
                    </div>
                </div>
                
            </PageContent>

        </div>
    )
}

export default Teams
