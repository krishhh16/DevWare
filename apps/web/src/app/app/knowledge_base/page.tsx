"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarPrimaryButton, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Add } from 'iconsax-react'
import PageContent from '@/components/layout/PageContent';
import axios from 'axios';
import { useState } from 'react';

function Integrations() {
    const [file, setFile] = useState('');
    const [text, setText] = useState('');

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
                <h4>Upload shit</h4>
                <input onChange={(e)=> {setFile(e.target.files[0])} } type='file' className='form-control' accept='application/pdf'/>
                <button type='submit'>Submit</button>
                <h2>{text}</h2>
               </form>

            </PageContent>

        </div>
    )
}

export default Integrations
