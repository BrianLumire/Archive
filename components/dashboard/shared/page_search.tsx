"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { sidebar_links_admin } from "../data/ui_data";
import hotkeys from "hotkeys-js";

export function PageSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // hotkeys("ctrl + k", function (event, handler) {
  //   setOpen(true);
  // });
  useEffect(() => {
    hotkeys("ctrl + k", function (event, handler) {
      event.preventDefault();
      setOpen(true);
    });

    return () => {
      hotkeys.unbind("ctrl + k");
    };
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogTrigger asChild>
        <div className="flex bg-background border border-border fc py-2   lg:pr-10 rounded-lg">
          <Search className=" text-2xl text-border mx-2" />
          <input
            placeholder="Ctrl K, Search.."
            className=" bg-transparent outline-none "
          />
        </div>
      </DialogTrigger>
      <DialogContent
        close={false}
        className="mb:w-[85vw] rounded-md sm:max-w-[425px] px-0 py-2  "
      >
        <Command className="bg-card border-none  max-h-[250px] ">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {sidebar_links_admin.map((link_category) => (
              <CommandGroup
                heading={link_category.type}
                key={link_category.type}
                className="px-2"
              >
                {link_category.links.map((link) => (
                  <CommandItem
                    onSelect={(value) => {
                      router.push(link.path);
                    }}
                    key={link.name}
                  >
                    {link.name}
                  </CommandItem>
                ))}
                <CommandSeparator />
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
