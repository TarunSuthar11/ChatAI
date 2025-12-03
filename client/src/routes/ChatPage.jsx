import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Image } from "@imagekit/react";
import Markdown from "react-markdown";


export default function ChatPage() {

  const path = useLocation().pathname; // for navigating 
  const chatId = path.split("/").pop();

  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  // console.log(data);


  return (
    <div className="flex flex-col w-full  justify-self-center  md:max-w-[630px] lg:max-w-[750px] xl:max-w-[900px] 2xl:max-w-[1100px] overflow-y-scroll scroll-smooth scrollbar-hide h-[calc(100vh-52px)]  ">
      <div className="flex-1  space-y-4 mt-20 mb-10">

    {/* All messages from db */}
      </div>
      {data?.history?.map((chat, i) => (
        <div key={i}>
          {chat.img && (
            <div className="flex justify-end m-2 ">
              <Image
                className=" rounded-2xl"
                src={chat.img}
                width="300"
                transformation={[{ width: 300 }]}
              />
            </div>
          )}
          {i !== 0 && chat.role === "user" && (
            <div className="flex justify-end ">
              <span className="p-1.5 bg-(--ternary-bg-color) rounded-xl px-3 m-2 max-w-[80%] ">{ chat.parts[0].text }</span>
            </div>
          )}
          {chat.role === "model" && (
            <div className="flex justify-start m-2 px-3 max-w-full">
              <span className="gemini-markdown"><Markdown>{chat.role === "model" ? chat.parts[0].text : null}</Markdown></span>
            </div>
          )}
        </div>
      ))}

      {data && <NewPrompt data={data} />}

    </div>

  );
}