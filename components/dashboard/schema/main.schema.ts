import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export const loginSchema = emailSchema.extend({
  password: z.string().min(6),
});

export type IEmailSchema = z.infer<typeof emailSchema>;

export type ILoginSchema = z.infer<typeof loginSchema>;
const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = [
  // "application/pdf",
  "application/pdf",
  "application/msword",

  ,
];

export const bookSchema = z.object({
  media_file: z.instanceof(File, {
    message: "Media File is required",
  }),
  thumbnail: z.instanceof(File, {
    message: "Thumbnail is required",
  }),
  title: z.string().min(3),
  product_type: z.number().int().positive(),
  price: z.number().positive(),
  pages: z.number().int().positive(),
  author: z.string().min(3),
  description: z.string().min(3),
});

export type IBookSchema = z.infer<typeof bookSchema>;
export const videoSchema = z.object({
  media_file: z.instanceof(File, {
    message: "Media File is required",
  }),
  preview_video: z.instanceof(File, {
    message: "Video Previewis required",
  }),
  thumbnail: z.instanceof(File, {
    message: "Thumbnail is required",
  }),
  product_type: z.number().int().positive(),
  title: z.string().min(3),
  price: z.number().positive(),
  author: z.string().min(3),
  category: z.string(),
  sub_category: z.string().optional(),
  subject: z.string().optional(),
  description: z.string().min(3),
});

export type IVideoSchema = z.infer<typeof videoSchema>;

export const examMaterialsSchema = z.object({
  product_type: z.number().int().positive(),
  media_file: z.instanceof(File, {
    message: "Media File is required",
  }),
  answer_sheet: z.instanceof(File, {
    message: "Answer Sheet is required",
  }),
  title: z.string().min(3),
  price: z.number().positive(),
  author: z.string().min(3),
  exam_year: z.number().int().positive(),
  sub_category: z.string().optional(),
  subject: z.string(),
  description: z.string().min(3),
});

export type IExamMaterials = z.infer<typeof examMaterialsSchema>;
export const newAgentSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(3),
  region: z.string(),
  phone_number: z.string().min(3),
  institution: z.string().min(3),
});

export type INewAgentSchema = z.infer<typeof newAgentSchema>;

export const accountEditSettingsSchema = z.object({
  full_name: z.string().min(3),
  email: z.string().email(),
  phone_number: z.string().min(3),
});

export type IAccountEditSettingsSchema = z.infer<
  typeof accountEditSettingsSchema
>;

//cuurent password, new password, confirm password
export const changePasswordSchema = z.object({
  old_password: z.string().min(6),
  password: z.string().min(6),
  password2: z.string().min(6),
});
export type IChangePasswordSchema = z.infer<typeof changePasswordSchema>;

//add regions
export const addRegionSchema = z.object({
  name: z.string().min(3),
});
export type IAddRegionSchema = z.infer<typeof addRegionSchema>;
