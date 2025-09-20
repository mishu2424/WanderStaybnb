import { PiSlidersBold } from "react-icons/pi";

const Filter = ({ sortText, handleSort }) => {
  return (
    <div className="dropdown dropdown-start">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-xs md:btn-md m-1 border border-green-800 text-green-800"
      >
        {`${sortText ? `Sort By ${sortText}` : "Sort"}`}{" "}
        <PiSlidersBold></PiSlidersBold>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li
          onClick={() => {
            handleSort("Price: Hight to low");
          }}
        >
          <a>Price: Hight to low</a>
        </li>
        <li
          onClick={() => {
            handleSort("Price: Low to High");
          }}
        >
          <a>Price: Low to High</a>
        </li>
        <li
          onClick={() => {
            handleSort("Rating: Hight to low");
          }}
        >
          <a>Rating: Hight to low</a>
        </li>
        <li
          onClick={() => {
            handleSort("Rating: Low to high");
          }}
        >
          <a>Rating: Low to high</a>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
