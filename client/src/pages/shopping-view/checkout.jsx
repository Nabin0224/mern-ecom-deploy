import React, { useEffect, useState } from "react";
import img from "../../assets/category/accountImage/acc.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "../../../store/shop/order-slice/index";
import { useToast } from "@/hooks/use-toast";
import { createEsewaOrder } from "../../../store/shop/esewa-slice/createorder";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createCodOrder } from "../../../store/cod-slice/index";

const ShoppingCheckout = () => {
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrders);
  const [currentSelectedAddressInfo, setCurrentSelectedAddressInfo] =
    useState(null);
  const [isPayPalPaymentStart, setIsPaypalPaymentStart] = useState(false);
  const [isEsewaPaymentStart, setIsEsewaPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.esewaOrders);
  console.log(formData, " Form data from selector");
  const alwaysOpenItems = ["item-1"]
  const [openItems, setOpenItems] = useState(alwaysOpenItems);

  //logic for total amount in cart

  const totalCartAmount =
    cartItems?.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  console.log(totalCartAmount, "total amount in checkout");
  console.log(cartItems?._id, "CartItems ok");
  console.log(cartItems, "cart items in checkout");

  //function to handle paypal payment
  function handleInitiatePaypalPayment() {
    if (cartItems.length == 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddressInfo === null) {
      toast({
        title: "Please select one address to proceed!",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItem: cartItems?.items?.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem.salePrice
            : singleCartItem?.price,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        fullName: currentSelectedAddressInfo?.fullName,
        addressId: currentSelectedAddressInfo?._id,
        address: currentSelectedAddressInfo?.address,
        city: currentSelectedAddressInfo?.city,
        nearest_landmark: currentSelectedAddressInfo?.nearest_landmark,
        phone: currentSelectedAddressInfo?.phone,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
      totalAmount: totalCartAmount,
    };

    setIsPaypalPaymentStart(true);
    console.log(orderData, "order data");
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaypalPaymentStart(false);
      }
    });
  }

  // redirecting to paypal
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  //<-------------------------------------------------------------------->

  // handling esewa payment initiation

  async function handleInitiateEsewaPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddressInfo === null) {
      toast({
        title: "Please select one address to proceed!",
        variant: "destructive",
      });
      return;
    }
    setIsEsewaPaymentStart(true);

    try {
      const orderData = {
        cartItem: cartItems?.items?.map((singleCartItem) => ({
          productId: singleCartItem?.productId,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem.salePrice
              : singleCartItem?.price,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          quantity: singleCartItem?.quantity,
        })),
        userId: user.id,
        cartId: cartItems?._id,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        addressInfo: {
          fullName: currentSelectedAddressInfo?.fullName,
          addressId: currentSelectedAddressInfo?._id,
          address: currentSelectedAddressInfo?.address,
          city: currentSelectedAddressInfo?.city,
          nearest_landmark: currentSelectedAddressInfo?.nearest_landmark,
          phone: currentSelectedAddressInfo?.phone,
        },
        orderStatus: "pending",
        paymentMethod: "eSewa",
        paymentStatus: "pending",
        totalAmount: totalCartAmount.toString(),
      };
      const { payload } = await dispatch(createEsewaOrder(orderData));
      setIsEsewaPaymentStart(false);

      console.log(payload, " Data from createEsewaOrder");

      if (payload) {
        sendEsewaPayment(payload); // Only call if payload exists
      }
    } catch (error) {
      console.error("eSewa dispatch error", error);
    }
  }

  const sendEsewaPayment = (formData) => {
    const {
      amount,
      failure_url,
      product_code,
      product_delivery_charge,
      product_service_charge,
      signature,
      signed_field_names,
      success_url,
      tax_amount,
      total_amount,
      transaction_uuid,
    } = formData;

    // eSewa’s API requires payment details to be submitted via an HTML form using a POST request instead of sending JSON via axios.post().
    // That’s why we create a form dynamically in JavaScript.
    // Create the form and submit it

    const form = document.createElement("form");
    form.method = "POST";
    form.type = "text";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    // Append input fields to the form
    const fields = {
      amount,
      failure_url,
      product_code,
      product_delivery_charge,
      product_service_charge,
      signature,
      signed_field_names,
      success_url,
      tax_amount,
      total_amount,
      transaction_uuid,
    };

    // Create hidden inputs for each field and append them to the form
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Append the form to the document body and submit it
    document.body.appendChild(form);
    console.log("submitting form to esewa");
    form.submit();
  };

  // cod initialization 
 function handleCodPayment() {
  if (cartItems.length == 0) {
    toast({
      title: "Your cart is empty. Please add items to proceed",
      variant: "destructive",
    });
    return;
  }
  if (currentSelectedAddressInfo === null) {
    toast({
      title: "Please select one address to proceed!",
      variant: "destructive",
    });
    return
  }

  const orderData = {
    cartItem: cartItems?.items?.map((singleCartItem) => ({
      productId: singleCartItem?.productId,
      price:
        singleCartItem?.salePrice > 0
          ? singleCartItem.salePrice
          : singleCartItem?.price,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      quantity: singleCartItem?.quantity,
    })),
    userId: user.id,
    cartId: cartItems?._id,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
    addressInfo: {
      fullName: currentSelectedAddressInfo?.fullName,
      addressId: currentSelectedAddressInfo?._id,
      address: currentSelectedAddressInfo?.address,
      city: currentSelectedAddressInfo?.city,
      nearest_landmark: currentSelectedAddressInfo?.nearest_landmark,
      phone: currentSelectedAddressInfo?.phone,
    },
    orderStatus: "pending",
    paymentMethod: "Cod",
    paymentStatus: "pending",
    totalAmount: totalCartAmount.toString(),
  };

  dispatch(createCodOrder(orderData)).then((data) => {
    if(data?.payload?.success) {
      console.log("data in dispatch of cod", data.payload);
    }
  })


 }


  return (
    <div className="flex flex-col">
      <div className="relative h-[150px] md:h-[200px] w-full overflow-hidden bg-black flex flex-col">
        <h1 className="text-white md:h-[25%] md:w-1/2 mx-auto text-center text-3xl md:text-4xl mt-4">
          Checkout Page
        </h1>
        <Separator className=" w-[50%] md:w-[35%] mx-auto opacity-55" />
        <p className="text-xs text-white/70 tracking-widest md:w-1/2 mx-auto text-center mt-2">
          Please review your item details carefully
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-[4fr_5fr] gap-5 mt-5 p-5 h-full">
      <div className=" sticky top-0 h-fit">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-[#F0F0F0] text-2xl md:text-3xl tracking-wide font-thin m-2 px-4">
              Cart Items
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 bg-[#F0F0F0] m-2 px-4">
                {cartItems && cartItems.items
                  ? cartItems?.items?.map((item) => (
                      <UserCartItemsContent key={item.id} cartItem={item} />
                    ))
                  : null}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-semibold">Rs{totalCartAmount}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div className="flex-col">
        <Accordion type="multiple" value={["item-1"]} >
  <AccordionItem value="item-1">
    <AccordionTrigger className="bg-[#F0F0F0] text-2xl md:text-3xl tracking-widest font-thin m-2 px-2">Billing Details</AccordionTrigger>
    <AccordionContent className="px-2">
    <Address
          setCurrentSelectedAddressInfo={setCurrentSelectedAddressInfo}
          selectedId={currentSelectedAddressInfo}
        />
    </AccordionContent>
  </AccordionItem>
</Accordion>



        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-[#F0F0F0] text-2xl md:text-3xl tracking-wide font-thin m-2 px-4">
              Payment Methods
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 w-full flex flex-col gap-1">
                <Button
                  onClick={handleInitiatePaypalPayment}
                  className={` w-full bg-[#F0F0F0]/50 text-black {${isPayPalPaymentStart} ? "opacity-50" : "opacity-100"}`}
                  disabled={isPayPalPaymentStart}
                >
                  {isPayPalPaymentStart
                    ? "Payment Processing..."
                    : " Checkout with Paypal"}
                </Button>
                <Button
                  onClick={handleInitiateEsewaPayment}
                  className={` w-full  bg-[#F0F0F0]/50 text-black {${isEsewaPaymentStart} ? "opacity-50" : "opacity-100"}`}
                  disabled={isEsewaPaymentStart}
                >
                  {isEsewaPaymentStart
                    ? "Payment Processing..."
                    : "Checkout with eSewa"}
                </Button>
                <Button
                onClick={handleCodPayment}
                className=" w-full  bg-[#F0F0F0]/50 text-black"
                >
                  Cash on Delivery
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
