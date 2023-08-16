import Modal from "@/components/CUSTOM/Modal";
import SelectV2 from "@/components/CUSTOM/SelectV2";
import TextField from "@/components/CUSTOM/TextField";
import { Button } from "@/components/ui/button";
import useAddConversation from "@/utils/hooks/useAddConversation";
import { createConversation } from "@/utils/services/users/conversations";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddConversationModal = () => {
  const { isOpen, onClose, users } = useAddConversation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const membersWatch = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await createConversation({
      onSuccess: (res) => {
        onClose();
        router.push(`/conversations/${res.data.id}`);
        router.refresh();
      },
      ...data,
      isGroup: true,
    });
    setIsLoading(false);
  };

  const onChangeSelect = () => {};

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <div className="text-sm space-y-1.5">
        <h3 className="font-semibold">Create a group chat</h3>
        <h4 className="text-xs">Create a chat with more than 2 people</h4>
      </div>
      <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name={"name"}
          errors={errors}
          register={register}
          label="Name"
          rules={{
            required: "Name is required!",
            pattern: {
              value: /^[a-zA-Z' -]{3,}$/,
              message: "The character must have at least 3 characters",
            },
          }}
          placeholder="Name..."
        />
        <div className="mt-2 space-y-1.5">
          <h3 className="text-sm">Members</h3>
          <SelectV2
            isDisabled={isLoading}
            options={users.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
            onChange={(val) =>
              setValue("members", val, { shouldValidate: true })
            }
            value={membersWatch}
            isMulti
          />
        </div>
        <Button
          disabled={isLoading || membersWatch.length < 2 || !isValid}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default AddConversationModal;
