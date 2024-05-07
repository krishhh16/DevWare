"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/app/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/app/components/layout/PageContent';
import axios from 'axios';
import { useState } from 'react';

export const runtime = 'edge'

function Integrations() {
    const [file, setFile] = useState('')
    const [post, setPost] = useState('') 

    
    const onPost = async () => {
        if (post.length != 0){
        const response = await axios.post('http://localhost:3000/api/pref-post', {
            post 
        })
    } else {
        alert("please put some content inside the Post field to add preferred posts")
    }
       
    }
    const submitPdf = async (e) => {
        e.preventDefault()
        try{
        const formData= new FormData();
        formData.append('file', file)
        console.log(file);

        const result = await axios.post("http://localhost:3001/upload-file", formData, {
            headers: { "Content-Type" : "multipart/form-data"},
        });
        
        const uploadData = await axios.post("http://localhost:3000/api/pref-post", {
            data: result.data.text,
            field: "resume"
        });

        if (uploadData.data.success) {
            alert('Resume Uploaded')
        } else {
            alert("Unable to upload resume")
        }
    } catch (err) {
        alert("AN ERROR OCCURED WHILE UPLOADING")
    }
    }   

    return (
        <div className='text-gray-500 w-full m-4 ml-4'>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div className="text-white flex flex-col mt-10">
                        <h1 className="text-3xl font-semibold mb-2 ">Knowledge base</h1>
                        <p className="text-gray-400 mb-4">Manage your Knowledge base that will be sent to your chatbot</p>
                    </div>
                </PageNavbarLeftContent>
                <PageNavbarRightContent>
                    
                </PageNavbarRightContent>
            </PageNavbar>
            <PageContent>
            <div className="text-left m-4 ml-4">
    <form onSubmit={submitPdf} className="max-w-md mt-2">
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Upload Your Resume</h3>
            <input
                onChange={(e) => {setFile(e.target.files[0])}}
                type='file'
                className='border border-gray-300 rounded-md py-2 px-4 w-full'
                accept='application/pdf'
            />
        </div>
        <div className="text-left">
            <button
                type='submit'
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
                Submit
            </button>
        </div>
    </form>
    <form onSubmit={onPost} className="max-w-md mt-8">
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Post the Posts that You Like</h3>
            <textarea
                onChange={(e) => {setPost(e.target.value)}}
                value={post}
                className="border border-gray-300 rounded-md py-2 px-4 w-full"
            ></textarea>
        </div>
        <div className="text-left">
            <button
                type='submit'
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
                Post
            </button>
        </div>
    </form>

</div>



            </PageContent>

        </div>
    )
}

export default Integrations
