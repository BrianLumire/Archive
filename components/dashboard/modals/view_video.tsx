import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IProduct } from "@/lib/types/data.types";
import { urlBuilder } from "@/lib/utils";
import { Play, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { VideoPreviewDialog } from "./helpers/video_preview";
import { ThumbnailImagePreview } from "./helpers/thumbnail_preview";

export function ViewVideo({ video }: { video: IProduct }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button onClick={() => setOpen(true)} variant="outline"> */}
        View Product
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] fx-col max-h-[90vh]">
        <DialogHeader className="border-b py-2">
          <DialogTitle>View Details and Statistics</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-grow overflow-auto">
          <div className="grid col-span-1 md:grid-cols-3 gap-5 ">
            <VideoPreviewDialog
              url={urlBuilder(video.preview_video || "")}
              label={"Video Preview"}
              // helperText={video.title}
            />
            <VideoPreviewDialog
              url={urlBuilder(video.media_file)}
              label={"Video"}
              // helperText={video.title}
            />
            <ThumbnailImagePreview
              url={urlBuilder(video.thumbnail)}
              label={"Thumbnail"}
              // helperText={video.title}
            />
          </div>
          <div>
            <h4 className="dts4 font-semibold">{video.title}</h4>
            <p className="text-sm">
              Uploaded on {new Date(video.creation_time).toDateString()} by{" "}
            </p>
          </div>
          <div>
            <div className="fx-col">
              <h3 className="dts6 font-medium ">Statistics</h3>
              <Separator />
            </div>
            <div className="fx-col py-2">
              <div className="fx gap-2">
                <Avatar className={`text-primary bg-secondary/10 h-14 w-14`}>
                  <AvatarFallback className="bg-secondary/5 ">
                    <ShoppingBag className="text-secondary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="dts5 font-semibold">
                    {video.purchases_number}
                  </h3>
                  <span className="text-sm">Purchases</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" fx flex-col gap-2">
            <div className="fx-col  gap-2 py-2">
              <h3 className="dts6 ">Details</h3>
              <Separator />
            </div>
            <div className="fx-col gap-2">
              <Td desc={`Ksh ${video.price}`} title="Price:" />
              <div className="fx gap-5">
                <Td desc={video?.category?.name || "N/A"} title="Category:" />{" "}
                <Td desc={video.sub_category?.name || "N/A"} title="Form" />{" "}
                <Td desc={video?.subject?.name || "N/A"} title="Subject:" />
                <Td desc={video.author || "N/A"} title="Author:" />
              </div>
              <Td desc={video.description || "N/A"} title="Description:" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const Td = ({ title, desc }: { title: string; desc?: string | number }) => {
  return (
    <div className="fx-col ">
      <h6 className="opacity-70 text-sm">{title}</h6>{" "}
      <p className="text-base">{desc}</p>
    </div>
  );
};
