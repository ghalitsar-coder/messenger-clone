"use client";

import BasicModal from "@/components/CUSTOM/BasicModal";
import Modal from "@/components/CUSTOM/Modal";
import TextField from "@/components/CUSTOM/TextField";
import { Button } from "@/components/ui/button";
import useSettingModal from "@/utils/hooks/useSettingModal";
import { settingsApi } from "@/utils/services/settings";
import { User } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface SettingModalProps {
  currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = (props) => {
  const { currentUser } = props;
  const { isOpen, onClose, onOpen } = useSettingModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      image: currentUser?.image ?? "/images/placeholder1.jpg",
      name: currentUser?.name ?? "axle",
    },
  });

  const imageWatch = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await settingsApi({
      data,
      onSuccess: () => {
        router.refresh();
        onClose();
      },
    });
    setIsLoading(false);
  };

  const handleUpload = (res: any) => {
    setValue("image", res?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  return (
    <BasicModal
      className=" max-w-lg w-full "
      showModal={isOpen}
      onOverlayCancel={() => {
        onClose();
      }}
    >
      <>
        <div className="">
          <h3>Profile </h3>
          <p>Edit your public information</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            register={register}
            errors={errors}
            id={"name"}
            name={"name"}
            placeholder="Your name..."
            label="Name"
          />
          <div className="flex items-center gap-x-4 pb-5">
            <div className="">
              <h3 className="text-sm font-semibold">Photo</h3>
              <Image
                alt="user-photo"
                width={48}
                height={48}
                className="rounded-full"
                src={
                  imageWatch || currentUser?.image || "/images/placeholder1.jpg"
                }
              />
            </div>
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              // onClick={onClickUpload}
              uploadPreset="mwhjnlxs"
            >
              <Button type="button" className="">
                Change
              </Button>
            </CldUploadButton>
          </div>
          <Button className="w-full !mt-5" variant={"messanger"}>
            Save
          </Button>
        </form>
      </>
    </BasicModal>
  );
};

export default SettingModal;
