import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-blue-900 flex justify-between items-center px-4 h-14 mx-auto scroll-m-0'>
            <div className="logo font-bold px-36 text-2xl">
                <span className='text-green-200 cursor-pointer' onClick={()=>(window.location.href = "http://localhost:5175/")}>&lt;Pass</span>
                <span className='text-green-300 font-bold cursor-pointer' onClick={()=>(window.location.href = "http://localhost:5175/")}>OP/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4 px-52 text-white 0'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="#">Contact</a>
                </li>
            </ul> */}
            <button className='w-9 invert flex m-40 gap-2 rounded-full relative' onClick={()=>window.open("https://github.com/","_blank")}>
                <img src="public/icons/github.png" alt="GitHub" />
                <div className='pt-1 font-  bold flex justify-center items-center'>
                    GitHub
                </div>
            </button>   
        </nav>
    )
}

export default Navbar
