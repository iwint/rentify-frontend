"use client";
import React, { useMemo } from "react";
import Modal from "./modal";
import useRendModal from "hooks/use-rental-modal";
import Header from "@components/common/header";
import { categories } from "@components/navbar/categories";
import CategoryInput from "@components/inputs/category-input";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "@components/inputs/country-select";
import dynamic from "next/dynamic";
import Counter from "@components/inputs/counter";
import StepWrapper from "@components/common/step-wrapper";
import ImageUpload from "@components/inputs/image-uplod";
import Input from "@components/inputs/input";
import { POST_API } from "api/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppStore } from "store/use-app-store";

type Props = {};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = (props: Props) => {
  const router = useRouter();
  const rentModal = useRendModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guest_count: 1,
      room_count: 1,
      bathroom_count: 1,
      image_src: null,
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guest_count");
  const bathroomCount = watch("bathroom_count");
  const roomCount = watch("room_count");
  const imageSrc = watch("image_src");

  const Map = useMemo(
    () =>
      dynamic(() => import("@components/common/map"), {
        ssr: false,
      }),
    [location]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userId = await localStorage.getItem("user_id");

    const payload = {
      ...data,
      user_id: userId,
    };
    if (step != STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    await POST_API("listing", payload)
      .then((res: any) => {
        console.log(res.data);
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((err) => {
        toast.error("Error creating listing");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <StepWrapper title="What type of place do you have?" subtitle="Select one">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </StepWrapper>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <StepWrapper
        title="Where is your place located?"
        subtitle="Help guests find you"
      >
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </StepWrapper>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <StepWrapper
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      >
        <Counter
          onChange={(value) => setCustomValue("guest_count", value)}
          value={guestCount}
          title="Number of guests"
          subtitle="How many guests can your place accommodate?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("room_count", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroom_count", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </StepWrapper>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <StepWrapper
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like"
      >
        <ImageUpload
          onChange={(value) => setCustomValue("image_src", value)}
          value={imageSrc}
        />
      </StepWrapper>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <StepWrapper
        title="Describe your place"
        subtitle="Tell guests about your place"
      >
        <Input
          errors={errors}
          id="title"
          label="Title"
          register={register}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          errors={errors}
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
          required
        />
      </StepWrapper>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <StepWrapper
        title="Set your price"
        subtitle="How much do you want to charge per night?"
      >
        <Input
          errors={errors}
          id="price"
          label="price"
          register={register}
          disabled={isLoading}
          required
          type="number"
          formatPrice
        />
      </StepWrapper>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      title="Rent your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
