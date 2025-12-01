
import { FiX } from "react-icons/fi";
import { useSidebar } from "../context/sidebarContext";
import { Link } from "react-router-dom";
import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useQuery } from '@tanstack/react-query';
import { RiChatNewLine, RiSearchLine } from "react-icons/ri";
import { MdOutlineLibraryAdd } from "react-icons/md";


export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const { user } = useUser()
  const { userId, isLoaded } = useAuth()

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () => fetch(`${import.meta.env.VITE_BACKEND_URL}/api/userchats`, {
      credentials: "include",
    }).then((res) => res.json()),
  });

  return (
    <div
      className={` flex flex-col bg-(--secondary-bg-color) text-(--primary-text-color) shadow-md overflow-scroll h-screen fixed md:static inset-y-0 left-0 w-64  transition-transform duration-300 z-30
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 `}

    >
      {/* Mobile Close Button */}
      <div className=" flex bg-(--secondary-bg-color) justify-between h-[52px] items-center py-4 px-2 sticky z-40 top-0 ">
        <Link to={`/`}>
          <span className="text-lg  px-1.5">ChatAI</span>
        </Link>

        <button onClick={() => setIsOpen(false)}>
          <FiX className="text-4xl px-2 md:hidden" />
        </button>
      </div>
      <div className="flex-col   bg-(--secondary-bg-color)  w-full  sticky z-40 top-13  ">
        <Link className="" to={`/`}>
          <div className="px-3.5 py-1.5 mx-1.5 flex items-center gap-2 hover:bg-(--ternary-bg-color) rounded-2xl"><RiChatNewLine className="text-xl" />
            <span className="text-md font-light">New chat</span></div>
        </Link>

        <Link>
          <div className="px-3.5 py-1.5 mx-1.5 flex items-center gap-2 hover:bg-(--ternary-bg-color) rounded-2xl">
            <RiSearchLine className="text-xl" />
            <span className="text-md font-light">Search Chats</span></div>
        </Link>

        <Link>
          <div className="px-3.5 py-1.5 mx-1.5 flex items-center gap-2 hover:bg-(--ternary-bg-color) rounded-2xl">
            <MdOutlineLibraryAdd className="text-xl" />
            <span className="text-md font-light">library</span></div>
        </Link>
      </div>



      {/* list will be coming from database */}
      <div className=" flex-col  mb-3 mt-2 text-(--primary-text-color)">
        <div className="mx-1.5 px-1.5  pt-3">
          <h3 className=" font-light text-(--secondary-text-color)">chats</h3>
        </div>

        {isPending ? "" :
          data.slice(0).reverse().map((chat) => (
            <Link to={`/c/${chat._id}`} className=" " onClick={() => setIsOpen(false)}>
              <div className="mx-1.5 px-2.5 py-1.5 hover:bg-(--ternary-bg-color) rounded-xl" key={chat._id}>
                <span className="text-md font-light ">{chat.title.substring(0, 24)}{chat.title.length > 23 ? "..." : ""}</span>
              </div>
            </Link>
          ))}

      </div>

      <div className="px-4 py-2 pb-5 flex align-self-end items-center gap-2 sticky z-40 bottom-0 left-0 bg-(--secondary-bg-color)" >
        <span>{!isLoaded ? (<></>) : (<UserButton />)}</span>
        <span className="text-2xl text-(--secondary-text-color)">{user ? (user.fullName) : 'User'}</span>
      </div>


    </div>
  );
}