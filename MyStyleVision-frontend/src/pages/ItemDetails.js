import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_items_by_id } from "../api";
import ItemDetailsPanel from "../components/ItemDetailsPanel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import SpinnerComp from "../components/SpinnerComp";
import ReviewSlider from "../components/ReviewSlider";
import axios from "axios";

export default function ItemDetails() {
  const { item_id } = useParams();
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    image_urls: [],
    techpack_url: "",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState(false);

  const [url, setUrl] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const updateText = (newTitle, newDescription, newGender) => {
    setItemTitle(newTitle);
    setItemDescription(newDescription);
    setGender(newGender);
  };

  const fetchRecommendations = async (imageUrl) => {
    try {
      const response = await axios.post("http://localhost:8000/recommend/recommend", { url: imageUrl });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const updateItemData = (newData) => {
    setItemData(newData);
    setActiveIndex(0);
    setItemTitle(newData.title);
    setItemDescription(newData.description);
    setGender(newData.gender);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchItemDetails() {
      setLoading(true);
      const res = await get_items_by_id(item_id);
      setItemData(res);
      setActiveIndex(0);
      setItemTitle(res.title);
      setItemDescription(res.description);
      setGender(res.gender);
      setLoading(false);
      const imageUrl = res.image_urls[0];
      setUrl(imageUrl);
      fetchRecommendations(imageUrl);
    }
    fetchItemDetails();
  }, [item_id]);

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? itemData.image_urls.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === itemData.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col ml-24 mx-auto">
      <div className="flex justify-start mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-[600px] w-[500px]">
            <SpinnerComp />
          </div>
        ) : (
          <div className="relative flex flex-col items-center p-14">
            <img
              className="h-[600px] w-[500px] object-contain object-center"
              src={itemData.image_urls[activeIndex]}
              alt=""
            />
            <div className="relative mt-4" style={{ maxWidth: "490px" }}>
              <button
                onClick={prevImage}
                className="absolute left-[-50px] top-[50%] transform -translate-y-1/2 bg-black text-white p-2"
                title="Previous Image"
              >
                <ChevronLeftIcon className="h-20 w-5" />
              </button>
              <div className="grid grid-cols-3 gap-2">
                {itemData.image_urls?.map((imgelink, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      index === activeIndex ? "ring-4 ring-blue-500" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img
                      src={imgelink}
                      className="h-32 w-full rounded-lg object-cover object-center"
                      alt="gallery"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={nextImage}
                className="absolute right-[-50px] top-[50%] transform -translate-y-1/2 bg-black text-white p-2 "
                title="Next Image"
              >
                <ChevronRightIcon className="h-20 w-5" />
              </button>
            </div>
          </div>
        )}
        <div className="leading-relaxed max-w-md ml-20 mt-20 ">
          <ItemDetailsPanel
            title={itemTitle}
            description={itemDescription}
            onUpdate={updateText}
            onItemDataUpdate={updateItemData}
            gender={gender}
            setGender={setGender}
            techpack_url={itemData.techpack_url}
            item_id={item_id}
            setLoading={setLoading}
            img_urls={itemData.image_urls}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="text-4xl text-brand font-bold px-6 ml-32 mt-4">Similar Products:</div>
        {/* <ReviewSlider recommendations={recommendations}/> */}
        <div className="flex flex-wrap justify-center">
          {recommendations.map((item, index) => (
            <div key={index} className="max-w-[300px] max-h-[480px] bg-white shadow-md rounded-lg overflow-hidden m-4 relative">
              <img
                className="w-full h-72 object-cover"
                src={item.image_url}
                alt={`Recommendation ${index}`}
              />
              <div className="p-3">
                <div className="flex px-2 items-center absolute top-[256px] left-[5px] bg-white">
                  <span className="text-sm font-medium text-gray-700">4.2</span>
                  <span className="text-xl bg-white text-green-500 pl-[2.5px]">★</span>
                </div>
                <h2 className="mt-1 text-xl font-extrabold text-gray-900">{item.brand || "Brand"}</h2>
                <p className="mt-1 text-sm text-gray-600">{item.productDisplayName}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xl font-bold text-gray-900">Rs. {item.price || 3000 }</span>
                  <span className="ml-2 text-sm line-through text-gray-500">Rs. {item.originalPrice || 5000}</span>
                  <span className="ml-2 text-sm font-medium text-red-500">({item.discount || "40%" } OFF)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
}
