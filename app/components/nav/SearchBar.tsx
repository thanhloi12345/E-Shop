"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );
    console.log(url);
    router.push(url);
    reset();
  };
  return (
    <div className="flex items-center">
      <input
        {...register(" searchTerm")}
        autoComplete="on"
        type="text"
        placeholder="Explore Smart Shop"
        className="p-2 border border-[#0067ed] rounded-md focus:outline-none focus:rounded-[0.5px] focus:border-[#0067ed] w-80"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-[#0067ed] hover:opacity-80 text-white p-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
