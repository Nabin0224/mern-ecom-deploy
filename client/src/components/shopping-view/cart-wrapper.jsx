import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './cart-items-content';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({cartItems, setOpenCartSheet}) => {
    const  navigate = useNavigate();
    console.log(cartItems, "cartItems from wrapper")
    
    const totalCartAmount = 
    cartItems && cartItems.length > 0 ? 
    cartItems.reduce(
        (sum, currentItem) => 
             sum + (
        currentItem?.salePrice >  0 ? currentItem.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0  )
    : 0


  return <SheetContent className = "w-1/2" >
        <SheetHeader>
            <SheetTitle>
                Your Cart
            </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
        {
            cartItems && cartItems?.length > 0 ? 
            cartItems?.map((item) => <UserCartItemsContent  cartItem= {item}/> ) : null
        }
        </div>
        <div className="mt-8 space-y-4">
            <div className="flex justify-between">
            <span className='font-bold'>Total</span>
            <span className="font-semibold">Rs{totalCartAmount}</span>
            </div>
        </div>
        <Button onClick={()=>{ navigate('/shop/checkout'); setOpenCartSheet(false)}} className="w-full mt-8 ">Checkout</Button>
        
    </SheetContent>
    
  
    
}

export default UserCartWrapper;