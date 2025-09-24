import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
// eslint-disable-next-line no-unused-vars
const CategoryBox = ({ label, icon: Icon, handleCategoryChange }) => {
  //   const navigate=useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  // console.log(category);

  const handleCategoryRoute = () => {
    // create query string
    // const currentQuery={category:label};
    // const url=queryString.stringifyUrl({
    //   url:'/',
    //   query:currentQuery
    // });
    // // console.log(url);
    // // set query string in url
    // navigate(url);
  };
  return (
    <div
      onClick={() => handleCategoryChange(label)}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer
  ${category === label && `border-black`}
  `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
