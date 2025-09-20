import React, { useState } from "react";
import Filter from "../../components/shared/Filter";
import { IoLocationOutline } from "react-icons/io5";
import { categories } from "./CategoriesData";
import CategoryBox from "./CategoryBox";
import Container from "../../components/shared/Container";
const Categories = () => {
  const [sortText, setSortText] = useState("");
  const handleSort = (sortType) => {
    // let sortedItems=[];
    setSortText(sortType);
    if (sortType === "Price") {
      // console.log(sortType);
      // sortedItems=items.sort((a,b)=>{
      //     return b.price -a.price;
      // })
    } else {
      // console.log(sortText)
      // sortedItems=items.sort((a,b)=>{
      //     return b.rating -a.rating;
      // })
    }
    // console.log(sortedItems);
    // setItems(items);
  };
  return (
    <Container>
      <div>
        {/* Categories search */}

        <div className="flex items-center justify-center my-5">
          <label className="input w-3/4 border border-green-800">
            <IoLocationOutline className="text-green-800"/>

            <input
              type="search"
              className="grow"
              placeholder="Search by location"
            />
          </label>
          <Filter sortText={sortText} handleSort={handleSort} />
        </div>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox key={item.label} label={item.label} icon={item.icon} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
