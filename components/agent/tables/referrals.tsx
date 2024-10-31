import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Paginator from "./paginator";
import { referralDataType } from "@/types";

function ReferralsTable({
  referrals,
  referralsCount,
  pageNumber,
  setReferralsPageNumber,
}: {
  referrals: referralDataType[] | undefined;
  referralsCount: number;
  pageNumber: number;
  setReferralsPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <section className="lg:w-full lg:mx-auto">
      <ScrollArea className="text-nowrap my-4 mx-auto">
        <table className="border-collapse my-6 text-[0.9em] mr-5 lg:mr-7 lg:w-full">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#1C1C1C] text-left">
              <th className="px-16 py-5">Phone No</th>
              <th className="px-16 py-5">Region</th>
              <th className="px-16 py-5">Registered On</th>
              <th className="px-16 py-5">Referee Purchases</th>
            </tr>
          </thead>
          <tbody>
            {referrals?.map((referral: referralDataType) => (
              <tr
                key={referral.id}
                className="border-b-[#dddddd] border-b-[1px] text-[#595D62]"
              >
                <td className="px-16 py-5">
                  {referral.phone_number
                    ? referral.phone_number
                    : "No phone number"}
                </td>
                <td className="px-16 py-5">
                  {referral.region !== null
                    ? referral.region.name
                    : "Region not set"}
                </td>
                <td className="px-16 py-5">
                  {new Date(referral.creation_time).toLocaleDateString(
                    "en-us",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="px-16 py-5">{referral.total_purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Paginator
        itemsCount={referralsCount}
        page={pageNumber}
        setPage={setReferralsPageNumber}
      />
    </section>
  );
}

export default ReferralsTable;
