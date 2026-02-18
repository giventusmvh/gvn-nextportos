import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-500 bg-primary-500/10"
    : "text-[#ADB7BE] border-slate-600 hover:border-white hover:text-white";

  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-6 py-2 text-lg cursor-pointer transition-all duration-300`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
