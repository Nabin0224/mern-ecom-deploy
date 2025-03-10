import React from "react";
import { Separator } from "../ui/separator";
import { Mail, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const ShoppingFooter = () => {
  return (
    <div className="flex flex-col w-full bg-black h-96 ">
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
          <div className="flex gap-2 mx-4 text-white/80">
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
        <div className="text-white flex flex-col gap-3">
          <h3 className="text-2xl font-light mb-2">Shop Now</h3>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Bags</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Dresses</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Accessories</p>
          </div>
          <div className="flex gap-2 mx-4 text-white/80">
            <p className="font-light">Footwear</p>
          </div>
        </div>
        <div className="text-white flex flex-col gap-3">
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
    </div>
  );
};

export default ShoppingFooter;
