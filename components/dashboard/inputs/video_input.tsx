"use client";

import React, { useState, useEffect } from "react";
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
import { Plus, Play, Trash2 } from "lucide-react";
import { MdOutlineVideoLibrary } from "react-icons/md";

interface CustomFileInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
  accept?: string;
  initialUrl?: string; // New prop for edit mode
}

export const CustomVideoInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
  accept,
  initialUrl,
}: CustomFileInputProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl);
    }
  }, [initialUrl]);

  const handleDelete = (
    e: React.MouseEvent,
    onChange: (...event: any[]) => void
  ) => {
    e.stopPropagation();
    setPreview(null);
    setIsPlaying(false);
    onChange(null);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fx--c h-full w-full gap-5 items-end border-dashed border-[2px] p-3 rounded-lg">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full h-full">
            <FormLabel className="w-full" style={{ cursor: "pointer" }}>
              <div className="cursor-pointer fx-col w-full ">
                <div className="bg-accent relative fx--c justify-center w-full p-5 py-12 rounded-lg">
                  {preview ? (
                    <>
                      <video
                        src={preview}
                        controls={isPlaying}
                        className="w-full h-auto rounded-lg max-h-64 object-contain"
                      />
                      {!isPlaying && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute inset-0 m-auto h-12 w-12 rounded-full opacity-80 hover:opacity-100"
                          onClick={handlePlay}
                        >
                          <Play size={24} />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute bottom-0 right-0  h-8 w-8 rounded-full"
                        onClick={(e) => handleDelete(e, field.onChange)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  ) : (
                    <div className="h-8 w-8 fx--c justify-center rounded-full">
                      <MdOutlineVideoLibrary size={30} />
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
