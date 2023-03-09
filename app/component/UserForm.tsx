"use client";
import { onFailedSubmit, onSubmit } from "@/utils/formHandler";
import { passwordValidator } from "@/utils/validator";
import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { Input, Select, Textarea } from "./Common";
import { FieldAttr, formMappings, IFormValues } from "./UserFormMappings";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    delayError: 750,
    mode: "onChange",
  });
  const [data, setData] = useState("");

  const renderFormItem = (item: FieldAttr): JSX.Element => {
    let opts: RegisterOptions = { ...item.opts };
    if (item.id === "password-confirm")
      opts = {
        ...item.opts,
        validate: (value: string) =>
          passwordValidator(watch("Password"), value),
      };
    switch (item.mode) {
      case "input":
        return (
          <Input
            id={item.id}
            label={item.label}
            type={item.type}
            register={register}
            registerOpts={opts}
            title={item.title}
            pattern={item.pattern}
            isError={!!errors[item.label]?.message}
          />
        );
      case "select":
        return (
          <Select
            id={item.id}
            label={item.label}
            register={register}
            registerOpts={opts}
            options={item.options!}
            isError={!!errors[item.label]?.message}
          />
        );
      case "textarea":
        return (
          <Textarea
            id={item.id}
            label={item.label}
            type={item.type}
            register={register}
            registerOpts={opts}
            isError={!!errors[item.label]?.message}
          />
        );
    }
  };

  return (
    <div className="formcontainer flex flex-col justify-between">
      <form
        id="userForm"
        className="flex flex-col justify-center p-5"
        onSubmit={handleSubmit((data: IFormValues) => {
          onSubmit(data);
          setData(JSON.stringify(data));
        }, onFailedSubmit)}
      >
        <div className="grid grid-cols-6 gap-6">
          {formMappings.map((item, index) => (
            // remember to put dynamic class name to tailwind whitelist in
            // tailwind.config.js
            <div className={`col-span-${item.span}`} key={index}>
              {renderFormItem(item)}
              <p>{errors[item.label]?.message}</p>
            </div>
          ))}
        </div>
      </form>
      <div className="flex justify-center">
        <button
          className="bg-rose-600 hover:bg-rose-500"
          onClick={() => reset()}
        >
          reset form
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-500"
          type="submit"
          form="userForm"
        >
          submit
        </button>
      </div>
      <p>Form data: {data}</p>
    </div>
  );
};
export default UserForm;
