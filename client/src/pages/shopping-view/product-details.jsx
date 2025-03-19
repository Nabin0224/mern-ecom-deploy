import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import React, { useEffect } from "react";
import {
  addToCart,
  fetchCartItems,
} from "../../../store/shop/cart-slice/index";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../store/shop/product-slice/index";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";

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

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(formData, "form data from another comp");
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
        quantity: 1,
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

  useEffect(() => {
    dispatch(fetchProductDetails(productId.id));
  }, []);

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogContent className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
    //     <div className="relative overflow-hidden rounded-lg">
    //       <img
    //         src={productDetails?.image}
    //         alt={productDetails?.title}
    //         width={600}
    //         height={600}
    //         className="aspect-square w-full object-cover"
    //       />
    //     </div>
    //     <div className=" gap-3">
    //       <div>
    //         <h1 className="text-3xl font-extrabold mb-4">
    //           {productDetails?.title}
    //         </h1>
    //         <p className="text-2xl text-muted-foreground mb-5">
    //           {productDetails?.description}
    //         </p>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p
    //           className={`text-3xl font-bold text-primary ${
    //             productDetails?.salePrice > 0 ? "line-through" : ""
    //           }`}
    //         >
    //           ₹{productDetails?.price}
    //         </p>
    //         {productDetails?.salePrice > 0 ? (
    //           <p className="text-2xl font-bold text-muted-foreground">
    //             {" "}
    //             ₹{productDetails?.salePrice}
    //           </p>
    //         ) : null}
    //       </div>
    //       <div>
    //         {
    //           productDetails?.totalStock === 0 ?

    //           <Button

    //           className="w-full opacity-60 cursor-not-allowed"
    //         >
    //           Out of Stock
    //         </Button> :

    //         <Button
    //           onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}
    //           className="w-full"
    //         >
    //           Add to Cart
    //         </Button>
    //         }
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>

    <div className="grid grid-cols-2 gap-2 w-full p-2 m-2 h-full">
      <div className="relative overflow-hidden rounded-lg p-4 h-full  md:p-8">
        <img
          src={productDetails?.image}
          alt={productDetails?.title}
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
        />
       
      </div>
      <div className="Productdetails relative flex flex-col justify-start p-4 md:p-8">
        <div className="h-[40%]">
          <h1 className="text-3xl md:text-4xl tracking-wider font-[400] stroke-none md:font-semi-bold mb-8 md:mb-12">
            {productDetails?.title}
          </h1>
          <p className="text-lg font-extralight text-black/80 md:text-2xl  mb-5">
            {productDetails?.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`text-lg md:text-2xl font-normal text-primary ${
              productDetails?.salePrice > 0 ? "line-through" : ""
            }`}
          >
            ₹{productDetails?.price}
          </p>
          {productDetails?.salePrice > 0 ? (
            <p className="text-lg md:text-2xl font-normal text-muted-foreground">
              {" "}
              ₹{productDetails?.salePrice}
            </p>
          ) : null}
        </div>

        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide">
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
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide">
              Return and Refund Policy
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
            <AccordionTrigger className="font-thin text-md md:text-2xl text-black/60 tracking-wide">
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

        <div className="absolute bottom-4 md:bottom-8 w-4/5 mx-auto ">
          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleAddtoCart(productDetails?._id, productDetails?.totalStock)
              }
              className="w-full rounded-sm"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
