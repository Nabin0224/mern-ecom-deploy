import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "../../../store/admin/order-slice/index";
import AdminOrderDetailsView from "./order-details";
import { useReactToPrint } from "react-to-print";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const AdminOrdersView = () => {
  const { orderList, orderDetails, resetOrderDetails } = useSelector(
    (state) => state.adminOrders
  );

  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([])  // For bulk print
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (orderDetails !== null) setOpenDetailsDialog(true);
  // }, [orderDetails]);

  useEffect(
    (getId) => {
      dispatch(getAllOrdersForAdmin());
      dispatch(getOrderDetailsForAdmin(getId));
    },
    [dispatch]
  );

  useEffect(() => {
  dispatch(getAllOrdersForAdmin())
  }, [])
  

  const handleFetchOrderDetails = async(getId) => {
    sessionStorage.setItem("orderDetailsId", getId);
    await dispatch(getOrderDetailsForAdmin(getId));
  };

  const contentRef = useRef(null);
  console.log("ref,", contentRef);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  // Bulk Print using reactToPrint
const handleBulkPrint = useReactToPrint({
  contentRef
})

  //Single Print using reactToPrint
  // const PrintableContent = () => {
  //   const orderId = sessionStorage.getItem("orderDetailsId");
  //   console.log(orderId, "orderID");
  //   sessionStorage.clear("orderDetailsId");

  //   return (
  //     <div ref={contentRef}>
  //       <div className="grid gap-6">
  //         <div className="grid gap-2">
  //           <div className="flex mt-6 items-center justify-between">
  //             <p className="font-medium">Order ID</p>
  //             <Label>{orderDetails?._id}</Label>
  //           </div>
  //           <div className="flex mt-2 items-center justify-between">
  //             <p className="font-medium">Order Date</p>
  //             <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
  //           </div>
  //           <div className="flex mt-2 items-center justify-between">
  //             <p className="font-medium">Order Price</p>
  //             <Label>${orderDetails?.totalAmount}</Label>
  //           </div>
  //           <div className="flex mt-2 items-center justify-between">
  //             <p className="font-medium">Payment method</p>
  //             <Label>{orderDetails?.paymentMethod}</Label>
  //           </div>
  //           <div className="flex mt-2 items-center justify-between">
  //             <p className="font-medium">Payment Status</p>
  //             <Label>{orderDetails?.paymentStatus}</Label>
  //           </div>
  //           <div className="flex mt-2 items-center justify-between">
  //             <p className="font-medium">Order Status</p>
  //             <Label>
  //               <Badge
  //                 className={`py-1 px-3 ${
  //                   orderDetails?.orderStatus === "confirmed"
  //                     ? "bg-green-500"
  //                     : orderDetails?.orderStatus === "rejected"
  //                     ? "bg-red-600"
  //                     : "bg-black"
  //                 }`}
  //               >
  //                 {orderDetails?.orderStatus}
  //               </Badge>
  //             </Label>
  //           </div>
  //         </div>
  //         <Separator />
  //         <div className="grid gap-4">
  //           <div className="grid gap-2">
  //             <div className="font-medium">Order Details</div>
  //             <ul className="grid gap-3">
  //               {orderDetails?.cartItem && orderDetails?.cartItem.length > 0
  //                 ? orderDetails?.cartItem.map((item) => (
  //                     <li className="flex items-center justify-between">
  //                       <span>Title: {item.title}</span>
  //                       <span>Quantity: {item.quantity}</span>
  //                       <span>Price: ${item.price}</span>
  //                     </li>
  //                   ))
  //                 : null}
  //             </ul>
  //           </div>
  //         </div>
  //         <div className="grid gap-4">
  //           <div className="grid gap-2">
  //             <div className="font-medium">Shipping Info</div>
  //             <div className="grid gap-0.5 text-muted-foreground">
  //               <span>{orderDetails?.addressInfo?.fullName}</span>
  //               <span>{orderDetails?.addressInfo?.address}</span>
  //               <span>{orderDetails?.addressInfo?.city}</span>
  //               <span>{orderDetails?.addressInfo?.pincode}</span>
  //               <span>{orderDetails?.addressInfo?.phone}</span>
  //               <span>{orderDetails?.addressInfo?.notes}</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <Button
  //         onClick={() => {
  //           handleFetchOrderDetails(orderId), handlePrint();
  //         }}
  //       >
  //         Print
  //       </Button>
  //     </div>
  //   );
  // };
  const BulkPrintableContent = ({selectedOrders, orderList }, ref) => {
    
    const selectedOrderDetails = orderList.filter((order) => 
      selectedOrders.includes(order._id)
    );
  
    return (
      <div ref={contentRef}>
        {selectedOrderDetails.length > 0 ? (
          selectedOrderDetails.map((order) => (
            <div key={order._id} className="grid gap-6 mb-6 border-b pb-6">
              <div className="grid gap-2">
                <div className="flex mt-6 items-center justify-between">
                  <p className="font-medium">Order ID</p>
                  <Label>{order._id}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium">Order Date</p>
                  <Label>{order.orderDate.split("T")[0]}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium">Order Price</p>
                  <Label>${order.totalAmount}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium">Payment method</p>
                  <Label>{order.paymentMethod}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium">Payment Status</p>
                  <Label>{order.paymentStatus}</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium">Order Status</p>
                  <Label>
                    <Badge
                      className={`py-1 px-3 ${
                        order.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : order.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </Label>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-medium">Order Details</div>
                  <ul className="grid gap-3">
                    {order.cartItem && order.cartItem.length > 0
                      ? order.cartItem.map((item) => (
                          <li
                            key={item.title}
                            className="flex items-center justify-between"
                          >
                            <span>Title: {item.title}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: ${item.price}</span>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-medium">Shipping Info</div>
                  <div className="grid gap-0.5 text-muted-foreground">
                    <span>{order.addressInfo?.fullName}</span>
                    <span>{order.addressInfo?.address}</span>
                    <span>{order.addressInfo?.city}</span>
                    <span>{order.addressInfo?.pincode}</span>
                    <span>{order.addressInfo?.phone}</span>
                    <span>{order.addressInfo?.notes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders selected for printing.</p>
        )}
      </div>
    );
  };

  const handleCheckboxChange = (getId) => {
    setSelectedOrders((prev) => 
    prev.includes(getId) ? prev.filter((id) => id !== getId) : [...prev, getId]
  );
  };
  console.log(selectedOrders, "selectedOrdersId")

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <input 
                        type="checkbox"
                        checked={selectedOrders.includes(item._id)}
                        onChange={()=> handleCheckboxChange(item._id)}
                        />
                      </TableCell>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            item?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : item?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {item?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.totalAmount}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          onClick={() => {
                            setOpenDetailsDialog(true)
                            handleFetchOrderDetails(item?._id)}

                          }
                        
                        >
                          View Details
                        </Button>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            // dispatch(resetOrderDetails());
                          }}
                        >
                          <div>
                            <AdminOrderDetailsView
                              orderDetails={orderDetails}
                            />
                          </div>
                        </Dialog>
                        <Button
                          onClick={() => {
                            setOpenDetailsDialog(false);
                            handleFetchOrderDetails(item?._id);

                            setTimeout(() => handlePrint(), 0); // Ensure order details are loaded before printing
                          }}
                        >
                          Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          <Button 
          onClick={handleBulkPrint}
          >
            Print All
          </Button>
        </CardContent>
      </Card>
      {/* <div className="hidden">
        <PrintableContent contentRef={contentRef} />
      </div> */}
      <div className="hidden">
        <BulkPrintableContent contentRef={contentRef} selectedOrders={selectedOrders} orderList={orderList}/>
      </div>
    
    </div>
  );
};

export default AdminOrdersView;
