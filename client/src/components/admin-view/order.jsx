import React, { useEffect, useState } from "react";
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

import { getAllOrdersForAdmin, getOrderDetailsForAdmin } from "../../../store/admin/order-slice/index";
import AdminOrderDetailsView from "./order-details";

const AdminOrdersView = () => {

  const { orderList , orderDetails, resetOrderDetails } = useSelector(state => state.adminOrders)
 
  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  
  const dispatch = useDispatch();

  // fetching orders details of particular 
 function handleFetchOrderDetails(getId) {

    dispatch(getOrderDetailsForAdmin(getId));
  }


    
  

 

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails])



  // fetching All orders for database 
  useEffect(() => {
    
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);




  


  // console.log(orderList, "order list");
  console.log("orderDetails in admin details ok" , orderDetails)

  const orders = orderList

  


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0
              ? orders.map((item) => (
                  <TableRow >
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
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                          
                        }}
                      >
                        <Button
                          onClick={()=> handleFetchOrderDetails(item?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;