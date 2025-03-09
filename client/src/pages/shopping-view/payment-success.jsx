import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccessPage = () => {
  function handleViewdetails() {
    navigate("/account")
  }
  const navigate = useNavigate();
  return <>
  <Card 
  className="h-20">
    <CardContent>
 <div className='text-2xl'>PaymentSuccess......</div>
 </CardContent>
 </Card>
 <Button 
 onClick={()=> handleViewdetails()}
 className="w-28 p-2 m-1">
  View Details
 </Button>
 </>
}

export default PaymentSuccessPage