"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/app/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/app/components/layout/PageContent';
import axios from 'axios';
import { useState } from 'react';

function Integrations() {
    const [file, setFile] = useState('');
    const [text, setText] = useState('');
    const [post, setPost] = useState('') 

    const onPost = async () => {
        const response = await axios.post('http://localhost:3000/api/pref-post', {
            post 
        })

        if (!response.data.success){
            alert('Unable to upload your posts')
        }else {
            alert('Post Uploaded')
        }
    }
    const submitPdf = async (e) => {
        e.preventDefault()
        const formData= new FormData();
        formData.append('file', file)
        console.log(file);

        const result = await axios.post("http://localhost:3001/upload-file", formData, {
            headers: { "Content-Type" : "multipart/form-data"},
        });

        console.log(result.data)
        setText(result.data.text)
    }   

    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className='text-sm font-semibold text-white-800'>Knowledge base</h1>
                        <p className='text-xs font-medium text-white-500'>Manage your Knowledge base that will be sent to your chatbot</p>
                    </div>
                </PageNavbarLeftContent>
                <PageNavbarRightContent>
                    <PageNavbarPrimaryButton>
                        <Add size={16} />
                        <span className='hidden md:inline'>Add KB</span>
                    </PageNavbarPrimaryButton>
                </PageNavbarRightContent>
            </PageNavbar>

            <PageContent>
               <form onSubmit={submitPdf}>
                <div>
                    <h3>Upload Your resume</h3>
                    <input onChange={(e)=> {setFile(e.target.files[0])} } type='file' className='form-control' accept='application/pdf'/>
                    <button type='submit'>Submit</button>
                    <h2>{text}</h2>
                </div>
                <div>
                    <h3>Post the posts that you like</h3>
                    <textarea onChange={(e) => {
                        setPost(e.target.value)
                        }} value={post}>
                    </textarea>
                    <button onClick={() => {onPost()}} ></button>
                </div>
               </form>

            </PageContent>

        </div>
    )
}

export default Integrations
