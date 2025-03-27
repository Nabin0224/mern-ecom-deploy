import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useRef, useEffect } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation, useParams } from "react-router-dom";

const ProductImageUpload = ({
  uploadedImageUrls,
  setUploadedImageUrls,
  imageFiles,
  setImageFiles,
  setImageLoadingState,
  imageLoadingState,
  
}) => {
  const inputRef = useRef(null);
  const location = useLocation();
  const product = location.state?.product;
  const { id } = useParams();
  console.log(id, "id")
  console.log("state products in edit", product);
  console.log(imageFiles, "uploaded image urls in edits ");

  // Store initial images on edit 
  useEffect(()=> {
        if(product?.image?.length > 0  && uploadedImageUrls.length === 0 ) {
          setUploadedImageUrls(product?.image);
        }
  }, [product])
  
  function handleImageFileChange(event) {
    if(id) {
      setImageFiles(uploadedImageUrls)
    }
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setImageFiles(selectedFiles); // Append new images
    
  }
  console.log("Seclected images after edit", imageFiles)
  }
  console.log("setImageFiles in handleImageFile", imageFiles);
  function handleDrag(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setImageFiles(droppedFiles); // Append new images
    }
  }

  function handleRemoveImage(index) {
    // setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadedImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  }

  async function uploadImageToCloudinary() {
    if (imageFiles?.length === 0) return;
    console.log("before upload uploadedUrls", uploadedImageUrls);
    setImageLoadingState(true);
    const uploadedUrls = [];

    for (const file of imageFiles) {
      const data = new FormData();
      data.append("images", file);
      try {
        console.log("data in image", data);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
          data
        );
        console.log("response of cloudinary", response);
        if (response.data?.success) {
          uploadedUrls.push(response.data.result);
        }
        console.log("array of uploaded image", uploadedUrls);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Append new URLs to the state
    setUploadedImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFiles?.length > 0) uploadImageToCloudinary();
  }, [imageFiles]);

  return (
    <div className=" mx-auto mt-4 ">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDrag}
        onDrop={handleDrop}
        // className={${
        //   id !== null && "opacity-40"
        // } border-2 border-dashed rounded-lg p-4}
      >
        <Input
          id="image-upload"
          type="file"
          className=""
          ref={inputRef}
          onChange={handleImageFileChange}
          multiple // Allow multiple file selection
        />

        {uploadedImageUrls?.length == 0 && imageFiles?.length === 0 ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex flex-wrap gap-3">
            {uploadedImageUrls?.map((url, index) => (
              <div key={index} className="relative w-24 h-24 border rounded">
                <img
                  src={url}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-white p-1 rounded-full"
                >
                  <XIcon className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;