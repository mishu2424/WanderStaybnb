import React from "react";
import useAuth from "../../hooks/useAuth";

const Fact = ({ icon, label }) => {
  const { theme } = useAuth();
  return (
    <div className="flex items-center gap-2 p-3 border rounded-xl">
      <span className={`${theme === "night" && `text-white`} text-gray-700`}>
        {icon}
      </span>
      <span className={`${theme === "night" && `text-white`} text-gray-700`}>{label}</span>
    </div>
  );
};

export default Fact;
