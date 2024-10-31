"use client";
import {
  ExamMaterials,
  MediaBooksTable,
  VideosTable,
} from "@/components/dashboard/tables";
import { useGetProducts } from "@/hooks/api/useProducts";
import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { PiExam } from "react-icons/pi";

const Media = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { data: books, isLoading: books_loading } = useGetProducts({
    product_type: "2",
  });
  const { data: videos, isPending: videos_loading } = useGetProducts({
    product_type: "1",
  });
  const { data: exams, isPending: exams_loading } = useGetProducts({
    product_type: "3",
  });

  const tabs = [
    {
      name: videos_loading ? "Videos (...)" : `Videos (${videos?.count})`,
      icon: <IoVideocamOutline />,
      content: <VideosTable />,
    },
    {
      name: books_loading ? "Books (...)" : `Books (${books?.count})`,
      icon: <PiBooks />,
      content: <MediaBooksTable />,
    },
    {
      name: exams_loading ? "Exams (...)" : `Exams (${exams?.count})`,
      icon: <PiExam />,
      content: <ExamMaterials />,
    },
  ];
  return (
    <div>
      <div className="w-full bg-card border border-border fx rpx pt-4 rounded-md">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer  flex items-center  fx-col justify-center w-1/3 h-14 font-medium ${
              activeIndex === index
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Media;
