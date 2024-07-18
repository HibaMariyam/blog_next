import React from 'react'

interface Prop {
    params: {
        id: string
    }
}

const BlogDetailPage = async ({ params }: Prop) => {
    const blog: Blog = await fetch(`http://localhost:3002/blogs/${params.id}`, { cache: "no-store" }).then((res) => res.json())
    return (
        <div className='m-10'>

            <div key={blog.id}>
                <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
                <p>{blog.description}</p>
            </div>


        </div>

    )
}

export default BlogDetailPage
