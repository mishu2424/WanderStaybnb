import React from 'react';

const Fact = ({ icon, label }) => {
    return (
        <div className="flex items-center gap-2 p-3 border rounded-xl">
      <span className="text-gray-700">{icon}</span>
      <span className="text-gray-800">{label}</span>
    </div>
    );
};

export default Fact;