import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

const Blog = () => {
  // blogs state
  const [blogs, setBlogs] = useState([]);

  // blog state
  const [blog, setBlog] = useState({});

  // search term state
  const [searchTerm, setSearchTerm] = useState("");

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    // search title and content
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // get blogs
  const getBlogs = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/blog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // get data from response
    const data = response.data;
    console.log("data: ", data);

    // filter data
    const filteredData = data.filter((blog) => {
      return blog.name !== "undefined";
    });

    // set blogs
    setBlogs(filteredData);
  };

  // useEffect hook
  useEffect(() => {
    getBlogs();
  }, []);

  // add blog
  const addBlog = async (blog) => {
    // post with axios
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/blog",
      blog,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // get data from response
    const data = response.data;
    console.log("data: ", data);

    // add blog to blogs
    setBlogs([...blogs, data]);
  };

  return (
    <>
      <Navbar />
      <h1>Blog</h1>

      {/* form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addBlog(blog);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(event) => {
            setBlog({ ...blog, title: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Content"
          value={blog.content}
          onChange={(event) => {
            setBlog({ ...blog, content: event.target.value });
          }}
        />
        <button type="submit">Add</button>
      </form>

      <br />
      <br />

      {/* search */}
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      {searchTerm == "" ? (
        <>
          {/* map */}
          {blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <h2>
                  {blog.id} - {blog.title}
                </h2>
                <p>{blog.content}</p>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {/* map */}
          {filteredBlogs.map((blog) => {
            return (
              <div key={blog.id}>
                <h2>
                  {blog.id} - {blog.title}
                </h2>
                <p>{blog.content}</p>
              </div>
            );
          })}
        </>
      )}

      <Footer />
    </>
  );
};

export default Blog;
