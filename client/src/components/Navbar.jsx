import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSidebar } from "../context/sidebarContext";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "../context/themeContext";


const Navbar = () => {

  const { toggleTheme } = useTheme();

  const { setIsOpen } = useSidebar();

  return (
    <nav className=' sticky h-[52px] flex  items-center justify-between px-2 shadow-sm lg:px-3 xl:px-4 bg-(--primary-bg-color) '>
      <div className='flex items-center'>
        <div className="mx-2 md:hidden">
          <button onClick={() => setIsOpen((prev) => !prev)}><HiOutlineMenuAlt2 className="text-2xl " /></button>
        </div>
        <span className="text-xl px-2 cursor-pointer">ChatAI</span>
      </div>
      <div className="flex mx-2 ">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-(--ternary-bg-color) cursor-pointer ">
          <MdLightMode className="text-2xl" />
        </button>

      </div>
    </nav>
  )
}

export default Navbar