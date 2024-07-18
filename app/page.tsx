import Link from "next/link";
import BlogCard from "./_components/BlogCard";


// import Image from "next/image";

export const revalidate = 1;
export default async function Home() {


  const blogs: Blog[] = await fetch("http://localhost:3002/blogs", { cache: 'no-store', }).then((res) => res.json())
  //When you specify cache: "no-store" in the fetch request, it ensures that the response is not cached and that the request is made to the server each time the component is rendered. This behavior can lead to a loading state because the data needs to be fetched from the server every time the component is rendered.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 gap-4">
      <Link href="/managePost">
        <button className="p-2 border border-gray-100 rounded-lg mb-5 bg-zinc-400">Add post</button>
      </Link>
      {blogs.map((blog) => (
        // <Link href={`/blog/${blog.id}`}>
        <BlogCard key={blog.id} props={blog} />
        // </Link>

      )
      )}
    </main>
  );
}
