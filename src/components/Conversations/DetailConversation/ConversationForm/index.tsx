"use client";

import TextField from "@/components/CUSTOM/TextField";
import { Button } from "@/components/ui/button";
import useConversation from "@/utils/hooks/useConversation";
import { sendMessage, uploadImage } from "@/utils/services/conversation/conversationForm";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

const ConversationForm = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { message: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    resetField("message", { keepTouched: true });
    // TODO: CREATE SEND MESSAGE API
    await sendMessage({ data: { ...data, conversationId } });
  };

  const handleUploadImage = async (result:any) => {
    await uploadImage({ image: result?.info?.secure_url, conversationId });
  };

  return (
    <div className="p-4 bg-white border-t-[1px] flex items-center   gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUploadImage}
        uploadPreset="mwhjnlxs"
      >
        <HiPhoto size={30} className={"text-sky-500"} />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex !items-center gap-2 lg:gap-4  w-full"}
      >
        <TextField
          type="text"
          id="message"
          name="message"
          register={register}
          errors={errors}
          placeholder="Write a message"
          fieldClass="w-full "
          className="bg-neutral-100"
        />
        <Button type="submit" variant={"messanger"} className={"rounded-lg "}>
          <HiPaperAirplane />
        </Button>
      </form>
    </div>
  );
};

export default ConversationForm;
