import React, { useEffect, useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Checkbox } from '../ui/checkbox';

const CustomProduct = ({productList, setItems, items}) => {
   
    function handleCheckedChange(item) {
 
         setItems((prevItems) => {
            const existingItem = prevItems.find((i)=> i.productId === item?._id);

            if(existingItem) {
              return prevItems.filter(i => i.productId !== item?._id);
            }else{
                return [
                    ...prevItems, 
                   { productId: item._id,
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: 1,}
                ]
            }
            
        })
        
    }
  return (
    <div>
        <DialogContent>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[400px]">
                {
                productList && productList?.length 
                ?
                productList.map((item) => <>
                
                <div className='flex relative gap-2'>
                    <Checkbox className="mt-4" 
                    onCheckedChange={()=> handleCheckedChange(item)}
                    
                    />
                    <img
                    className='overflow-hidden aspect-square'
                    height={70}
                    width={50}
                src={item?.image}
                alt={item?.titel}
                />
                </div>
                <div>
                    {item?.title}
                    </div> 
                    </>
                    
                )
                : null
            }
                </div> 

        </DialogContent>
    </div>
  )
}

export default CustomProduct