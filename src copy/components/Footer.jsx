import React from 'react'

const Footer = () => {
    return (
        <div className='flex gap-2 justify-center font-mono bg-black w-full py-4 items-center fixed bottom-0 '>
            <div className='font-bold text-white flex gap-3'>
                #Credits: Created with
                <div>
                    <img className='w-6' src="public/icons/heart.jpeg" alt="love" />
                </div>
                <div>
                    by Sujoy Sen
                </div>
            </div>
        </div>
    )
}

export default Footer
