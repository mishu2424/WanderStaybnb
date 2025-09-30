import PropTypes from "prop-types";

const CategoryBox = ({ label, icon: Icon, handleCategoryChange, category }) => {
  const isActive = category === label;

  return (
    <div
      onClick={() => handleCategoryChange(label)}
      className={`flex flex-col items-center justify-center gap-2 p-3
                  border-b-2 transition cursor-pointer hover:text-neutral-800
                  ${isActive ? "border-black text-neutral-900" : "border-gray-200 text-neutral-600"}`}
      role="button"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCategoryChange(label)}
      aria-pressed={isActive}
      aria-label={`Filter by ${label}`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryBox;
