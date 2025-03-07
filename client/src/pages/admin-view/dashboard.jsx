import React, { useEffect, useState } from "react";
import ProductTmageUpload from "./image-upload";
import { Bluetooth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatureImages,
  getFeatureImages,
} from "../../../store/common/index";

const AdminDashboard = () => {
  const { featureImagesList } = useSelector((state) => state.featureImage);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  console.log(uploadedImageUrl, "uploaded image ok");
  const dispatch = useDispatch();

  function handleUpload() {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      console.log(data, "data ok ok ");
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl('')
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImagesList, "feature image list");
  return (
    <div>
      <h1>
        <ProductTmageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
          currentEditedId={currentEditedId}
        />
      </h1>
      <Button onClick={() => handleUpload()} className="w-full">Upload</Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImagesList && featureImagesList.length > 0
          ? featureImagesList.map((item) => (
              <div className="relative">
                <img 
                  src={item?.image}
                  
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
