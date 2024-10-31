import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Nunito, Manrope, Martian_Mono } from "next/font/google";
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nunito = Nunito({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const manrope = Manrope({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const martian_mono = Martian_Mono({
  weight: ["400", "500"],
  style: "normal",
  subsets: ["latin"],
});

export const recoleta = localFont({
  src: "../../app/fonts/recoleta.ttf",
  variable: "--font-recoleta",
  display: "swap",
});