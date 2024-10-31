"use client";

import React, { useState } from "react";
import {
  useForm,
  Controller,
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { FaRegImage } from "react-icons/fa6";

interface CustomFileInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
  accept?: string;
}

export const CustomImageInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
  accept,
}: CustomFileInputProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDelete = (
    e: React.MouseEvent,
    onChange: (...event: any[]) => void
  ) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="fx--c w-full h-full gap-5 items-end border-dashed border-[2px] p-3 rounded-lg">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full h-full">
            <FormLabel className="w-full h-full" style={{ cursor: "pointer" }}>
              <div className="cursor-pointer fx-col w-full h-full">
                <div className="bg-accent relative fx--c justify-center w-full h-full p-5 rounded-lg">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-h-24 object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute  right-0 bottom-0 h-8 w-8 rounded-full"
                        onClick={(e) => handleDelete(e, field.onChange)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  ) : (
                    <div className="h-8 w-8 fx--c justify-center rounded-full">
                      <FaRegImage size={30} />
                    </div>
                  )}
                  {!preview && (
                    <Button
                      size="xs"
                      type="button"
                      onClick={() => {
                        document.getElementById(name)?.click();
                      }}
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Plus size={20} />
                    </Button>
                  )}
                </div>
                <div className="fx-col gap-4">
                  <div className="fx-col">
                    <div className="fx-col gap-1">
                      <h1 className="font-semibold">{label}</h1>
                      {
                        <p className="text-xs text-gray-500">
                          {field.value?.name || helperText}
                        </p>
                      }
                    </div>
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
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
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
    </div>
  );
};
