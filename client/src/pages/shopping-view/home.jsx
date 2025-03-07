import React from "react";
// import bannerOne from "../../assets/banner1.jpg";
// import bannerFour from "../../assets/banner4.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { categoriesWithImage } from "../../config/index";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProducttile from "./product-tile";
import { fetchAllFilteredProducts } from "../../../store/shop/product-slice/index";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "../../../store/common/index";

export const ShoppingHome = () => {
  const { featureImagesList } = useSelector(state => state.featureImage)
  // const slides = [bannerOne, bannerFour];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section){
  sessionStorage.removeItem('filter');
  const currentFilter = {
    [section] : [getCurrentItem.id]
  }
sessionStorage.setItem('filters', JSON.stringify(currentFilter))
navigate(`/shop/listing`)

  
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featureImagesList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [featureImagesList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: {} }));
  }, []);

  console.log(productList);
   useEffect(() => {
        dispatch(getFeatureImages()) 
      }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[700px] overflow-hidden">
        {featureImagesList  && featureImagesList.length > 0 ? featureImagesList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`absolute w-full object-cover h-full top-0 left-0 transition-opacity duration-1000 
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        )) : null }
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform  -translate-y-1/2 bg-white/60"
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + featureImagesList.length) % featureImagesList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform  -translate-y-1/2 bg-white/60"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % featureImagesList.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className=" py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 sm:h-[750px] md:h-[400px]">
            {categoriesWithImage.map((item) => (
              <Card onClick={()=> handleNavigateToListingPage(item , "category")} className="cursor-pointer hover:shadow-xl transition-shadow">
                <img
                  key={item.id}
                  src={item.image}

                  className= "object-cover w-full h-[300px] rounded-t-lg"
                />
                <CardContent className="flex flex-col justify-center p-6">
                  <span className="text-2xl font-semibold text-center">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Hottest 🔥
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-6">
            {productList && productList.length > 0
              ? productList.map((item) => (
                  <ShoppingProducttile product={item} />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
