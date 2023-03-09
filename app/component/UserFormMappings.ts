import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions } from "react-hook-form";

const required = "This field is required";
const PHONE_FORMAT = "\\+?[0-9]{8,12}";
const USERNAME_FORMAT = "^[A-Za-z0-9_]+$";

export interface IFormValues {
  Username: string;
  "E-Mail Address": string;
  "Phone Number": number;
  Gender: boolean;
  "Date of birth": Date;
  Address: string;
  Education: string;
  Hobbies: string;
  Password: string;
  "Password Confirmation": string;
}
export type FieldAttr = {
  span: 3 | 6;
  mode: "input" | "select" | "textarea";
  // INFO: for select mode
  // not yet needed for KVs
  options?: string[];
  id: string;
  label: keyof IFormValues;
  type?: HTMLInputTypeAttribute;
  opts?: RegisterOptions;
  title?: string;
  pattern?: string;
};

export const formMappings: FieldAttr[] = [
  {
    mode: "input",
    id: "username",
    label: "Username",
    span: 3,
    type: "text",
    opts: {
      required,
      pattern: {
        value: new RegExp(USERNAME_FORMAT),
        message: "Only alphabetical characters and underscores are allowed",
      },
      minLength: {
        value: 6,
        message: "At least 6 characters required",
      },
    },
  },
  {
    mode: "input",
    id: "email",
    label: "E-Mail Address",
    span: 3,
    type: "email",
    opts: { required },
  },
  {
    mode: "input",
    id: "phone",
    label: "Phone Number",
    span: 3,
    type: "text",
    opts: { required, pattern: new RegExp(PHONE_FORMAT) },
    pattern: PHONE_FORMAT,
    title: "9 or 10-digit long phone number",
  },
  {
    mode: "select",
    id: "gender",
    label: "Gender",
    span: 3,
    opts: { required },
    options: ["Male", "Female"],
  },
  {
    mode: "input",
    id: "dob",
    label: "Date of birth",
    span: 3,
    type: "date",
    opts: { required },
  },
  {
    mode: "input",
    id: "address",
    label: "Address",
    span: 3,
    type: "text",
    opts: { required },
  },
  {
    mode: "input",
    id: "education",
    label: "Education",
    span: 3,
    type: "text",
    opts: undefined,
  },
  {
    mode: "textarea",
    id: "hobbies",
    label: "Hobbies",
    span: 3,
    opts: undefined,
  },
  {
    mode: "input",
    id: "password",
    label: "Password",
    span: 3,
    type: "password",
    opts: {
      required,
      pattern: {
        value: new RegExp(USERNAME_FORMAT),
        message: "Only alphabetical characters and underscores are allowed",
      },
      minLength: {
        value: 6,
        message: 'At least 6 characters are required'
      }
    },
  },
  {
    mode: "input",
    id: "password-confirm",
    label: "Password Confirmation",
    span: 3,
    type: "password",
    opts: { required: "Password confirmation is required" },
  },
];
