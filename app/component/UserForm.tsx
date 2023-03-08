"use client";
import { useState } from "react";
import { FieldErrors, RegisterOptions, useForm } from "react-hook-form";
import { Input } from "./Common/Input";
import { Select } from "./Common/Select";
import { Textarea } from "./Common/Textarea";
import { FieldAttr, formMappings, IFormValues } from "./UserFormMappings";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>();
  const [data, setData] = useState("");

  function passwordValidator(value: string) {
    if (watch("Password") != value) {
      return "Your passwords do not match";
    }
  }

  function renderFormItem(item: FieldAttr): JSX.Element {
    let opts: RegisterOptions = { ...item.opts };
    if (item.id === "password-confirm")
      opts = { ...item.opts, validate: passwordValidator };
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
            onChange={() => clearErrors(item.label)}
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
          />
        );
    }
  }

  const onSubmit = (data: IFormValues) => {
    console.log("form submitted");
    setData(JSON.stringify(data));
  };

  function onFailedSubmit(error: FieldErrors<IFormValues>) {
    let list = [];
    for (const field in error) {
      list.push(`${field}: ${error[field as keyof IFormValues]?.message}`);
    }
    console.warn(list);
  }

  return (
    <div className="formcontainer flex flex-col justify-between">
      <form
        id="userForm"
        className="flex flex-col justify-center p-5"
        onSubmit={handleSubmit(onSubmit, onFailedSubmit)}
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
        <button className="bg-rose-600 hover:bg-rose-500">reset form</button>
        <button
          className="bg-indigo-600 hover:bg-indigo-500"
          type="submit"
          form="userForm"
        >
          submit
        </button>
      </div>
      <p>data: {data}</p>
    </div>
  );
};
export default UserForm;
