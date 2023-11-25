/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TexArea";
import { categories } from "@/app/utils/Categories";
import { colors } from "@/app/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  console.log("images>>>>>>>>>>", images);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);
  useEffect(() => {
    if (!isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const fillteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return fillteredImages;
      }
      return prev;
    });
  }, []);
  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        lable="Name"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="price"
        lable="Price"
        disable={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />

      <Input
        id="brand"
        lable="Brand"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        lable="Description"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in stock"
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            // eslint-disable-next-line react/jsx-key
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex-col flex-wrap gap-4">
        <div className="font-bold">
          Select the vailable product colors and upload their images.
        </div>
        <div className="text-sm">
          You mus upload an image for each of the color selected otherwise your
          color selection will be ignored.
        </div>
        <div className="grid grid-cols-2 gap-3 ml-9">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
