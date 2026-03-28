import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemContext"

export function ThemeToggle() {

    const { dark, toggleTheme} = useTheme()

    return (
        <>
            <button onClick={toggleTheme} 
            className="bg-gray-100 hover:bg-gray-200 text-black dark:bg-[#141f3b] hover:dark:bg-[#141f3b82] dark:text-white cursor-pointer p-2 rounded-[10px]">
                {dark? (
                    <Sun className="w-5 h-5" />
                ):(
                    <Moon className="w-5 h-5" />
                )}
            </button>
        </>
    )
}