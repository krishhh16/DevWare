"use client"
import './onboard.css'
import { useState } from 'react';
import axios from 'axios';

export const runtime = 'edge'

export default function onBoard() {
  
  const [userChoice, setChoice] = useState({});
  const updateChoice = (key, value) => {
    setChoice(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const userContent = JSON.stringify(userChoice);
    try{
      const response = await axios.post("http://localhost:3000/api/onboardmcqs", {userContent});
      console.log(response);
      if(!response.data.success){
        alert("Onboard mcqs submission failed!");
      } else{
        window.location.href = 'http://localhost:3000/chat'
      }
    }catch(err){
      console.log(err);
    }
  }

  const arr = [{
    legend: 'What interests you?',
    options: [
      { id: "1", value: "AI/ML/DL" },
      { id: "2", value: "Web Dev" },
      { id: "3", value: "BlockChain" },
      { id: "4", value: "DevOps" }]
  },
  {
    legend: 'How experienced are you?',
    options: [
      { id: "5",value: "Just starting out" },
      { id: "6",value: "Intermediate" },
      { id: "7",value: "Advanced" }
    ]
  },
  {
    legend: 'How active are you on twitter?',
    options: [
      { id: "8", name: "social", value: "Not at all, just made the account" },
      { id: "9", name: "social", value: "Posting seldomly" },
      { id: "10", name: "social", value: "Posting aggressively" }
    ]
  },
  {
    legend: "How crucial is social presence and #buildinpublic for you in terms of attracting new opportunities?",
    options: [
      { id: "11",value: "Really Important, I'm working on it." },
      { id: "12",value: "Think it's important but not taking actionable-steps" },
      { id: "13",value: "Never thought about it." }
    ]
  },
  {
    legend: "Do you have a resume?",
    options: [
      { id: "14",value: "Yes" },
      { id: "15",value: "No, but I'll make one soon" }
    ]
  }]
  const content = arr.map((item,queIndex) => {
    const options = item.options.map(option => {
      return (
        <div key={option.id} className="form__group">
          <input type="radio" id={option.id} name={item.legend} value={option.value} checked={userChoice[item.legend]===option.value} onChange={()=> updateChoice(item.legend,option.value)} required/>
          <label htmlFor={option.id}> {option.value} </label>
        </div>
      )
    })
    return (
      <fieldset key={queIndex} className="border border-black border-solid p-3 rounded-md" >
        <legend className='pr-2.5 pl-1' >{item.legend}</legend>
        {options}
      </fieldset>
    )
  })

  return (
    <>
      <div className="wrapper">
        <h1>Please answer a few quick questions</h1>
        <div className="grid" style={{ color: 'black' }}>
          <form  onSubmit={(e) => handleSubmit(e)} >
            {content}
            <button type='submit' className='h-8 w-8 gap-1 md:w-auto border border-black py-1 px-2 duration-200 hover:bg-gray-100 rounded-lg text-xs all-center'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};


