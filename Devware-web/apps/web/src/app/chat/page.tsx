import { ChatWindow } from "@/app/components/Chat/ChatWindow";

export const runtime = 'edge'

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
          👊
          <span className="ml-2">
            Our chatbot is your personal concierge, here to guide and customize your onboarding experience.
          </span>{"  "} 
        </li>
        <li className="text-l">
          👐
          <span className="ml-2">
             Interacting with our chatbot is as simple as having a conversation with your friend.This is an open dialogue to talk about your techincal skillset & experience along with the problems you face while building on content. 
          </span>{"  "}
        </li>
        <li className="text-l">
          🔒
          <span className="ml-2">
           Your privacy is our topmost priority. All the information you share with our chatbot is confidential and used solely to enhance your experience.
          </span>{"  "}
        </li>
        <li className="text-l">
          🌱
          <span className="ml-2">
           Ready to dive in? Just start with answering your techincal experience.Don't hesitate if you have none cause 'Everyone starts somewhere so do you'
          </span>{"  "}
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
