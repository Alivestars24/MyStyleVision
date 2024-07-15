import React from 'react';
import products from "./data";
import ProductCard from './ProductCard';

export default function reviewSlider({recommendations}){
    return (
        <div className=" px-10 pt-2 pb-10">
          <div className="flex flex-wrap justify-center gap-x-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={recommendations[index]}
                rating={product.rating}
                brand={product.brand}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
              />
            ))}
          </div>
        </div>
      );
}