import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import { QRCode } from "react-qr-code"; // Correct import




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
import { Navigate, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


const AdminOrdersView = () => {
  const { orderList, orderDetails, resetOrderDetails } = useSelector(
    (state) => state.adminOrders
  );

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]); // For bulk print
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    (getId) => {
      dispatch(getAllOrdersForAdmin());
      dispatch(getOrderDetailsForAdmin(getId));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, []);

  const handleFetchOrderDetails = async (getId) => {
    sessionStorage.setItem("orderDetailsId", getId);
    await dispatch(getOrderDetailsForAdmin(getId));
  };

  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  // Bulk Print using reactToPrint
  const handleBulkPrint = useReactToPrint({
    contentRef,
  });

  const BulkPrintableContent = ({ selectedOrders, orderList }, ref) => {
    const selectedOrderDetails = orderList.filter((order) =>
      selectedOrders.includes(order._id)
  );
  console.log("selectedOrderDetails", selectedOrderDetails)
  return (
    <div ref={contentRef} className="bg-white print:w-full">
      {selectedOrderDetails.length > 0 ? (
        selectedOrderDetails.map((order) => (
          <div
            key={order._id}
            className="w-full h-[100vh] p-12 flex flex-col justify-between border print:border-black print:shadow-none print:page-break"
            style={{ pageBreakAfter: "always" }} // Ensures a new page for each order
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-5xl font-bold">Style Me</h1>
              <h2 className="text-2xl font-semibold">Kathmandu</h2>
              <h2 className="text-2xl font-semibold">9864782899</h2>
            </div>

            {/* Order Information */}
            <div className="flex justify-between text-xl">
              <div>
                <p className="font-medium">Order Date:</p>
                <p>{order?.orderDate?.split("T")[0]}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">COD Amount:</p>
                <p className="text-3xl font-bold text-green-600">₹{order.totalAmount}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Shipping Info & QR Code */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="font-medium text-2xl mb-4">Shipping Info</h3>
                <p className="text-xl">{order.addressInfo?.fullName}</p>
                <p className="text-xl">{order.addressInfo?.address}</p>
                <p className="text-xl">{order.addressInfo?.city}</p>
                <p className="text-xl">{order.addressInfo?.phone}</p>
              </div>
              <div className="flex justify-end">
                <QRCode value={`${window.location.origin}/admin/qrcodedetail/${order._id}`} size={200} />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Order Details */}
            <div>
              <h3 className="font-medium text-2xl mb-4">Order Details</h3>
              <table className="w-full border-collapse border text-left text-xl">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 border-r">Item</th>
                    <th className="p-4 border-r text-center">Quantity</th>
                    <th className="p-4 text-center">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItem?.map((item) => (
                    <tr key={item.title} className="border-b">
                      <td className="p-4 border-r">{item.title}</td>
                      <td className="p-4 border-r text-center">{item.quantity}</td>
                      <td className="p-4 text-center">{item.color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl font-medium">No orders selected for printing.</p>
      )}
    </div>
  );
  };

  const handleCheckboxChange = (getId) => {
    setSelectedOrders((prev) =>
 prev.includes(getId)
        ? prev.filter((id) => id !== getId)
        : [...prev, getId]



    
    );
  };
  

  return (
    <div className="flex flex-col gap-2">
      <div className="createOrder">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/createorder")}
        >
          Create Order
        </Button>
      </div>

      <Tabs defaultValue="Website Order">
        <TabsList>
          <TabsTrigger value="Website Order">Website Order</TabsTrigger>
          <TabsTrigger value="Custom Order">Custom Order</TabsTrigger>
        </TabsList>
        <TabsContent value="Website Order">
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
                        <TableRow key={item?._id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(item?._id)}
                              onChange={() => handleCheckboxChange(item?._id)}
                            />
                          </TableCell>
                          <TableCell>{item._id}</TableCell>
                          <TableCell>
                            {item?.orderDate?.split("T")[0]}
                          </TableCell>
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
                          <TableCell>{item?.totalAmount}</TableCell>
                          <TableCell className="flex gap-2">
                            <Button
                              onClick={() => {
                                setOpenDetailsDialog(true);
                                handleFetchOrderDetails(item?._id);
                              }}
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
              <Button onClick={handleBulkPrint}>Print All</Button>
f
            </CardContent>
          </Card>
          {/* <div className="hidden">
        <PrintableContent contentRef={contentRef} />
      </div> */}
          <div className="hidden">
            <BulkPrintableContent
              contentRef={contentRef}
              selectedOrders={selectedOrders}
              orderList={orderList}
            />
          </div>
        </TabsContent>
        <TabsContent value="Custom Order"> Blank </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminOrdersView;