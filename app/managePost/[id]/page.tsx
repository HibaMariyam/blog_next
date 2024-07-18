'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface Prop {
    params: {
        id: string
    }
}

const EditPost = ({ params }: Prop) => {

    const [blog, setBlog] = useState({

        title: '',
        description: '',
        author: ''
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const blog: Blog = await fetch(`http://localhost:3002/blogs/${params.id}`,).then((res) => res.json())

                setBlog({
                    title: blog.title,
                    description: blog.description,
                    author: blog.author
                });
                console.log("title isssss: ", blog.title);

                setIsLoading(false);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-[100vw] h-[100vh] bg-white text-black p-6'>
            <h1 className='text-2xl font-semibold mb-2'>Edit Post</h1>
            <form className='flex flex-col gap-4' id='edit-post'
                onSubmit={async (e) => {

                    e.preventDefault();

                    const title = e.target.title.value;
                    const description = e.target.description.value;
                    const author = e.target.author.value;
                    console.log(title, description, author)
                    try {
                        setEditLoading(true);
                        await fetch(`http://localhost:3002/blogs/${params.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                title,
                                description,
                                author
                            })
                        })

                        setEditLoading(false);
                        await fetch('http://localhost:3002/blogs')
                        router.push('/')
                        router.refresh();

                    } catch (error) {
                        console.error(error);
                    }

                }}
            >
                <input
                    className='w-full border border-gray-500 bg-gray-50 rounded-lg text-black p-4'
                    placeholder='Enter Title'
                    name='title'
                    required={true}
                    defaultValue={blog.title}


                />
                <input
                    className='w-full border border-gray-500 bg-gray-50 rounded-lg text-black p-4'
                    placeholder='Enter Description'
                    name='description'
                    required={true}
                    defaultValue={blog.description}

                />
                <input
                    className='w-full border border-gray-500 bg-gray-50 rounded-lg text-black p-4'
                    placeholder='Enter Author'
                    name='author'
                    required={true}
                    defaultValue={blog.author}


                />
            </form>
            <div className='flex flex-row justify-center'>
                {isLoading && <CgSpinner className='w-10 h-10 mt-4 animate-spin'></CgSpinner>}
            </div>
            <div className='flex flex-row justify-center'>
                {editLoading && <CgSpinner className='w-10 h-10 mt-4 animate-spin'></CgSpinner>}
            </div>
            <button className='p-2 border border-gray-100 rounded-lg mt-5 bg-zinc-400' type='submit' form='edit-post'>
                Update Post
            </button>
        </div>
    );
};

export default EditPost;
