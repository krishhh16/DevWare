"use client"
import './onboard.css'
import { useState } from 'react';

export default function onBoard() {
    const [userChoice, setChoice] =useState({
        interest: "",
        experience: "",
        social: "",
        socialAwareness: "",
        resume: ""
    });
    const updateChoice = (key, value) => {
        setChoice(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(userChoice)
    }

    const arr = [{
    legend: 'What interests you?', 
    options: [
    {id: "1", name: "interest", value:"AI/ML/DL"},
    {id: "2", name: "interest", value:"Web Dev"},
    {id: "3", name: "interest", value:"BlockChain"},
    {id: "4", name: "interest", value:"DevOps"}]
  },
  {
    legend: 'How experienced are you?', 
    options: [
    {id: "5", name: "experience", value:"Just starting out"},
    {id: "6", name: "experience", value:"Intermediate"},
    {id: "7", name: "experience", value:"Advanced"}
  ]
  },
  {
    legend: 'How active are you on twitter?', 
    options: [
    {id: "8", name: "social", value:"Not at all, just made the account"},
    {id: "9", name: "social", value:"Posting seldomly"},
    {id: "10", name: "social", value:"Posting aggressively"}
  ]
  },
  {
    legend: "How crucial is social presence and #buildinpublic for you in terms of attracting new opportunities?", 
    options: [
    {id: "11", name: "socialAwareness", value:"Really Important, I'm working on it."},
    {id: "12", name: "socialAwareness", value:"Think it's important but not taking actionable-steps"},
    {id: "13", name: "socialAwareness", value:"Never thought about it."}
  ]
  },
  {
    legend: "Do you have a resume?", 
    options: [
    {id: "14", name: "resume", value:"Yes"},
    {id: "15", name: "resume", value:"No, but I'll make one soon"}
  ]
  }]
  const content = arr.map(item => {
    const options = item.options.map(option => {
        return (
            <div className="form__group">
                <input onClick={(e) => {
                        updateChoice(e.target.name, e.target.value)
                    
                }} type="checkbox" key={option.id} id={option.id} value={option.value} name={option.name}/>
                <label htmlFor={option.id}> {option.value} </label>
            </div>
        )
    })
    return (
        
                <fieldset className="border border-black border-solid p-3 rounded-md" >
                    <legend className='pr-2.5 pl-1' >{item.legend}</legend>
                    {options}
                </fieldset>
      
    )
  })

  return (
    <>
      <div className="wrapper">
        <h1>Please answer a few quick questions</h1>
        <div className="grid" style={{color: 'black'}}>
        <form action="">
           {content}
           <button type='submit' onSubmit={(e) => handleSubmit(e)} className='h-8 w-8 gap-1 md:w-auto border py-1 px-2 duration-200 hover:bg-gray-100 rounded-lg text-xs all-center'>
            Submit
           </button>
           
           </form>
        </div>
     </div>
    </>
  );
};


