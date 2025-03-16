import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  deleteCartItems,
  updateCartQuantity,
} from "../../../store/shop/cart-slice/index";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.shoppingCart);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  console.log(cartItem, "main cart item")

  function handleDeleteCartItem(getCartItem) {
    
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item deleted successfully",
        });
      }
    });
  }

  function handleCartQuantity(getCartItem, typeofAction) {
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
          });
          return;
        }
      }
    }
  
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: updatedQuantity,
      })
    );
  }

  return (
    <div className="flex gap-1 items-center md:space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className=" w-24 h-16  rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Button
            onClick={() => handleCartQuantity(cartItem, "minus")}
            variant="outline"
            className="h-8 w-8 rounded-md"
            size="icon"
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold text-sm mt-1">
            {cartItem?.quantity}
          </span>
          <Button
            onClick={() => handleCartQuantity(cartItem, "plus")}
            variant="outline"
            className="h-8 w-8 rounded-md"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p>
          Rs
          {(
            (cartItem?.salePrice > 0
              ? cartItem?.salePrice
              : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleDeleteCartItem(cartItem)}
          className="mt-1 cursor-pointer w-6 h-6"
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;