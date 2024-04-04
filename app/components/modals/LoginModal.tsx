"use client";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Header from "@components/common/Header";
import Input from "@components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@components/common/Button";
import { POST_API } from "api/api";
import useLoginModal from "hooks/useLoginModal";

type Props = {};

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginUser = await POST_API("/sign-in", data);
    console.log(loginUser);
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
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Don't have an account ?</div>
          <div
            onClick={() => {
              registerModal.onOpen();
              loginModal.onClose();
            }}
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
