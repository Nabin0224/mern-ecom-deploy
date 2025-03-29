import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import barcode from "../../assets/barcode/barcode.jpg";
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
import QrCode from "./generateqrcode";

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
      <div ref={contentRef} className="">
        {selectedOrderDetails.length > 0 ? (
          selectedOrderDetails.map((order) => (
            <div key={order._id} className="grid gap-6 m-8 border-b p-6">
              <div className="flex flex-col gap-0">
                <h1 className="text-center text-3xl font-bold">Style Me</h1>
                <h2 className="text-center text-xl font-[500]">Kathmandu</h2>
                <h2 className="text-center text-xl font-[500]">9864782899</h2>
              </div>
              <div className="grid gap-2">
                <div className="flex mt-2 items-center justify-between">
                  <p className="font-medium ">Order Date</p>
                  <Label className="">{order?.orderDate?.split("T")[0]}</Label>
                </div>
              </div>
              <div className="flex  items-center justify-start gap-4">
                <p className="font-bold text-2xl">Cod</p>
                <Label className="font-bold text-2xl">
                  ${order.totalAmount}
                </Label>
              </div>

              <Separator />

              <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="grid">
                  <div className="font-medium text-xl">Shipping Info</div>
                  <div className="grid gap-0.5 text-muted-foreground">
                    <span>{order.addressInfo?.fullName}</span>
                    <span>{order.addressInfo?.address}</span>
                    <span>{order.addressInfo?.city}</span>
                    <span>{order.addressInfo?.phone}</span>
                  </div>
                </div>
                <div className="barcode">
                <QrCode value={`${window.location.origin}/admin/qrcodedetail`} size={200} />

                </div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-medium text-xl mb-4">Order Details</div>
                  <ul className="grid gap-3">
                    {order.cartItem && order.cartItem.length > 0
                      ? order.cartItem.map((item) => (
                          <li
                            key={item.title}
                            className="flex items-center justify-between"
                          >
                            <span>{item.title}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Color: {item.color}</span>

                            {/* <span>Price: ${item.price}</span> */}
                          </li>
                        ))
                      : null}
                  </ul>
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
    setSelectedOrders((prev) =>{
     const updatedSelection = prev.includes(getId)
        ? prev.filter((id) => id !== getId)
        : [...prev, getId];

        sessionStorage.setItem("selectedOrdersForQrCode", JSON.stringify(updatedSelection));
        return updatedSelection;


    }
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
              <Button onClick={() => navigate("/admin/scanqrcode")}>
                Scan QR Code
              </Button>
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
