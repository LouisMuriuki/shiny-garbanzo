import React, { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components/Index";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const RenderCards = ({ data, title, openModal, closeModal }) => {
  if (data?.length > 0)
    return data?.map((post, i) => <Card key={i} {...post} />);
  return (
    <h2 className="mt-2 font-bold uppercase text-[#6449ff] text-xl">{title}</h2>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchtext, setSearchText] = useState("");
  const [searchResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const GetPosts = useCallback(async () => {
    const res = await axios.get(
      "https://dalle-qgms.onrender.com/api/v1/post/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }, []);

  const GetPostsQuery = useQuery({
    queryKey: ["monthlymeetings"],
    queryFn: () => GetPosts(),
  });

  useEffect(() => {
    setPosts(GetPostsQuery?.data?.data?.reverse());
  }, [GetPostsQuery.data]);
 

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = posts?.filter(
          (item) =>
            item.name.toLowerCase().includes(searchtext.toLocaleLowerCase()) ||
            item.prompt.toLowerCase().includes(searchtext.toLocaleLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-lg md:text-2xl">
          Aimagen Community Show-Case
        </h1>
        <p className="mt-2 text-[#666e75] text=[16px] max-w-[800px]">
          Download and browser through a collection of imaginative and visually
          stunning AI images generated by other users
        </p>
        <div className="flex items-center gap-2 ">
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[800px] ">
            Create, download and share your very own AI images with the AIMAGEN
            community
             <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 pt-2 md:mt-0"
          >
            Create
          </Link>
          </p>
         
        </div>
      </div>
      <div className="mt-16">
        <FormField
          type="text"
          labelName="Search Images"
          name="text"
          placeholder="Search Images by Prompt Keywords"
          value={searchtext}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10 ">
        {GetPostsQuery.isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchtext && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3 ">
                showing results for <span>{searchtext}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchtext ? (
                <RenderCards
                  data={searchResults}
                  title="No search results Found"
                />
              ) : (
                <RenderCards data={posts} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
