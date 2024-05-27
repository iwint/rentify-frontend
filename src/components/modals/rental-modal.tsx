import React, { useCallback, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./modal";
import StepWrapper from "../common/step-wrapper";
import CategoryInput from "../inputs/category-input";
import CountrySelect from "../inputs/country-select";
import ImageUpload from "../inputs/image-uplod";
import Input from "../inputs/input";
import { useNavigate } from "react-router-dom";
import useRendModal from "@/hooks/use-rental-modal";
import { useAppStore } from "@/store/use-app-store";
import { requestActions } from "@/api/request-actions";
import Map from "../common/Map";
import Counter from "../inputs/counter";
import { categories } from "../navbar/categories";

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
  const router = useNavigate();
  const rentModal = useRendModal();
  const { useGetAllData } = useAppStore();
  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);
  const { refetch } = useGetAllData("user/properties", "properties");
  const { PUT_API, POST_API } = requestActions;
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
      location: "",
      guest_count: 0,
      room_count: 0,
      bathroom_count: 0,
      image_src: "",
      title: "",
      description: "",
      price: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guest_count");
  const bathroomCount = watch("bathroom_count");
  const roomCount = watch("room_count");
  const imageSrc = watch("image_src");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const userId = await localStorage.getItem("user_id");

    const payload = {
      ...data,
      user_id: userId,
    };
    if (step != STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    if (rentModal.data != null) {
      await PUT_API(`listings/${rentModal.data?.listing_id}`, {
        ...data,
        listing_id: rentModal.data?.listing_id,
        user_id: userId,
        created_at: rentModal.data?.created_at,
      })
        .then((res: any) => {
          console.log(res.data);
          toast.success("Listing Edited!");
          router("/");
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.setData(null);
          rentModal.onClose();
        })
        .catch((err) => {
          toast.error("Error editing listing");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await POST_API("listings", payload)
        .then((res: any) => {
          console.log(res.data);
          toast.success("Listing Created!");
          router("/");
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
    }
    refetch();
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
          value={location as any}
        />
        <Map center={location.latlng} />
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

  const handleClose = useCallback(async () => {
    if (rentModal.data != null) {
      await rentModal.setData(null);
    }
    rentModal.onClose();
  }, [rentModal]);

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={handleClose}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      title={rentModal.data != null ? "Edit your home" : "Rent your home"}
      body={bodyContent}
    />
  );
};

export default RentModal;
