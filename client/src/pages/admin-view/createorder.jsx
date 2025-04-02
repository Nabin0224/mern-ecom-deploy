import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getAllCustomOrders,
  updateCustomOrder,
} from "../../../store/admin/order-slice/custom-order/index";

import CustomProduct from "../../components/admin-view/custom-product";
import { fetchAllFilteredProducts } from "../../../store/shop/product-slice/index";
import {
  Cross,
  CrossIcon,
  Minus,
  Plus,
  Trash,
  TrashIcon,
  UserPen,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const districts = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kavrepalanchok",
  "Sindhupalchok",
  "Dhading",
  "Nuwakot",
  "Rasuwa",
  "Dolakha",
  "Ramechhap",
  "Sindhuli",
  "Makwanpur",
  "Chitwan",
  "Bara",
  "Parsa",
  "Rautahat",
  "Sarlahi",
  "Dhanusha",
  "Mahottari",
  "Saptari",
  "Siraha",
  "Udayapur",
  "Okhaldhunga",
  "Khotang",
  "Solukhumbu",
  "Bhojpur",
  "Sankhuwasabha",
  "Taplejung",
  "Terhathum",
  "Panchthar",
  "Ilam",
  "Jhapa",
  "Morang",
  "Sunsari",
  "Dhankuta",
  "Bajura",
  "Bajhang",
  "Doti",
  "Achham",
  "Kailali",
  "Kanchanpur",
  "Dadeldhura",
  "Baitadi",
  "Darchula",
  "Gorkha",
  "Lamjung",
  "Manang",
  "Mustang",
  "Myagdi",
  "Baglung",
  "Parbat",
  "Kaski",
  "Syangja",
  "Tanahun",
  "Nawalpur",
  "Rupandehi",
  "Kapilvastu",
  "Palpa",
  "Arghakhanchi",
  "Gulmi",
  "Rukum East",
  "Rukum West",
  "Rolpa",
  "Salyan",
  "Pyuthan",
  "Dang",
  "Banke",
  "Bardiya",
  "Jajarkot",
  "Dailekh",
  "Surkhet",
  "Dolpa",
  "Jumla",
  "Kalikot",
  "Mugu",
  "Humla",
];

const districtOptions = districts.map((district) => ({
  value: district,
  label: district,
}));

