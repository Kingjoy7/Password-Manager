import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({
        site: "",
        username: "",
        password: ""
    });
    const [passwordArray, setPasswordArray] = useState([]);
    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            setPasswordArray(JSON.parse(password));
        }
        else {
            setPasswordArray([]);
        }
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("public/icons/eye.png")) {
            ref.current.src = "public/icons/crossed.png";
            passwordRef.current.type = "password";

        }
        else {
            ref.current.src = "public/icons/eye.png";
            passwordRef.current.type = "text";

        }
    }

    const savePassword = () => {
        toast('🦄Password Saved!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        console.log(form);
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
        console.log(passwordArray);
    }
    const deletePassword = (id) => {
        toast('🦄Deleted Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        console.log("Deleting password with id", id);
        let c = confirm("Do you really want to delete this password");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("password", JSON.stringify([passwordArray.filter(item => item.id !== id)]));
        }
    }
    const editPassword = (id) => {
        console.log("Editing password with id", id);
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray([passwordArray.filter(item => item.id !== id)]);

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const copyText = (text) => {
        toast('🦄Copied to Clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-screen w-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">

                <div className="mx-auto max-w-4xl bg-white-100 p-6 h-screen">
                    <h1 className='text-black pt-14 m-6 text-center text-4xl font-bold'>&lt;Pass
                        <span className='text-green-900'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center italic'>Your own Password Manager</p>
                    <div className='text-black flex flex-col p-6 gap-8'>

                        <input onChange={handleChange} value={form.site} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full py-1 px-4' type="text" name='site' />
                        <div className='flex w-full gap-8'>
                            <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full flex border border-green-500  py-1 px-4 w-full' type="text" name='username' />
                            <div className="relative">
                                <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 py-1 px-4 w-full relative' type="text" name='password '/>
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='w-5' src="public/icons/eye.png" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="button flex justify-around text-center ">
                        <button className="border-2 border-green-500 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-2 hover:from-green-500 hover:to-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out font-semibold" onClick={savePassword}>
                            Save Password
                        </button>
                    </div>

                    <div className="passwords">
                        <h2 className='pt-14 pb-3 text-2xl font-bold'>Your passwords</h2>
                        {passwordArray.length === 0 ? (
                            <div>No passwords to show
                            </div>
                        ) : (
                            <table className="table-auto w-full rounded-md overflow-hidden">
                                <thead className='bg-green-800 text-white '>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center py-1 border border-white font-mono '><a href={item.site} target='_blank'>{item.site}</a>
                                                <img className='hover:w-6 copyicon w-5 pt-1 cursor-pointer' onClick={() => copyText(item.site)} src="public/icons/copy.png" alt="copy" />
                                            </td>
                                            <td className=' text-center py-2 border border-white font-mono'>{item.username}
                                                <img className='hover:w-6 copyicon w-5 pt-1 cursor-pointer' onClick={() => copyText(item.username)} src="public/icons/copy.png" alt="copy" />
                                            </td>

                                            <td className='text-center py-2 border border-white font-mono'>{item.password}
                                                <img className='hover:w-6 copyicon w-5 pt-1 cursor-pointer' onClick={() => copyText(item.password)} src="public/icons/copy.png" alt="copy" />
                                            </td>
                                            <td className='text-center py-2 border border-white font-mono'>
                                                <div className='flex justify-center pl-10 w-16 cursor-pointer gap-5'>
                                                    <img onClick={() => { editPassword(item.id) }} className='bg-black' src="public/icons/edit.png" alt="edit" />
                                                    <img onClick={() => { deletePassword(item.id) }} src="public/icons/delete.png" alt="delete" />
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager;
