import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import React from "react";
import {
  addToCart,
  fetchCartItems,
} from "../../../store/shop/cart-slice/index";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";




const ProductDetailsDialogue = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {formData}  = useSelector(state => state.esewaOrders)
  const { cartItems } = useSelector(state=> state.shoppingCart)

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(formData, "form data from another comp")
    let getCartItems = cartItems.items || [];

    if(getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item)=> item.productId === getCurrentProductId);

      if(indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} items can be added for this product`,
            variant: 'destructive',
            duration: 2000,
          })
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
        dispatch(fetchCartItems(user?.id))
        toast({
          title : "Product Added to the Cart",
          duration: 2000,
        })
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className=" gap-3">
          <div>
            <h1 className="text-3xl font-extrabold mb-4">
              {productDetails?.title}
            </h1>
            <p className="text-2xl text-muted-foreground mb-5">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {" "}
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div>
            {
              productDetails?.totalStock === 0 ? 
            
              <Button
              
              className="w-full opacity-60 cursor-not-allowed"
            >
              Out of Stock
            </Button> :

            <Button
              onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}
              className="w-full"
            >
              Add to Cart
            </Button>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialogue;
