'use client'

import { useRouter } from 'next/navigation';


import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg';

const AddPost = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);



    return (

        <div className='w-[100vw] h-[100vh] bg-white text-black p-6'>
            <h1 className='text-2xl font-semibold mb-2'>Add Post</h1>
            <form className='flex flex-col gap-4'
                id='add-post'
                onSubmit={async (e) => {
                    e.preventDefault()
                    const title = e.target.title.value
                    const description = e.target.description.value
                    const author = e.target.author.value
                    console.log(title, description, author)
                    try {
                        setIsLoading(true);
                        await fetch('http://localhost:3002/blogs', {

                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                title,
                                description,
                                author
                            })
                        })
                        setIsLoading(false);
                        await fetch('http://localhost:3002/blogs',)

                        router.push('/');
                        router.refresh();


                    } catch (error) {
                        throw error
                    }

                }}
            >
                <input className='w-full  border border-gray-500 bg-gray-50 rounded-lg trxt-white p-4' placeholder='Enter Title' name='title' required={true}></input>
                <input className='w-full  border border-gray-500 bg-gray-50 rounded-lg trxt-white p-4' placeholder='Enter Description' name='description' required={true}></input>
                <input className='w-full  border border-gray-500 bg-gray-50 rounded-lg trxt-white p-4' placeholder='Enter Author' name='author' required={true}></input>


            </form>
            <div className='flex flex-row justify-center'>
                {isLoading && <CgSpinner className='w-10 h-10 mt-4 animate-spin'></CgSpinner>}
            </div>

            <button className='p-2 border border-gray-100 rounded-lg mt-5 bg-zinc-400' type='submit' form='add-post'>Add post</button>



        </div>
    )
}

export default AddPost
