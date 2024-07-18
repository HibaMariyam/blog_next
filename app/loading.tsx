'use client'
import React, { useEffect } from 'react'


const Loading = () => {
    // useEffect(async () => {

    //     const blogs: Blog[] = await fetch("http://localhost:3002/blogs", { cache: "no-store" }).then((res) => res.json())


    // }, [])
    return (
        <div className='m-6'>
            <h1 className='text-2xl font-semibold'>Loading...</h1>
        </div>
    )
}

export default Loading
