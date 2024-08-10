import React from "react";

interface ISelectType {
  type: string;
}

const SelectType: React.FC<ISelectType> = ({ type }) => {
  return (
    <div className="flex gap-2 justify-center items-center my-2">
      <div className="">
        {type === "buy" ? (
          <div className="text-md font-bold">Buying Price</div>
        ) : (
          <div className="text-md font-bold">Selling Price</div>
        )}
      </div>
    </div>
  );
};

export default SelectType;
