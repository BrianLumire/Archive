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
import { useForm } from "react-hook-form";
import { examMaterialsSchema, IExamMaterials } from "../schema/main.schema";
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
import {
  createFormData,
  CustomFileInput,
  FileInput,
  useFormSubmitHandler,
} from "../inputs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ICategory, ISubCategory, ISubject } from "@/lib/types/data.types";
import { useAddProducts, useGetProductTypes } from "@/hooks/api/useProducts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomLoader } from "../shared";
export function Exam_Material_Modal() {
  const { toast } = useToast();
  const { data } = useGetProductTypes();
  const { handlePromise, loading, modalOpen, setModalOpen } = useCustomLoader();
  const { mutateAsync: addExamMaterial, uploadProgress } = useAddProducts();
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const form = useForm<IExamMaterials>({
    resolver: zodResolver(examMaterialsSchema),
    defaultValues: {
      product_type: 3,
    },
  });
  useEffect(() => {
    if (data) {
      const cats = data.find((item) => Number(item.id) == 3);
      if (cats) {
        setSubCategories(cats.sub_categories);
      }
    }
  }, [data]);

  const selectedSubCategory = form.watch("sub_category");

  useEffect(() => {
    if (selectedSubCategory) {
      const selectedSubCategoryDetails = subCategories.find(
        (subCategory) => subCategory.id == Number(selectedSubCategory)
      );
      setSubjects(selectedSubCategoryDetails?.subjects || []);
    }
  }, [selectedSubCategory]);

  const onSubmit = (data: IExamMaterials) => {
    const validatedData = examMaterialsSchema.parse(data);

    if (!validatedData) {
      toast({
        title: "Error",
        description: "Error submitting data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () => await addExamMaterial(formData),
      successText: "Exam Material Added Successfully",
      onSuccess: () => {
        form.reset();
      },
    });
  };
  const handleClick = useFormSubmitHandler(form, onSubmit);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          Add Exam Material
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[800px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  max-h-[90vh] overflow-hidden fx-col  "
          >
            <DialogHeader className="border-b py-1">
              <DialogTitle>Add Exam Material</DialogTitle>
            </DialogHeader>
            <div className="fx-col py-4  rpx gap-5 overflow-auto flex-grow">
              <div className="fx-col gap-5 items-end border-dashed border-[2px] p-3 rounded-lg md:w-3/4">
                <FileInput
                  control={form.control}
                  label="Upload Exam Material"
                  name="media_file"
                  accept="application/pdf"
                  helperText="Upload Exam Material PDF"
                />
                <FileInput
                  control={form.control}
                  label="Answer Sheet"
                  name="answer_sheet"
                  accept="application/pdf"
                  helperText="Upload Answer Sheet PDF"
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

                {/* institution, year,form , subject,description */}
                {/* <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="Institution" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="exam_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year"
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
                {/* <FormField
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
                              {dataCategories.map((category) => (
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
                /> */}
                {/* form select */}
                {subCategories.length > 0 && (
                  <FormField
                    control={form.control}
                    name="sub_category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Form" />
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
              <Button type="submit" onClick={handleClick} disabled={loading}>
                {loading && <Loader2 className="animate-spin" />}
                {loading
                  ? `
                Uploading ${uploadProgress}%`
                  : "Add Exam Material"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
