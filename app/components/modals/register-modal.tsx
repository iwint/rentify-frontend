"use client";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "hooks/use-register-modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Header from "@components/common/header";
import Input from "@components/inputs/input";
import toast from "react-hot-toast";
import Button from "@components/common/button";
import { POST_API } from "api/api";
import useLoginModal from "hooks/use-login-modal";
import { useGoogleLogin } from "@react-oauth/google";
import Modal from "./modal";

type Props = {};

const RegisterModal = (props: Props) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const SIGN_IN_WITH_GOOGLE = useGoogleLogin({
    onSuccess: (user) => handleGoogleLogin(user),
    onError: (error) => console.log(error),
  });

  const handleGithubLogin = useCallback((data: any) => {
    setIsLoading(true);
    axios
      .get("/auth/github")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleGoogleLogin = useCallback((data: any) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`
      )
      .then(async (res) => {
        let payload = {
          name: res.data.name,
          email: res.data.email,
          password: res.data.id,
        };
        await POST_API("auth/register", payload).then(async (res: any) => {
          await localStorage.setItem("user_id", res?.user_id);
          await localStorage.setItem("token", res?.token);
          toast.success("Registered successfully");
        });
      })
      .catch((err) => console.log(err))
      .finally(() => registerModal.onClose());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await POST_API("auth/register", data)
      .then(async (res: any) => {
        await localStorage.setItem("token", res?.token);
        await localStorage.setItem("user_id", res?.user_id);
        toast.success("Registered successfully");
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
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
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
      />
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
