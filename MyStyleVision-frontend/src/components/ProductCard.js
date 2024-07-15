import React from 'react';

const ProductCard = ({ image, rating, brand, name, price, originalPrice, discount }) => {
  return (
    <div className="max-w-[350px] bg-white shadow-md rounded-lg overflow-hidden m-4 relative">
      <img
        className="w-full h-72 object-cover"
        src={image}
        alt={name}
      />
      <div className="p-3">
        <div className="flex px-2  items-center absolute top-[256px] left-[5px] bg-white">
          <span className="text-sm font-medium text-gray-700">{rating}</span>
          <span className="text-xl bg-white text-green-500 pl-[2.5px] ">★</span>
        </div>
        <h2 className="mt-1 text-xl font-extrabold text-gray-900">{brand}</h2>
        <p className="mt-1 text-sm text-gray-600">{name}</p>
        <div className="mt-2 flex items-center">
          <span className="text-xl font-bold text-gray-900">Rs. {price}</span>
          <span className="ml-2 text-sm line-through text-gray-500">Rs. {originalPrice}</span>
          <span className="ml-2 text-sm font-medium text-red-500">({discount} OFF)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
