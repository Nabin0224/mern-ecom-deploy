import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "@/pages/common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../../store/shop/address-slice/index";
import AddressCard from "./address-card";
import { current } from "@reduxjs/toolkit";
import { useToast } from "@/hooks/use-toast";

const Address = ({setCurrentSelectedAddressInfo, selectedId}) => {
 
  const initialAddressFormData = {
    address: "",
    city: "",
    nearest_landmark: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const [currentEditedId, SetCurrentEditedId] = useState(null);
  const { toast } = useToast();
  function handleManageAddress(event) {
    event.preventDefault();
    if( addressList.length >= 2 ){
      toast({
        title: "Max 2 addresses can be added!",
        variant: "destructive"
      })
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            SetCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
          }
        });
  }

  function isFormValid() {
    return Object.values(formData).every(
      (value) => value && value.toString().trim() !== ""
    );
  }

  function handleDeleteAddress(getCurrentAddressId) {
    dispatch(
      deleteAddress({ userId: user.id, addressId: getCurrentAddressId._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
      }
    });
  }

  function handleEditAddress(getCurrentAddressId) {
    SetCurrentEditedId(getCurrentAddressId?._id);
    setFormData({
      ...formData,
      address: getCurrentAddressId?.address,
      city: getCurrentAddressId?.city,
      nearest_landmark: getCurrentAddressId?.nearest_landmark,
      phone: getCurrentAddressId?.phone,
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid grid- cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={addressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddressInfo={setCurrentSelectedAddressInfo}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {" "}
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit " : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
