import React, { useEffect, useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";

const CustomProduct = ({ productList, setItems, items }) => {
  function handleCheckedChange(item, selectedColor) {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item?._id);
    //   const [totalColor, setTotalColor] = useState()

      if (existingItem) {
        return prevItems.filter((i) => i.productId !== item?._id);
      } else {
        return [
          ...prevItems,
          {
            productId: item._id,
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: 1,
            color: selectedColor.colorName
          },
        ];
      }
    });
}
console.log("setItems", items)
  return (
    <div>
      <DialogContent>
        <div className="grid grid-cols-[1fr_2fr] gap-6 overflow-y-auto max-h-[400px]">
          {productList && productList?.length
            ? productList.map((item) => (
                <>
                  <div className="flex relative gap-2">
                    <img
                      className="overflow-hidden aspect-square"
                      height={70}
                      width={50}
                      src={item?.image}
                      alt={item?.titlr}
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{item?.title}</h2>
                   <div className="flex gap-3 items-center">
                   {item?.colors.map((items) => (
                      <div className="w-full">
                        <Checkbox
                          className="mt-4 mr-1"
                          onCheckedChange={() => handleCheckedChange(item, items)}
                        />
                        {items.colorName}
                      </div>
                    ))}
                   </div>
                  </div>
                </>
              ))
            : null}
        </div>
      </DialogContent>
    </div>
  );
};

export default CustomProduct;
