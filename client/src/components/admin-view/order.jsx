import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '../../../store/admin/order-slice/index'
import { Badge } from '../ui/badge'
import { getAllOrdersByUserOfEsewa, getOrderDetailsOfEsewa } from '../../../store/shop/esewa-slice/createorder'

const AdminOrdersView = () => {
  const { orderListOfEsewa, orderDetailsOfEsewa } = useSelector(state=> state.esewaOrders)
  const { user } = useSelector(state => state.auth)
  const[openDialouge, setOpenDialouge] = useState(false);
  const {orderList, orderDetails} = useSelector(state=> state.adminOrders);
  
  const dispatch = useDispatch();
  
  // console.log("User ID for fetching orders:", user?.id);

  // console.log(orderList, "order list from admin")
  
  function handleFetchOrderDetails(getId) {
    
    dispatch(getOrderDetailsForAdmin(getId));
  }
  
  
  function handleFetchOrderDetailsOfEsewa(getId) {
    
    dispatch(getOrderDetailsOfEsewa(getId))
  }
  
  useEffect(() => {
    if(orderDetails || orderDetailsOfEsewa) {
      setOpenDialouge(true)
    }else{
      setOpenDialouge(false)
    }
  }, [orderDetails, orderDetailsOfEsewa])
  

  
  

  useEffect(() => {
    dispatch(getAllOrdersForAdmin(user?.id))
  }, [dispatch, user?.id])
  
  
  // console.log("orderDetails", orderDetails)

  // esewa 

   
   
   // making single array from paypal and esewa 
   

   // making single object from paypal and esewa 
   const AllOrderDetails = orderDetails || orderDetailsOfEsewa


  
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
                          onClick={() =>{
                            item?.paymentMethod === "eSewa" ? handleFetchOrderDetailsOfEsewa(item?._id) :
                            handleFetchOrderDetails(item?._id)} 
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={AllOrderDetails} />
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