"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { Control, FieldPath, FieldValues, useForm } from "react-hook-form";
import {
  videoSchema,
  examMaterialsSchema,
  IVideoSchema,
  IExamMaterials,
} from "../schema/main.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FaRegFilePdf } from "react-icons/fa";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProducts,
  useEditProduct,
  useGetProductTypes,
} from "@/hooks/api/useProducts";
import { useEffect, useState } from "react";
import {
  ICategory,
  IProduct,
  IProductType,
  ISubCategory,
  ISubject,
} from "@/lib/types/data.types";
import { useCustomLoader } from "../shared";
import { createFormData, CustomImageInput, CustomVideoInput } from "../inputs";

export function AddVideo({ video }: { video: IProduct }) {
  const { toast } = useToast();
  const { data } = useGetProductTypes();
  const { handlePromise, loading, modalOpen, setModalOpen } = useCustomLoader();
  const [videoCategories, setVideoCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const { mutateAsync: addVideo, uploadProgress } = useEditProduct();
  useEffect(() => {
    if (data) {
      const videoData = data.find((item) => Number(item.id) == 1);
      if (videoData) {
        setVideoCategories(videoData.categories);
      }
    }
  }, [data]);
  const form = useForm<IVideoSchema>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: video?.title || "",
      price: video?.price || 0,
      author: video?.author || "",
      description: video?.description || "",
      category: video?.category?.id.toString() || "",
      sub_category: video?.sub_category.id.toString() || "",
      subject: video?.subject.id.toString() || "",
    },
  });
  useEffect(() => {
    form.reset();
    //update the category and subcategory
  }, [video]);
  const selectedCategory = form.watch("category");
  const selectedSubCategory = form.watch("sub_category");

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryDetails = videoCategories.find(
        (category) => category.id == Number(selectedCategory)
      );

      setSubCategories(selectedCategoryDetails?.sub_categories || []);
    }
    if (selectedSubCategory) {
      const selectedSubCategoryDetails = subCategories.find(
        (subCategory) => subCategory.id == Number(selectedSubCategory)
      );
      setSubjects(selectedSubCategoryDetails?.subjects || []);
    }
  }, [selectedCategory, selectedSubCategory]);

  const onSubmit = (data: IVideoSchema) => {
    const validatedData = videoSchema.parse(data);

    if (!validatedData) {
      toast({
        title: "Error",
        description: "Error submitting data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () =>
        await addVideo({
          data: formData,
          id: video.id,
        }),
      successText: "Video Added Successfully",
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          Add Video
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[800px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  max-h-[90vh] overflow-hidden fx-col  "
          >
            <DialogHeader className="border-b py-1">
              <DialogTitle>Add A Video </DialogTitle>
            </DialogHeader>
            <div className="fx-col py-4  rpx gap-5 overflow-auto flex-grow">
              <div className="fx--c gap-5 h-full">
                <CustomVideoInput
                  control={form.control}
                  name="media_file"
                  label="Upload Video"
                  helperText="Upload video format size 1080 by 720px"
                  accept="video/*"
                  initialUrl={video?.media_file}
                />
                <CustomVideoInput
                  control={form.control}
                  name="preview_video"
                  label="Upload Video Preview"
                  helperText="Upload video format size 1080 by 720px"
                  accept="video/*"
                  initialUrl={video?.preview_video ?? undefined}
                />
                <CustomImageInput
                  control={form.control}
                  name="thumbnail"
                  label="Thumbnail"
                  helperText="Used as book preview (jpg, png)"
                  accept="image/*"
                />
              </div>
              <div className="fx-col gap-1">
                <h6 className="text-muted-foreground">Item Details</h6>
                <Separator />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title </FormLabel>
                      <FormControl>
                        <Input placeholder="Exam Material Title" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Price (Ksh) * </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Amount"
                          {...field}
                          type="number"
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* author,category,form,subject */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author </FormLabel>
                      <FormControl>
                        <Input placeholder="Author" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* select caytegory */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {videoCategories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* form select */}
                {selectedCategory && subCategories.length > 0 && (
                  <FormField
                    control={form.control}
                    name="sub_category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Category </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Sub Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {subCategories.map((subCategory) => (
                                  <SelectItem
                                    key={subCategory.id}
                                    value={subCategory.id.toString()}
                                  >
                                    {subCategory.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {subjects.length > 0 && (
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {subjects.map((subCategory) => (
                                  <SelectItem
                                    key={subCategory.id}
                                    value={subCategory.id.toString()}
                                  >
                                    {subCategory.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                        ></Textarea>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  const errors = form.formState.errors;
                  const errorArr = Object.values(errors);
                  if (errorArr.length > 0) {
                    toast({
                      title: "Error",
                      description: errorArr[0].message,
                    });

                    return;
                  } else {
                    form.handleSubmit(onSubmit);
                  }
                }}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                {loading
                  ? `
                Uploading ${uploadProgress}%`
                  : "Add Video"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
const FileInputSchema = z.object({
  file: z.instanceof(File, { message: "File is required" }),
});
interface CustomFileInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
  accept?: string;
}

const CustomFileInput = <TFieldValues extends FieldValues>({
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
              <div className="fx items-start gap-2">
                <div className="bg-accent px-10 py-5 rounded-lg">
                  <FaRegFilePdf size={20} />
                </div>
                <div className="fx gap-10">
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
