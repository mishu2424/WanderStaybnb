import React, { useState } from "react";
import Filter from "../../components/shared/Filter";
import { IoLocationOutline } from "react-icons/io5";
import { categories } from "./CategoriesData";
import CategoryBox from "./CategoryBox";
import Container from "../../components/shared/Container";
import Rooms from "../../components/Rooms/Rooms";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import CategoryButtons from "./CategoryButtons";
import { destroy } from "splash-screen";
import { useRef } from "react";
const Categories = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortText, setSortText] = useState("");
  const searchRef=useRef();
  const axiosCommon = useAxiosCommon();

  const getData = async () => {
    const { data } = await axiosCommon(
      `/rooms?page=${currentPage}&limit=${itemsPerPage}&category=${category}&search=${searchText}&sort=${sortText}`
    );
    destroy();
    return data;
  };

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", currentPage, category, searchText, sortText],
    queryFn: getData,
  });

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosCommon(
        `/rooms-count?category=${category}&search=${searchText}`
      );
      setCount(data.count);
    };

    getCount();
  }, [category, searchText]);

  // console.log(searchText, rooms);

  const handleCategoryChange = (label) => {
    setCurrentPage(1);
    setCategory(label);
    console.log("clicked");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchRef);
    console.log(searchRef.current.value);
    setSearchText(searchRef.current.value)
    // setSearchText(e.target.value);
    setCurrentPage(1);
    // e.target.reset();
  };

  const handleSort = (e) => {
    // let sortedItems=[];
    setSortText(e.target.value);
    // console.log(e.target.value);
    // console.log(sortedItems);
    // setItems(items);
  };

  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((element) => element + 1);

  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      <div className="space-y-5">
        {/* Categories search */}

        <div className="flex items-center justify-center my-5">
          <form
            onSubmit={(e) => handleSearch(e)}
            className="input flex justify-between w-3/4 border border-green-800 pr-0"
          >
            <IoLocationOutline className="text-green-800" />

            <input
              // onBlur={(e) => {
              //   setSearchText(e.target.value);
              // }}
              defaultValue={searchText && searchText}
              ref={searchRef}
              type="search"
              className="grow px-0"
              placeholder="Search by location, or any keyword"
            />
            <button className="btn px-4 py-2 border border-green-800 bg-green-800 text-white">
              Search
            </button>
          </form>
          <Filter sortText={sortText} handleSort={handleSort} />
        </div>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              handleCategoryChange={handleCategoryChange}
              label={item.label}
              icon={item.icon}
              category={category}
            />
          ))}
        </div>

        <Rooms rooms={rooms} />

        <CategoryButtons
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
          totalPages={totalPages}
        />
      </div>
    </Container>
  );
};

export default Categories;
