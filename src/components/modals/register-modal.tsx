import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Header from "../common/header";
import RadioButtonSelect from "../inputs/radio-button-select";
import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import { useNavigate } from "react-router-dom";
import Input from "../inputs/input";
import Modal from "./modal";
import { requestActions } from "@/api/request-actions";

type Props = {};

const RegisterModal = (props: Props) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { POST_API } = requestActions;
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await POST_API("auth/register", data)
      .then(async (res: any) => {
        await localStorage.setItem("token", res?.token);
        await localStorage.setItem("user_id", res?.user_id);
        toast.success("Registered successfully");
        if (res?.role === "admin") {
          router("/properties");
          loginModal.onClose();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => registerModal.onClose());
  };

  const toggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header title={"Welcome to Redotel"} subtitle="Create an account" />
      <Input
        disabled={isLoading}
        errors={errors}
        register={register}
        id="email"
        label="Email"
        required
      />
      <Input
        disabled={isLoading}
        errors={errors}
        register={register}
        id="name"
        label="Name"
        required
      />
      <Input
        disabled={isLoading}
        errors={errors}
        register={register}
        type="password"
        id="password"
        label="Password"
        required
      />
      <RadioButtonSelect
        errors={errors}
        id="role"
        label="Role"
        options={[
          {
            value: "user",
            label: "User",
          },
          {
            value: "admin",
            label: "Admin",
          },
        ]}
        register={register}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => SIGN_IN_WITH_GOOGLE()}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggleModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
