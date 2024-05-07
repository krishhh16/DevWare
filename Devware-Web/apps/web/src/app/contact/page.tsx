"use client"

import Breadcrumb from "@/app/components/Common/Breadcrumb";
import Contact from "@/app/components/Contact";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const runtime = 'edge'


const ContactPage = () => {
  useEffect(()=>{
	  (async function () {
		const cal = await getCalApi({});
		cal("ui", {"theme":"light","styles":{"branding":{"brandColor":"#121723"}},"hideEventTypeDetails":false,"layout":"month_view"});
	  })();
	}, []);

  
  return (
    <>
    
    
      <Breadcrumb
        pageName="Contact Page"
        description="Every criticism and feature-request will surely be considered and worked on:)) "
      />
      <Cal 
      calLink="krishna-tripathi-obpadr/30min"
      style={{width:"100%",height:"100%",overflow:"scroll"}}
      config={{layout: 'month_view'}}
    />

      <Contact />
    </>
  );
};

export default ContactPage;
