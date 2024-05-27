import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./modal";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import { useNavigate } from "react-router-dom";
import { requestActions } from "@/api/request-actions";
import Header from "../common/header";
import Input from "../inputs/input";

type Props = {};

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();
  const { POST_API } = requestActions;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    await POST_API("auth/sign-in", data)
      .then(async (res: any) => {
        await localStorage.setItem("user_id", res?.user_id);
        await localStorage.setItem("token", res?.token);
        toast.success("Logged in successfully");
        if (res?.role === "admin") {
          router("/properties");
          loginModal.onClose();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => loginModal.onClose());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header title={"Welcome back!"} subtitle="Login to your account" />
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
        type="password"
        id="password"
        label="Password"
        required
      />
      {/* <RadioButtonSelect
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
      /> */}
    </div>
  );

  const toggleModal = useCallback(() => {
    registerModal.onOpen();
    loginModal.onClose();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => SIGN_IN_WITH_GOOGLE}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Don't have an account ?</div>
          <div
            onClick={toggleModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
