import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function createFormData(
  data: Record<string, string | number | File | Blob>
): FormData {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => {
    if (typeof value === "number") {
      formData.append(key, value.toString());
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}
type SubmitHandler<T extends FieldValues> = (data: T) => void | Promise<void>;

export function useFormSubmitHandler<T extends FieldValues>(
  form: UseFormReturn<T>,
  onSubmit: SubmitHandler<T>
) {
  return () => {
    const errors = form.formState.errors;
    const errorArr = Object.values(errors);
    if (errorArr.length > 0) {
      toast.error(String(errorArr[0]?.message));
    } else {
      form.handleSubmit(onSubmit)();
    }
  };
}
export function to2dp(num: number) {
  return parseFloat(num.toFixed(2));
}

//date to string
export function dateToString(date: Date) {
  return date.toISOString().split("T")[0];
}
