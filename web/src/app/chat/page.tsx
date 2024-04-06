import { ChatWindow } from "@/components/Chat/ChatWindow";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden text-center m-10">
      <h1 className="text-3xl md:text-4xl mb-4 ">
        DevWare - For fast developers, who deny to fail 
      </h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            For a better experience please give detailed answers
          </span>{"  "}
          🤝
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