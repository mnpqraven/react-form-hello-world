import { IFormValues } from "@/app/component/UserFormMappings";
import { FieldErrors } from "react-hook-form";

  export function onSubmit (data: IFormValues) {
    alert(
      `Form submitted:\n` +
      `This payload will be sent to somewhere else after encrypting the password\n` +
      `${JSON.stringify(data, null, 4)}`
    );
    // here lies code to send form data to any backend/API
  };

  export function onFailedSubmit(error: FieldErrors<IFormValues>) {
    console.warn('onFailedSubmit()\nThis function for now only logs out errors for development and testing purporses')
    let list = [];
    for (const field in error) {
      list.push(`${field}: ${error[field as keyof IFormValues]?.message}`);
    }
    console.warn(list);
  }
