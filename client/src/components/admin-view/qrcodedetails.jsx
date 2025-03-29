import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "../../../store/admin/order-slice/index";
import { Separator } from "../ui/separator";

const QrCodeDetails = () => {
  const dispatch = useDispatch();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    const storedOrders = JSON.parse(
      sessionStorage.getItem("selectedOrdersForQrCode")
    );
    if (storedOrders) {
      setSelectedOrders(storedOrders);
      sessionStorage.removeItem("selectedOrdersForQrCode");
    }
  }, []);

  const selectedOrderDetails = orderList
    ? orderList.filter((order) => selectedOrders.includes(order._id))
    : [];

  console.log("selectedOrderDetails", selectedOrderDetails);

  return (
    <div className="">
      {selectedOrderDetails.length > 0 ? (
        selectedOrderDetails.map((order) => (
          <div key={order._id} className="grid gap-4 ">
            <div className="grid gap-2">
              <ul className="grid gap-3">
                {order.cartItem && order.cartItem.length > 0
                  ? order.cartItem.map((item) => (
                      <li
                      key={item.title}
                      className="flex flex-col gap-2"
                      >
                        <span className="mb-16">
                          <img src={item.image[0]} alt="" />
                        </span>
                      <div className="font-medium text-xl mb-2">Order Details</div>
                        <span>{item.title}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Color: {item.color}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <Separator className="bg-black/30 mb-8"/>
            <div className="grid">
                  <div className="font-medium text-xl mb-4">Shipping Info</div>
                  <div className="grid gap-0.5 text-muted-foreground items-center">
                    <span>{order.addressInfo?.fullName}</span>
                    <span>{order.addressInfo?.address}</span>
                    <span>{order.addressInfo?.city}</span>
                    <span>{order.addressInfo?.phone}</span>
                  </div>
                </div>
          </div>
        ))
      ) : (
        <p>No orders selected.</p>
      )}
    </div>
  );
};

export default QrCodeDetails;
