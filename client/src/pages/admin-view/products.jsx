import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

import CommonForm from "../common/form";
import { addProductFormElements } from "@/config/index";
import ProductTmageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../../store/admin/product-slice/index";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./product-tile";
import { v4 as uuidv4 } from "uuid";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  // import {adminProducts}  from '../../../store/admin/product-slice'

  const { productList } = useSelector((state) => state.adminProducts);

   function handleDelete(gethandleId) {
    console.log(gethandleId)
    dispatch(deleteProduct(gethandleId)).then((data)=>{
      if(data?.payload?.success) {
        dispatch(fetchAllProducts() )
      }
    })
   }
  function onSubmit() {
    currentEditedId !== null
      ?  dispatch(editProduct({ id: currentEditedId, formData }))
      .then((data) => {
        console.log(data, "Edit product response");
        
        if(data?.payload?.success) {
          dispatch(fetchAllProducts())
          setCurrentEditedId(null)
          setOpenCreateProductDialog(false)
          setFormData(initialFormData)
          
        }
      })
     
        
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductDialog(false);
            setImageFile(null);
            setFormData(initialFormData);

            toast({
              title: "Successfully added",
            });
          }
        });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, "product list ok ");
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)} className="">
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={uuidv4()}
                product={productItem}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side={"right"} className="overflow-auto">
          <SheetTitle>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
          </SheetTitle>
          <ProductTmageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Save" : "Add"}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
