import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { get_collections } from "../api"; // Adjust import path as necessary

const Hero = () => {
  return (
    <section className="w-full px-8 py-12 grid mt-[75px] grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto max-h-full">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-brand-dark font-medium">
          MyStyleVision
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Create Trends, Craft your Style
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Transform your fashion vision into reality with our Ultimate AI Fashion Designs.Curate, Create and Showcase your unique style. 
        </p>
        <Link to="/admin">
          <Button size="lg" className="px-5 py-4 bg-pink-400 text-white font-medium">
            Create your Collection
          </Button>
        </Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const generateSquares = (data) => {
  return data.map((item) => ({
    id: item.id,
    src: item.src,
  }));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const collections = await get_collections(16, 0); // Adjust limit and offset as needed
        console.log("Collections:", collections);
        const formattedData = collections.collections.map((collection) => ({
          id: collection.id,
          src: collection.image_url, // Adjust field name based on your API response
        }));
        setSquares(generateSquares(formattedData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchImages();
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares((prevSquares) => {
      return shuffle([...prevSquares]);
    });

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full h-full"
          style={{
            backgroundImage: `url(${item.src})`,
            backgroundSize: "cover",
          }}
        ></motion.div>
      ))}
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default Hero;
