import { PiSlidersBold } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";

const Filter = ({ sortText, handleSort }) => {
  const { theme } = useAuth();
  return (
    <div
      className={`dropdown dropdown-start ml-2 ${
        theme === "night" && "bg-white"
      }`}
    >
      {/* <div
        tabIndex={0}
        role="button"
        className="btn btn-xs md:btn-md m-1 border border-green-800 text-green-800"
      >
        {`${sortText ? `Sort By ${sortText}` : "Sort"}`}{" "}
        <PiSlidersBold></PiSlidersBold>
      </div> */}
      <div className="flex items-center min-w-[200px] border border-green-800 px-2">
        <select
          value={sortText}
          name="sort"
          onChange={(e) => handleSort(e)}
          className="select text-green-800 bg-white border-0 
             focus:outline-none focus:ring-0 focus:border-0 
             focus:shadow-none !outline-none !ring-0 !shadow-none"
        >
          <option value="">Sort by Order Count</option>
          <option value="asc-p">Price: High to low</option>
          <option value="desc-p">Price: Low to high</option>
          <option value="asc-r">Rating: High to low</option>
          <option value="desc-r">Rating: Low to high</option>
        </select>
        <PiSlidersBold
          className={`text-green-800 ${theme === "night" && "text-green-800"}`}
        ></PiSlidersBold>
      </div>
    </div>
  );
};

export default Filter;