const CreateCustomOrder = () => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { customOrderList } = useSelector((state) => state.adminCustomOrders);

  console.log("custom order list in create order", customOrderList);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllCustomOrders());
  }, [id]);
  useEffect(() => {
    if (id) {
      const existingOrder = customOrderList.find((order) => order?._id === id);
      if (existingOrder) {
        setValue("fullName", existingOrder.addressInfo.fullName);
        setValue("phone", existingOrder.addressInfo.phone);
        setValue("city", existingOrder.addressInfo.city);
        setValue("address", existingOrder.addressInfo.address);
        setValue("nearest_landmark", existingOrder.addressInfo.nearest_landmark);
        setValue("delivery_charge", existingOrder.delivery_charge);
        setValue("discount_amount", existingOrder.discount_amount || 0);
        setValue("paymentStatus", existingOrder.paymentStatus);
        setItems(existingOrder.cartItem || []);
      }
      console.log("existing order", existingOrder)
    }
  }, [id, customOrderList]);
  
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function handleFetchProducts() {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: {} }));
  }
  const handleRemoveItem = (productId, color) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => item.productId !== productId || item.color !== color
      )
    );
  };
  // Function to calculate delivery charge
  const calculateDeliveryCharge = (selectedDistrict) => {
    const kathmanduValley = ["Kathmandu", "Lalitpur", "Bhaktapur"];
    return kathmanduValley.includes(selectedDistrict) ? 100 : 150;
  };

  // Handle district selection
  const handleDistrictChange = (selectedOption) => {
    setValue("city", selectedOption.value);
    const charge = calculateDeliveryCharge(selectedOption.value);
    setDeliveryCharge(charge);
    setValue("delivery_charge", charge); // Update form field
  };
  console.log("items", items);

  const onSubmit = async (data) => {
    console.log("data on submit", data);

    const CodAmount = items.reduce(
      (sum, item) => sum + item?.price * item?.quantity,
      0
    );
    const orderDate = new Date();
    const nepalTime = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(orderDate);

    console.log(nepalTime); // Output: "2025-04-02"

    const formattedData = {
      userId: "userId",
      addressInfo: {
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        nearest_landmark: data.nearest_landmark,
        phone: data.phone,
      },
      cartItem: items,
      orderStatus: "",
      paymentMethod: data.paymenStatus,
      paymentStatus: data.paymentStatus,
      totalAmount:
        data.delivery_charge + CodAmount - (data.discount_amount || 0),
      orderDate: nepalTime,
    };
    console.log("phone", data.phone);

    try {

    if(id) {
      dispatch(updateCustomOrder({id, formattedData})).then((data)=> {
        if(data?.payload?.success) {
          navigate("/admin/orders")
          toast({
            title: "Order successfully updated",
            duration: 2000,
          })
        }
      })
      
    }else{
      // Step 1: Check if order exists
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/check/check-order`,
        { phone: data.phone }
      );

      if (response.data.exists) {
        // Ask the user if they want to continue
        const confirmOrder = window.confirm(
          "An order with this phone number already exists! Do you want to proceed?"
        );

        if (!confirmOrder) {
          return;
        }
      }

      // Step 3: Create the order
      dispatch(createOrder(formattedData)).then((result) => {
        if (result?.payload?.success) {
          navigate("/admin/orders");
          toast({
            title: "Order successfully created",
            duration: 2000,
          });
        }
      });
    }
    } catch (error) {
      console.error("Error checking order:", error);
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-full border-b-4 gap-4 p-6">
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
                        onClick={() =>
                          setItems((prevItems) =>
                            prevItems.map((i) =>
                              i.productId === item.productId &&
                              i.color === item.color
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                            )
                          )
                        }
                        disabled={item.quantity == 1}
                      >
                        <Minus size={20} />
                      </Button>
                      {item.quantity}
                      <Button
                        className="rounded-sm"
                        size={10}
                        variant="outline"
                        onClick={() =>
                          setItems((prevItems) =>
                            prevItems.map((i) =>
                              i.productId === item.productId &&
                              i.color === item.color
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                            )
                          )
                        }
                      >
                        <Plus size={20} />
                      </Button>
                      <span className="ml-4">
                        {" "}
                        <Trash
                          size={20}
                          color="red"
                          opacity="30"
                          onClick={() =>
                            handleRemoveItem(item?.productId, item?.color)
                          }
                        />
                      </span>
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="bg-white/80 mb-4 border-b-2 p-6">
          <h1 className="font-semibold text-2xl mb-4">Customer Details</h1>

          <div className="row flex gap-4">
            <div className="w-1/3">
              <Label>Full Name</Label>
              <Input
                placeholder="Full Name"
                type="text"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="w-1/3">
              <Label>Email</Label>
              <Input
                placeholder="Email"
                type="email"
                {...register("email", { required: false })}
              />
            </div>
            <div className="w-1/3">
              <Label>Phone</Label>
              <Input
                placeholder="Phone"
                type="number"
                {...register("phone", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
              />
              {errors.phone && (
                <span className="text-red-500">This field is required!!</span>
              )}
            </div>
          </div>

          <div className="row flex gap-4 mt-4">
            <div className="w-1/3">
              <Label>District</Label>
              <Select
                options={districtOptions}
                onChange={handleDistrictChange}
                placeholder="Select a district"
              />
              <input type="hidden" {...register("city", { required: true })} />
            </div>
            <div className="w-1/3">
              <Label>Address</Label>
              <Input
                placeholder="Address"
                type="text"
                {...register("address", { required: true })}
              />
            </div>
            <div className="w-1/3">
              <Label>Nearest Landmark</Label>
              <Input
                placeholder="Nearest Landmark"
                type="text"
                {...register("nearest_landmark", { required: false })}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="bg-white/80 mb-4 border-b-2 p-6 w-1/2">
            <h1 className="font-semibold text-2xl mb-6">Delivery Charge</h1>
            <Label>Delivery Charge</Label>
            <Input
              type="number"
              value={deliveryCharge}
              {...register("delivery_charge")}
            />
          </div>
          <div className="bg-white/80 mb-4 border-b-2 p-6 w-1/2">
            <h1 className="font-semibold text-2xl mb-6">Discount</h1>
            <Label>Discount</Label>
            <Input
              type="text"
              placeholder="discount amount"
              {...register("discount_amount", { required: false })}
            />
          </div>
        </div>
        <select
          {...register("paymentStatus", { required: true })}
          className="border p-2"
        >
          <option value="cod">COD</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
        </select>

        <Button type="submit" className={`bg-purple-600 mt-4 p-2`}>
          {
            id ? "Edit Order" : "CreateOrder"
          }
          
         
        </Button>
      </form>
    </div>
  );
};

export default CreateCustomOrder;
