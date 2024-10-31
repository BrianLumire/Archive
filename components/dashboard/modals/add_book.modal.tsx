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
import {
  bookSchema,
  examMaterialsSchema,
  IBookSchema,
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
import { CustomFileInput, CustomImageInput } from "../inputs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FaRegFilePdf } from "react-icons/fa";
import { useCustomLoader } from "../shared";
import { api } from "@/lib/api";
import { useAddProducts } from "@/hooks/api/useProducts";

export function AddBook() {
  const { toast } = useToast();
  const { mutateAsync, uploadProgress } = useAddProducts();
  const { handlePromise, modalOpen, setModalOpen, loading } = useCustomLoader();
  const form = useForm<IBookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      product_type: 2,
    },
  });
  const onSubmit = (data: IBookSchema) => {
    const validatedData = bookSchema.parse(data);
    if (!validatedData) {
      toast({
        title: "Error",
        description: "Invalid data",
      });
    }
    const formData = new FormData();

    Object.entries(data).map(([key, value]) => {
      if (typeof value === "number") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    });
    handlePromise({
      func: async () => {
        // await api.post("/dashboard/products/create/", formData);
        await mutateAsync(formData);
      },
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          Add Book
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[800px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  max-h-[90vh] overflow-hidden fx-col  "
          >
            <DialogHeader className="border-b py-1">
              <DialogTitle>Add A Book</DialogTitle>
            </DialogHeader>
            <div className="fx-col py-4  rpx gap-5 overflow-auto flex-grow">
              <div className="fx--c gap-5 h-full">
                <div className="fx--c flex-[2]  gap-5 items-end border-dashed border-[2px] p-3 rounded-lg md:w-3/4">
                  <FormField
                    control={form.control}
                    name="media_file"
                    render={({ field }) => (
                      <FormItem className="w-ful">
                        <FormLabel>
                          <div className="cursor-pointer fx-btw-c w-full">
                            <div className="fx items-start gap-2">
                              <div className="bg-accent p-10 rounded-lg">
                                <FaRegFilePdf size={20} />
                              </div>
                              <div className="fx-col gap-4">
                                <div className="fx-col">
                                  <div className="fx-col gap-1">
                                    <h1 className=" font-semibold">
                                      Upload Book
                                    </h1>
                                    {
                                      <p className="text-xs text-gray-500">
                                        {field.value?.name ||
                                          "Upload or drag and drop pdf format"}
                                      </p>
                                    }
                                  </div>
                                </div>
                                <Button
                                  onClick={() => {
                                    document
                                      .getElementById(field.name)
                                      ?.click();
                                  }}
                                  type="button"
                                  className="rounded-full"
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
                            // accept="application/pdf"
                            accept="application/pdf"
                            id={field.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                </div>
                <div>
                  <CustomImageInput
                    control={form.control}
                    name="thumbnail"
                    label="Thumbnail"
                    helperText="Used as book preview (jpg, png)"
                    accept="image/*"
                  />
                </div>
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

                {/*Form , Subject  */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pages</FormLabel>
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
                  : "Add Book"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
