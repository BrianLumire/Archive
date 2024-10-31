"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { MdOutlineVideoLibrary } from "react-icons/md";

interface VideoPreviewDialogProps {
  url: string;
  label: string;
  helperText?: string;
}

export const VideoPreviewDialog: React.FC<VideoPreviewDialogProps> = ({
  url,
  label,
  helperText,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9); // Default aspect ratio
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateAspectRatio = () => {
        setAspectRatio(video.videoWidth / video.videoHeight);
      };
      video.addEventListener("loadedmetadata", updateAspectRatio);
      return () =>
        video.removeEventListener("loadedmetadata", updateAspectRatio);
    }
  }, []);

  return (
    <div className="fx--c h-full w-full gap-5 items-end border-dashed border-[2px] p-3 rounded-lg">
      <div className="w-full h-full">
        <div className="cursor-pointer fx-col w-full">
          <div className="bg-accent relative fx--c justify-center w-full  rounded-lg">
            {url ? (
              <>
                <video
                  src={url}
                  className="w-full h-auto rounded-lg max-h-48 object-contain"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute inset-0 m-auto h-12 w-12 rounded-full opacity-80 hover:opacity-100"
                    >
                      <Play size={24} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 border-none rounded-lg max-w-[90vw] max-h-[90vh] overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <video
                        ref={videoRef}
                        src={url}
                        controls
                        autoPlay
                        className="max-w-full max-h-full"
                        style={{
                          width: `min(90vw, ${90 * aspectRatio}vh)`,
                          height: `min(90vh, ${90 / aspectRatio}vw)`,
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="h-8 w-8 fx--c justify-center rounded-full">
                <MdOutlineVideoLibrary size={30} />
              </div>
            )}
          </div>
          <div className="fx-col gap-4">
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
