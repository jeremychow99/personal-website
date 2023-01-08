"use client"
import type { NextComponentType } from "next";
const Footer: NextComponentType = () => {
    return (

<footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 " style={{ position: "absolute", bottom: 0, width:"100%" }}>
    <span className="text-md text-black-500 sm:text-center">© 2023 <a href="" className="hover:underline">Testing</a>. 
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      
    </ul>
</footer>
    )
}

export default Footer