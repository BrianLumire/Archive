import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Paginator from "./paginator";
import { earningType } from "@/types";

function EarningsTable({
  earnings,
  earningsCount,
  pageNumber,
  setEarningsPageNumber,
}: {
  earnings: earningType[];
  earningsCount: number;
  pageNumber: number;
  setEarningsPageNumber: React.Dispatch<React.SetStateAction<number>>
}) {

  return (
    <section>
      <ScrollArea className="text-nowrap my-4 mx-auto">
        <table className="border-collapse my-6 text-[0.9em] w-5/6 mr-5">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#1C1C1C] text-left">
              <th className="px-16 py-5">Phone No</th>
              <th className="px-16 py-5">Region</th>
              <th className="px-16 py-5">Media Type</th>
              <th className="px-16 py-5">Item Name</th>
              <th className="px-16 py-5">Sold On</th>
              <th className="px-16 py-5">Commision Earned (Ksh)</th>
            </tr>
          </thead>
          <tbody>
            {earnings?.map((earning: earningType) => (
              <tr
                key={earning.id}
                className="border-b-[#dddddd] border-b-[1px] text-[#595D62]"
              >
                <td className="px-16 py-5">
                  {earning?.owner?.phone_number
                    ? earning.owner.phone_number
                    : "No phone number"}
                </td>
                <td className="px-16 py-5">
                  {earning?.owner?.region !== null
                    ? earning?.owner?.region.name
                    : "Region not set"}
                </td>
                <td className="px-16 py-5">
                  {earning?.product
                    ? earning?.product?.product_type.name
                    : "No media type"}
                </td>
                <td className="px-16 py-5">
                  {earning?.product ? earning?.product?.title : "No title"}
                </td>
                <td className="px-16 py-5">
                  {new Date(earning.creation_time).toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-16 py-5">
                  {earning?.commision_total === null
                    ? "No commision"
                    : `Ksh. ${earning?.commision_total?.toFixed(0)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Paginator page={pageNumber} itemsCount={earningsCount} setPage={setEarningsPageNumber} />
    </section>
  );
}

export default EarningsTable;
