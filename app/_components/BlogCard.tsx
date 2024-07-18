'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { GrLinkNext } from "react-icons/gr";
import { CgSpinner } from 'react-icons/cg'



const BlogCard = ({ props }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (


        <div className='p-6 rounded-lg flex flex-col gap-4 bg-slate-700 w-96'
        // onClick={() => router.push(`/blog/${props.id}`)}
        >
            <h1 className='font-sans font-semibold text-2xl text-white'>{props.title}</h1>
            <p className='font-sans font-light text-sm text-gray-300'>{props.description}</p>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <Link href={`/managePost/${props.id}`}><MdModeEdit className='w-6 h-6 text-white' /></Link>

                    <MdDelete className='w-6 h-6 ml-4 text-white' onClick={async () => {
                        try {
                            setIsLoading(true);
                            await fetch(`http://localhost:3002/blogs/${props.id}`,
                                {
                                    method: 'DELETE',
                                }
                            )
                            setIsLoading(false);
                            await fetch("http://localhost:3002/blogs/")
                            router.refresh();
                        } catch (error) {
                            console.error(error);
                        }

                    }}

                    />
                    <div className='flex flex-row justify-center'>
                        {isLoading && <CgSpinner className='w-10 h-10 mt-4 animate-spin'></CgSpinner>}
                    </div>


                </div>
                <GrLinkNext className='w-6 h-6 text-white' onClick={() => router.push(`/blog/${props.id}`)} />
            </div>


        </div>

    )
}



export default BlogCard
