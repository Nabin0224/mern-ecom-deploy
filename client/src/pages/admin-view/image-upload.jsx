import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useRef, useEffect } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";


const ProductTmageUpload = ({
  uploadedImageUrl,
  setUploadedImageUrl,
  imageFile,
  setImageFile,
  setImageLoadingState,
  imageLoadingState,
  currentEditedId
}) => {
  const inputRef = useRef(null);


  function handleImageFileChange(event) {
    // console.log(event.target.files);

    const selectedFile = event.target.files?.[0]
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDrag(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);

    if (inputRef.current) {
      inputRef.current.valur = "";
    }
  }
  async function  uploadImageToCloudinary() {
      setImageLoadingState(true)
      const data = new FormData();
   data.append('my_file', imageFile)
   const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data)  
   console.log(response,"response")
   if(response.data?.success) {setUploadedImageUrl(response.data?.result.url)
    setImageLoadingState(false)}
  }

  useEffect(() => {
   if(imageFile !==null ) uploadImageToCloudinary()
    
  }, [imageFile])
 
  
  return (
    <div className="w-full mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`${currentEditedId !==null && 'opacity-40' } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled = {currentEditedId !== null}
         />

        {!imageFile ? (

          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-32 "
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState ? <Skeleton className='h-10 bg-gray-200'/> : 
          <div className="flex item-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="" />
              <span className="sr-only">Remove item</span>
            </Button>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTmageUpload;
