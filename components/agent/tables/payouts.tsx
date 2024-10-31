import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Paginator from "./paginator";
import { payoutsType } from "@/types";

function PayoutsTable({
  payouts,
  payoutsCount,
  pageNumber,
  setPayoutsPageNumber,
}: {
  payouts: payoutsType[] | undefined;
  payoutsCount: number;
  pageNumber: number;
  setPayoutsPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {

  return (
    <section>
      <ScrollArea className="text-nowrap my-4 mx-auto md:w-full">
        <table className="border-collapse my-6 text-[0.9em] w-5/6 mr-5 md:w-full">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#1C1C1C] text-left">
              <th className="px-16 py-5">Date</th>
              <th className="px-16 py-5">Amount</th>
              <th className="px-16 py-5">Balance</th>
            </tr>
          </thead>
          <tbody>
            {payouts?.map((payout) => (
              <tr
                key={payout.id}
                className="border-b-[#dddddd] border-b-[1px] text-[#595D62]"
              >
                <td className="px-16 py-5">
                  {new Date(payout.creation_time).toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-16 py-5">Ksh. {payout.total}</td>
                <td className="px-16 py-5">
                  Ksh. {payout.agent_current_balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Paginator
        itemsCount={payoutsCount}
        page={pageNumber}
        setPage={setPayoutsPageNumber}
      />
    </section>
  );
}

export default PayoutsTable;
