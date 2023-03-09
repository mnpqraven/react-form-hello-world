import { HTMLInputTypeAttribute } from "react";
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../UserFormMappings";

type InputProps = {
  id: string;
  label: Path<IFormValues>;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<IFormValues>;
  registerOpts?: RegisterOptions;
  title?: string;
  pattern?: string;
  onChange?: () => void;
  isError: boolean;
};
export const Input = ({
  id,
  label,
  register,
  type = "text",
  registerOpts,
  title,
  pattern,
  onChange,
  isError,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id}>
        {label}{" "}
        {registerOpts?.required && <span className="text-red-600">*</span>}
      </label>
      <input
        autoComplete="off"
        id={id}
        type={type}
        className={`mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${isError ? "invalid" : ""
          }`}
        {...register(label, registerOpts)}
        // required={registerOpts?.required as boolean}
        pattern={pattern}
        title={title}
        inputMode="tel"
      />
    </>
  );
};
