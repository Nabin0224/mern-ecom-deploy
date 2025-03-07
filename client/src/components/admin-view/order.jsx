import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '../../../store/admin/order-slice/index'
import { Badge } from '../ui/badge'

const AdminOrdersView = () => {
  const[openDialouge, setOpenDialouge] = useState(false);
  const {orderList, orderDetails} = useSelector(state=> state.adminOrders);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])
  // console.log(orderList, "order list from admin")

  function handleFetchOrderDetails(getId) {

    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    if(orderDetails !== null) setOpenDialouge(true)
    
  }, [orderDetails])
  
  console.log("orderDetails", orderDetails)
  
   return  <Card>
      <CardHeader>
      <CardTitle>
        Order History
      </CardTitle>
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
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
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
                        open={openDialouge}
                        onOpenChange={() => {
                          setOpenDialouge(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>handleFetchOrderDetails(item?._id) 
                          }
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
}

export default AdminOrdersView;