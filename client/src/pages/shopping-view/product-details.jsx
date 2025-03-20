import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  fetchCartItems,
  updateCartQuantity,
} from "../../../store/shop/cart-slice/index";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../store/shop/product-slice/index";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { qunit } from "globals";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const productId = useParams();
  console.log("productId in product details section", productId);
  const { user } = useSelector((state) => state.auth);
  const { formData } = useSelector((state) => state.esewaOrders);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const [count , setCount] = useState(1)

  console.log(productId);

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, []);

  useEffect(() => {
    dispatch(fetchProductDetails(productId.id));
  }, []);

 

    
  const cartItemDetails =
  cartItems && cartItems?.items
  ? cartItems?.items.find((item) => item?.productId == productDetails?._id)
  : null;
  
  
  // const cartItem = cartItems?.items?.find((item) => item?.productId === productDetails?._id);
  
  console.log("All cart items  ", cartItems);
  console.log("product details ok  ", productDetails);
  console.log("one cart item ok  ",cartItemDetails );

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(formData, "form data from another comp");

    let finalQuantity = count > 0 ? count : 1
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} items can be added for this product`,
            variant: "destructive",
            duration: 2000,
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity : finalQuantity
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Added to the Cart",
          duration: 2000,
        });
      }
    });
  }

  function handleCartQuantity(getCartItem, productItem,  typeofAction) {
    if(!getCartItem) return;
   if(getCartItem) {
    const updatedQuantity =
      typeofAction === "plus"
        ? getCartItem?.quantity + 1
        : getCartItem?.quantity - 1;


    // If the action is "plus", make sure there's enough stock
    if (typeofAction === "plus") {
      const getCurrentProductIndex = productList.findIndex(
        (item) => item._id === getCartItem?.productId
      );
      if (getCurrentProductIndex !== -1) {
        const getTotalStock = productList[getCurrentProductIndex].totalStock;
        if (updatedQuantity > getTotalStock) {
          toast({
            title: `Only ${getTotalStock} items can be added`,
            variant: "destructive",
            duration: 2000,
          });
          return;
        }
      }
    }
    else{
      
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: updatedQuantity,
      })
    );
  }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 min-w-fit m-1 p-1 md:p-2 md:m-2 h-full">
      <div className="relative rounded-lg m-1 p-1  h-full  md:p-8">
        <img
          src={productDetails?.image}
          alt={productDetails?.title}
          width={600}
          height={600}
          className="aspect-square object-center object-cover"
        />
      </div>
      <div className=" m-1 p-1 Productdetails relative flex flex-col md:p-8">
        <div className="">
          <h1 className="text-2xl md:text-4xl  font-[300] stroke-none  mb-4 md:mb-12">
            {productDetails?.title}
          </h1>
          <p className="text-sm font-extralight text-black/70 md:text-2xl mb-4 md:mb-5">
            {productDetails?.description}
          </p>
        </div>
        <div className="flex items-center gap-6 mb-6 md:mb-8">
          <p
            className={`text-center text-sm md:text-2xl font-normal text-muted-foreground ${
              productDetails?.salePrice > 0 ? "line-through" : ""
            }`}
          >
            ₹ {productDetails?.price}
          </p>
          {productDetails?.salePrice > 0 ? (
            <p className="text-lg md:text-2xl font-normal text-primary opacity-80 ">
              {" "}
              ₹ {productDetails?.salePrice}
            </p>
          ) : null}
        </div>
        <div className="Color mb-6 md:mb-6">
          <h2>Color : </h2>
        </div>
        <div className="Quantity  md:mb-6">
          <h2>Quantity :</h2>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button
            onClick={() => handleCartQuantity(cartItemDetails, productDetails, "minus")}
            variant="outline"
            className="h-6 w-6 rounded-sm"
            size="icon"
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4" strokeWidth={0.8} />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className=" font-extralight md:font-semibold text-sm mt-1">
            {cartItemDetails?.quantity ?? count}
          </span>
          <Button
            onClick={() => {

             if(!cartItemDetails) {
              setCount(count +1)
             }else{
              handleAddtoCart(cartItemDetails, "plus");
             }
            
}

            }
            variant="outline"
            className="h-6 w-6 rounded-sm"
            size="icon"
          >
            <Plus style={{ width: "12px", height: "12px" }} strokeWidth={0.8} />
            <span className="sr-only">Increase</span>
          </Button>
        </div>

        {/* <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide hover:no-underline focus:no-underline">
              Exchange Policy
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-extraligh text-muted-foreground text-md md:text-lg">
                This is a exchange and return policy compiling to our store
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator className="w-full bg-black/20" />
        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide hover:no-underline focus:no-underline">
              Return and Refund Policy
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-extraligh text-muted-foreground text-md md:text-lg">
                This is a exchange and return policy compiling to our store
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator className="w-full bg-black/20" /> */}
        <Accordion type="single" collapsible className="w-full mt-6 mb-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide  hover:no-underline focus:no-underline">
              Shipping Policy
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-extraligh text-muted-foreground text-md md:text-lg">
                This is a exchange and return policy compiling to our store
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator className="w-full bg-black/20" />

        <div className="md:bottom-8 w-full mx-auto mb-2 ">
          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed bg-[#E5E5E5]">
              Out of Stock
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() =>
                handleAddtoCart(productDetails?._id, productDetails?.totalStock)
              }
              className="w-full rounded-sm"
            >
              Add to Cart
            </Button>
          )}
        </div>

        <div className="md:bottom-8 w-full mx-auto ">
          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed hidden">
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleAddtoCart(productDetails?._id, productDetails?.totalStock)
              }
              className="w-full rounded-sm"
            >
              Buy now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
