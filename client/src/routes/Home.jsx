import { FiSend } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


export default function HomePage() {

  const { user } = useUser(); //  userName
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (titleText) => {
      return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titleText }),
      }
      ).then((res) => res.json());
    },
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      // console.log(data);
      navigate(`/c/${data.id}`);
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.textArea.value;

    if (!text) return;

    mutation.mutate(text);
    e.target.reset();
  };


  return (
    <div className="flex flex-col w-full justify-self-center  md:max-w-[630px] lg:max-w-[900px] xl:max-w-[900px]2xl:max-w-[1100px] overflow-y-scroll scroll-smooth scrollbar-hide h-[calc(100vh-52px)]  ">

      <div className="flex-1 flex justify-center items-center flex-col gap-4 mt-20">
        <div>
          <span className="font-bold mb-5 text-5xl bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">Hello, {user?.firstName}</span>
        </div>

        <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
          <button onClick={() => mutation.mutate(`Hey ChatAI, I am ${user?.firstName}.`)} className="bg-(--ternary-bg-color) cursor-pointer  rounded-2xl px-4 py-2">
            <span>Ask ChatAI</span>
          </button>

          <button onClick={() => mutation.mutate("Can you Analyze & Understand Images? tell me in short!")} className="bg-(--ternary-bg-color) cursor-pointer  rounded-2xl px-4 py-2">
            <span>Analyze Images</span>
          </button>

          <button onClick={() => mutation.mutate("Can You Find Solutions for My Study & Project Problems? tell me in short!")} className="bg-(--ternary-bg-color) cursor-pointer  rounded-2xl px-4 py-2">
            <span>Find Solutions</span>
          </button>
        </div>
      </div>

      {/* Input Box */}
      <div className="px-2 pb-8 pt-1  md:px-3  text-md flex items-center   bg-(--primary-bg-color)/80  sticky z-20  ">
        
        <form action="" className="flex-1  flex gap-2 bg-blend-normal " onSubmit={handleSubmit}>
          <div className=" flex-1 flex  border border-(--secondary-text-color) rounded-3xl items-center pl-4  px-2 py-1   bg-(--secondary-bg-color)  ">
            <input type="text"
              className="outline-none flex-1 max-h-43 w-full overflow-y-auto py-1 field-sizing-content resize-none"
              placeholder="Ask ChatAI..." name="textArea" />
          </div>

          <button type="submit"
            className="p-4 flex bg-blue-500 text-white rounded-full hover:bg-blue-600 place-self-end cursor-pointer">
            <span><FiSend className="text-xl" /></span>
          </button>

        </form>
        
      </div>
    </div>
  );
}