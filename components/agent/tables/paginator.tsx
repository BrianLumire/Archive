"use client";
import Image from "next/image";
import { useState } from "react";

const Paginator = ({
  itemsCount,
  page,
  setPage,
}: {
  itemsCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [activePage, setActivePage] = useState(page);

  function checkAndRoundUp(num: number) {
    return num % 1 !== 0 ? Math.ceil(num) : num;
  }

  const totalTabs = checkAndRoundUp(itemsCount / 10); // Total number of pages

  const handlePaginationClick = (index: number) => {
    setActivePage(index);
    setPage(index);
  };

  const handleLeftClick = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleRightClick = () => {
    if (activePage < totalTabs) {
      setActivePage((prevPage) => prevPage + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const visibleRange = 5; // Number of visible pages before showing the last one
  const startPage = Math.max(1, activePage - Math.floor(visibleRange / 2));
  const endPage = Math.min(totalTabs - 1, startPage + visibleRange - 1);

  return (
    <section className="flex justify-center items-center mr-5 gap-3 lg:justify-end">
      <div
        className="border-[1.5px] border-[#595D62] p-1.5 rounded-lg cursor-pointer"
        onClick={handleLeftClick}
      >
        <Image src={"/chevron.svg"} height={24} width={24} alt="Chevron Left" />
      </div>
      <div className="flex items-center gap-4">
        {/* Display the first set of pages */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
          (pageIndex) => (
            <div key={pageIndex}>
              <p
                className={` ${
                  activePage === pageIndex
                    ? "bg-[#3AAFFF] px-4 rounded-lg text-sm py-2 text-white"
                    : "px-3 py-1 cursor-pointer"
                }`}
                onClick={() => handlePaginationClick(pageIndex)}
              >
                {pageIndex}
              </p>
            </div>
          )
        )}

        {/* Always display the last page */}
        {endPage < totalTabs && (
          <div>
            <p
              className={` ${
                activePage === totalTabs
                  ? "bg-[#3AAFFF] px-4 rounded-lg text-sm py-2 text-white"
                  : "px-3 py-1 cursor-pointer"
              }`}
              onClick={() => handlePaginationClick(totalTabs)}
            >
              {totalTabs}
            </p>
          </div>
        )}
      </div>
      <div
        className="border-[1.5px] border-[#595D62] p-1.5 rounded-lg cursor-pointer"
        onClick={handleRightClick}
      >
        <Image
          src={"/chevron.svg"}
          height={24}
          width={24}
          alt="Chevron Right"
          className="rotate-180"
        />
      </div>
    </section>
  );
};

export default Paginator;
