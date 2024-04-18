"use client"

import PageNavbar, { PageNavbarLeftContent } from '@/components/layout/PageNavbar'
import PageContent from '@/components/layout/PageContent'
import { OutlineButton } from '@/components/ui/Button'
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

export enum UserEnum {
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
                    <input type ="text" onChange={(e) => {
                        setUserChange(false)
                        setUserName(e.target.value)
                        console.log(username)
                    }} placeholder={userData?.userName} value={ userChange ? userData?.userName : username} />
                        <OutlineButton>
                    <div>
                        {   userChange ?
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change username to update credentials</h1>
                            :
                            <h1 onClick={() => {
                                updateUserData(UserEnum.USERNAME, username)
                            }} className='text-sm justify-center font-semibold text-red-800' >Update Username</h1>
                        }
                    </div>
                        </OutlineButton>
                    </div>

                </div>
                    <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Email Adress</label>
                    <input type ="email" onChange={(e) => {
                        setEmailChange(false)
                        setEmail(e.target.value)
                        console.log(email)
                        }} placeholder={userData?.email} 
                        value={ emailChange ? userData?.email : email}
                        />
                        <OutlineButton>
                    
                        {   emailChange ?
                        <div>
                            <h1 className='text-sm justify-center font-semibold text-red-800'>Change Email to update credentials</h1>
                        </div>
                            :
                            <div onClick={() => {updateUserData(UserEnum.EMAIL, email)}}>
                                <h1 className='text-sm justify-center font-semibold text-red-800'>Update Email</h1>
                             </div>
                        }
                    
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <label className='text-blue-800' htmlFor="username">Password</label>
                    <input
                        value={password}
                        type ="password" onChange={(e) => {
                        setPasswordChange(false)
                        setPassword(e.target.value)
                        console.log(email)
                        }}/>
                        <OutlineButton>
                    <div onClick={() => {
                        updateUserData(UserEnum.PASSWORD, password)
                    }}>
                          <h1 className='text-sm justify-center font-semibold text-red-800' >Update Password</h1>
                        
                    </div>
                        </OutlineButton>
                    </div>
                </div>

                <hr className='-mx-4' />
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <OutlineButton>
                        <button type="button" onClick={() => {handleGitLogin()}} className=" dark:shadow-submit-dark flex items-center justify-center rounded-sm text-base font-medium text-white duration-300 hover:text-black">
                      Connect your Github
                    </button>
                        </OutlineButton>
                        <OutlineButton>
                        <button type="button" onClick={() => {handleGitLogin()}} className=" dark:shadow-submit-dark flex items-center justify-center rounded-sm text-base font-medium text-white duration-300 hover:text-black">
                      Connect your Twitter
                    </button>
                        </OutlineButton>
                    </div>

                </div>
                    <hr className='-mx-4' />


            </PageContent>

        </div>
    )
}

export default Teams
