import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../store/admin/order-slice/custom-order/index";
import { Dialog } from "@radix-ui/react-dialog";
import CustomProduct from "../../components/admin-view/custom-product";
import { fetchAllFilteredProducts } from "../../../store/shop/product-slice/index";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { toast } from "@/hooks/use-toast";

const CreateCustomOrder = () => {
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  
  
  

  function handleFetchProducts() {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: {} }));
  }
  const {
    register,
    handleSubmit,
    setError,
    

    formState: { errors },
    
  } = useForm();

  const onSubmit = (data) => {
    console.log("data on submit", data)
    const formattedData = {
      userId: "userId",

      addressInfo: {
        fullName: data.fullName,
        addressId: "",
        address: data.address,
        city: data.city,
        nearest_landmark: data.nearest_landmark,
        phone: data.phone,
      },
      cartItem: items,
      orderStatus: "cod",
      paymentMethod: "cod",
      paymentStatus: data.paymentStatus,
      totalAmount: data.delivery_charge,
      orderDate: new Date(),
    };
    console.log("fomatted form data ", formattedData)

    setItems([]);
    dispatch(createOrder(formattedData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/admin/orders")
        toast({
          title: "Order successfully created",
          duration: 2000,
        })
      }
    });
  };
  return (
    <div className="flex flex-col h-[100vh] w-full border-b-4 gap-4">
      <div className="addproduct bg-white/80 mb-4 border-b-2 relative">
        <h1 className="font-semibold text-2xl mt-2 p-2">Products</h1>
        <div className="mt-4 p-4">
          <Dialog
            open={openProductDialog}
            onOpenChange={() => {
              setOpenProductDialog(false);
            }}
          >
            <CustomProduct
              productList={productList}
              setItems={setItems}
              items={items}
              setOpenProductDialog={setOpenProductDialog}
            />
          </Dialog>
          <Button
            className="bg-purple-600 m-2 p-2"
            onClick={() => {
              setOpenProductDialog(true);
              handleFetchProducts();
            }}
          >
            Select Products
          </Button>
        </div>
        <div className="flex flex-col m-4 md:m-6 gap-2 md:gap-4">
          {items && items.length > 0
            ? items.map((item) => (
                <div className="flex gap-8 md:gap-32">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    height={70}
                    width={70}
                    className="object-cover outline-double "
                  ></img>
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">
                      {" "}
                      Color: {item?.color}
                    </span>
                    <span className="text-muted-foreground flex gap-2 ">
                      {" "}
                      Quantity:{" "}
                      <Button
                        className="rounded-sm"
                        size={10}
                        variant="outline"
                        onClick={()=> setItems((prevItems)=> prevItems.map((i)=> i.id === item.id ? {...i, quantity: i.quantity -1 } : i))}
                        disabled={item.quantity == 1}
                      >
                        <Minus size={20} />
                      </Button>
                      {item.quantity}
                      <Button
                        className="rounded-sm"
                        size={10}
                        variant="outline"
                        onClick={() => setItems((prevItems)=> prevItems.map((i)=> i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)) }
                      >
                        <Plus size={20} />
                      </Button>
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="form mb-4 border-b-2 relative bg-white/80 p-6 ">
          <h1 className="font-semibold text-2xl mt-2 mb-4 p-2">
            Customer Details
          </h1>
          <div className="row flex gap-4">
            <div className="w-1/3">
              <Label>Full Name</Label>
              <Input
                placeholder="Full Name"
                type="text"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
            <div className="w-1/3">
              <Label>Email</Label>
              <Input
                placeholder="Full Name"
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
            <div className="w-1/3">
              <Label>Phone</Label>
              <Input
                placeholder="Phone"
                type="text"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
          </div>
          <div className="row flex gap-4">
            <div className="w-1/3">
              <Label>City</Label>
              <Input
                placeholder="City"
                type="text"
                {...register("city", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
            <div className="w-1/3">
              <Label>Address</Label>
              <Input
                placeholder="Full Name"
                type="text"
                {...register("address", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
            <div className="w-1/3">
              <Label>Nearest Landmark</Label>
              <Input
                placeholder="nearest_landmark"
                type="text"
                {...register("nearest_landmark", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
            </div>
          </div>
        </div>
        <div className="delivery charge  bg-white/80 mb-4 border-b-2 p-4 relative">
          <h1 className="font-semibold text-2xl mb-6 p-2">Delivery Charge</h1>
          <div className=" mb-6">
            <Label>Delivery Charge</Label>
            <Input
              placeholder="Total amount"
              type="text"
              {...register("delivery_charge", {
                required: {
                  value: true,
                },
              })}
            />
          </div>
        </div>
        <div className="delivery charge  bg-white/80 mb-4 border-b-2 relative p-6 ">
          <h1 className="font-semibold text-2xl p-2 mb-6">Payment</h1>
          <div className=" mb-6">
            <Label>Payment Status</Label>
            <Input
              placeholder="Payment Status "
              type="text"
              {...register("paymentStatus", {
                required: {
                  value: true,
                },
              })}
            />
          </div>
        </div>
        <span className="mt-4 p-4">
          <Button type="submit" className="bg-purple-600 m-2 p-2">
            Create Order
          </Button>
        </span>
      </form>
    </div>
  );
};

export default CreateCustomOrder;
