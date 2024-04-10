import { ChatWindow } from "@/components/Chat/ChatWindow";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden m-10">
      <h1 className="text-3xl md:text-4xl mb-4 ">
        DevWare - For persistent developers, who deny to fail 

      </h1>
      <ul>
        <li className="text-l">
          👋 
          <span className="ml-2">
            Hey! Welcome to the onboarding process, step into the arena of your social growth.
          </span>{"  "}
           
        </li>
        <li className="text-l">
          
          <span className="ml-2">
            Our chatbot is your personal concierge, here to guide and customize your onboarding experience.
          </span>{"  "} 
        </li>
        <li className="text-l">
          👐
          <span className="ml-2">
            The questions here are intended to personalize your content so more detailed answers ---{">"} better experience
          </span>{""}  
        </li>
      </ul>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat"
      emoji="🏴‍☠️"
      titleText="Come in the Clan"
      placeholder="I'm here to help you be consistent on socials!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
