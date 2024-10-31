"use client";

import React from "react";
import { FaRegImage } from "react-icons/fa6";

interface ThumbnailImagePreviewProps {
  url: string;
  label: string;
  helperText?: string;
}

export const ThumbnailImagePreview: React.FC<ThumbnailImagePreviewProps> = ({
  url,
  label,
  helperText,
}) => {
  return (
    <div className="fx--c h-full w-full gap-5 items-end border-dashed border-[2px] p-3 rounded-lg">
      <div className="w-full h-full">
        <div className="fx-col w-full">
          <div className="bg-accent relative fx--c justify-center w-full   rounded-lg">
            {url ? (
              <img
                src={url}
                alt={label}
                className="w-full h-auto rounded-lg max-h-32 object-cover"
              />
            ) : (
              <div className="h-8 w-8 fx--c justify-center rounded-full">
                <FaRegImage size={30} />
              </div>
            )}
          </div>
          <div className="fx-col gap-4 mt-2">
            <div className="fx-col">
              <div className="fx-col gap-1">
                <h1 className="font-semibold">{label}</h1>
                {helperText && (
                  <p className="text-xs text-gray-500">{helperText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
