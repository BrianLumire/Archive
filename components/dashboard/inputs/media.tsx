"use client";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegFilePdf } from "react-icons/fa6";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
const FileInputSchema = z.object({
  file: z.instanceof(File, { message: "File is required" }),
});

interface CustomFileInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
}

export const CustomFileInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
}: CustomFileInputProps<TFieldValues>) => {
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="flex items-center space-x-2 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <>
            <Input
              type="file"
              id={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                  setFileName(file.name);
                }
              }}
              onBlur={onBlur}
              ref={ref}
              className="hidden"
            />
            <div
              className="cursor-pointer fx-btw-c w-full"
              onClick={() => document.getElementById(name)?.click()}
            >
              <div className="fx items-start gap-2">
                <div className="bg-accent p-4 px-8 rounded-lg">
                  <FaRegFilePdf size={20} />
                </div>
                <div className="fx-col">
                  <h1 className=" font-semibold">{label}</h1>
                  {
                    <p className="text-xs text-gray-500">
                      {fileName || "No file selected"}
                    </p>
                  }
                </div>
              </div>
              <Button
                className="rounded-full"
                variant={fileName ? "ghost" : "default"}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      />
    </div>
  );
};
interface CustomFileInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
  accept?: string;
}

export const FileInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
  accept,
}: CustomFileInputProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            <div className="cursor-pointer fx-btw-c w-full">
              <div className="fx items-start gap-2 w-full">
                <div className="bg-accent px-10 py-5 rounded-lg">
                  <FaRegFilePdf size={20} />
                </div>
                <div className="fx-btw gap-10 w-full ">
                  <div className="fx-col">
                    <div className="fx-col gap-1">
                      <h1 className=" font-semibold">{label}</h1>
                      {
                        <p className="text-xs text-gray-500">
                          {field.value?.name || helperText}
                        </p>
                      }
                    </div>
                  </div>
                  <Button
                    className="rounded-full"
                    type="button"
                    onClick={() => {
                      document.getElementById(name)?.click();
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              id={name}
              accept={accept}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file);
                }
              }}
              onBlur={field.onBlur}
              ref={field.ref}
              className="hidden"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
