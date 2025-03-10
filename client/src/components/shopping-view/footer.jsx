import React from "react";
import { Separator } from "../ui/separator";
import { Mail, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "@/config";


const ShoppingFooter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    function handleNavigate(menuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter =
          menuItem.id !== "home" && menuItem.id !== "products" && menuItem.id !== "search"
            ? {
                category: [menuItem.id],
              }
            : null;
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    
        location.pathname.includes("listing") && currentFilter !== null
          ? setSearchParams(new URLSearchParams(`?category=${menuItem.id}`))
          : setTimeout(() => {
            navigate(menuItem.path);
          }, 1000); 
      }
   
  return (
    <div className="flex flex-col w-full bg-black h-full">
      <div className="h-[35%] flex w-full justify-between">
        <h1 className="text-white/90 font-thin text-6xl mx-16 tracking-widest my-12">
          Style Me
        </h1>
        <div className="w-1/2 relative">
            <span>
                <Input type="email" placeholder="Enter your email" className="text-white absolute bottom-8 right-24 w-[75%] h-10" />
                </span>
            <span>
                <Button variant="outline" className="w-[25%] absolute bottom-8 right-10 rounded-none h-10"><p className="tracking-wider font-extralight">SUBSCRIBE</p></Button>
            </span>
            </div>
        
      </div>
      <Separator className="w-[95%] mx-auto opacity-65" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 h-full mt-6 mx-8">
        <div className="text-white flex flex-col gap-3">
          <h3 className="text-2xl font-light mb-2">Get Connected</h3>
          <div className="flex gap-2 mx-4 text-white/80 cursor-pointer">
            <span>
              <Phone />
            </span>
            <p className="font-light">9800000000</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <span>
              <Mail />
            </span>
            <p className="font-light">stylemeofficial@gmail.com</p>
          </div>
        </div>
        <div className="text-white flex flex-col gap-3">
          <h3 className="text-2xl font-light mb-2">Quick Links</h3>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">About Style Me</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Contact Us</p>
          </div>
        </div>
        <div className="text-white flex flex-col gap-3 cursor-pointer">
          <h3 className="text-2xl font-light mb-2">Shop Now</h3>
          { shoppingViewHeaderMenuItems.map((menuItem)=> (
            <div className="flex gap-2 mx-4 text-white/80 ">
            <p onClick={()=>handleNavigate(menuItem)}  key={menuItem.id}className="font-light">{menuItem.label}</p>
          </div>

          )) }

        </div>
        <div className="text-white flex flex-col gap-3 cursor-pointer">
          <h3 className="text-2xl font-light mb-2">Our Services</h3>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Privacy Policy</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Shipping Policy</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Exchange and Refunds</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Terms and Conditions</p>
          </div>
        </div>
      </div>
      <Separator className="w-[95%] mx-auto opacity-75 mt-4 mb-1"/>
      <div className="text-white w-full"><p className="mx-[525px] font-extralight text-sm">COPYRIGHT © 2025 Style Me | All Rights Reserved</p></div>
    </div>
  );
};

export default ShoppingFooter;
