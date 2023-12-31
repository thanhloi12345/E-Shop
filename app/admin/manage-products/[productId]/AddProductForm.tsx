/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TexArea";
import { categories } from "@/app/utils/Categories";
import { colors } from "@/app/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import firebaseApp from "@/libs/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";

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

const AddProductForm = ({ product, id }: { product: Product; id?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      images: [],
      price: product.price,
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data", data);
    //upload file anh tuef firebase
    //save product to mongodb

    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [...product.images];
    console.log(uploadedImages);

    // if (!data.category) {
    //   setIsLoading(false);
    //   return toast.error("Category is not selected");
    // }

    // if (!data.images || data.images.length === 0) {
    //   setIsLoading(false);
    //   return toast.error("No selected image!");
    // }

    const handleImageUploads = async () => {
      toast("Updating product, please wait..");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const deleteImage = uploadedImages.findIndex(
              (image) => image.color == item.color
            );
            if (deleteImage >= 0) {
              const imageRef = ref(storage, uploadedImages[deleteImage].image);
              await deleteObject(imageRef);
            }
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      if (deleteImage >= 0)
                        uploadedImages[deleteImage].image = downloadURL;
                      else {
                        uploadedImages.push({
                          ...item,
                          image: downloadURL,
                        });
                      }
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the dowload URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("error handling image uploads");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .patch(`/api/product`, { id, productData })
      .then(() => {
        toast.success("Product updated");
        setIsProductCreated(true);
        router.push("/admin/manage-products");
      })
      .catch((error) => {
        toast.error("Something went wrong when saving product to db");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      <Heading title="Update a Product" center />
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
      <Button
        lable={isLoading ? "Loading..." : "Update Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
