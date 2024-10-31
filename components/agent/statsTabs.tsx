"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/agent/ui/tabs";
import ReferralsTable from "./tables/referrals";
import EarningsTable from "./tables/earnings";
import PayoutsTable from "./tables/payouts";
import { GetReferrals } from "@/lib/agent-api/getReferrals";
import { GetEarnings } from "@/lib/agent-api/getEarnings";
import { GetPayouts } from "@/lib/agent-api/getPayouts";
import { earningType, referralDataType } from "@/types";

const StatsTabs = () => {
  const {
    referrals,
    referralsCount,
    referralsPageNumber,
    setReferralsPageNumber,
  } = GetReferrals();

  const { earnings, earningsCount, earningsPageNumber, setEarningsPageNumber } =
    GetEarnings();

  const { payouts, payoutsCount, payoutsPageNumber, setPayoutsPageNumber } =
    GetPayouts();

  return (
    <section className="w-full max-w-3xl lg:max-w-[1500px] mx-auto pb-72 md:pb-48">
      <Tabs
        defaultValue="referrals"
        className="pb-16 mx-auto space-y-8 lg:w-full"
      >
        <TabsList className="bg-white w-full mx-auto">
          <div className="border-[1px] border-[#E6E6E6] p-2 rounded-xl font-light">
            <TabsTrigger
              id="referrals"
              value="referrals"
              className="text-[14px] md:text-[1rem]"
            >
              My Referrals({referralsCount})
            </TabsTrigger>
            <TabsTrigger
              id="earnings"
              value="earnings"
              className="text-[14px] md:text-[1rem]"
            >
              Earnings({earningsCount})
            </TabsTrigger>
            <TabsTrigger
              id="payouts"
              value="payouts"
              className="text-[14px] md:text-[1rem]"
            >
              Payouts({payoutsCount})
            </TabsTrigger>
          </div>
        </TabsList>
        <hr className="h-[2px] bg-[#E6E6E6]" />
        <section className="pl-5 lg:pl-0 lg:px-16 lg:w-full lg:mx-auto">
          <TabsContent
            value="referrals"
            className="lg:w-[100vw] lg:px-5 max-w-[1500px]"
          >
            <h2 className="font-semibold text-[1rem]">My Referrals</h2>
            <p className="text-sm text-[#595D62] leading-[24px] mt-2">
              Here are the records of the people who used your code to register
              onto the app
            </p>
            <ReferralsTable
              referrals={referrals as referralDataType[]}
              referralsCount={referralsCount as number}
              pageNumber={referralsPageNumber}
              setReferralsPageNumber={setReferralsPageNumber}
            />
          </TabsContent>
          <TabsContent
            value="earnings"
            className="lg:w-[100vw] lg:px-5 max-w-[1500px]"
          >
            <h2 className="font-semibold text-[1rem]">My Earnings</h2>
            <p className="text-sm text-[#595D62] leading-[24px] mt-2">
              Here are the records of referee purchases and the commission you
              made from each of the purchases
            </p>
            <EarningsTable
              earnings={earnings as earningType[]}
              earningsCount={earningsCount as number}
              pageNumber={earningsPageNumber}
              setEarningsPageNumber={setEarningsPageNumber}
            />
          </TabsContent>
          <TabsContent
            value="payouts"
            className="lg:w-[100vw] lg:px-5 max-w-[1500px]"
          >
            <h2 className="font-semibold text-[1rem]">Commission Payouts</h2>
            <p className="text-sm text-[#595D62] leading-[24px] mt-2">
              This is the history of admin disbursing the commission you earned
              to your account. (The dates represent when the admin recorded the
              payment and not necessarily when they sent the commission)
            </p>
            <PayoutsTable
              payouts={payouts}
              payoutsCount={payoutsCount as number}
              pageNumber={payoutsPageNumber}
              setPayoutsPageNumber={setPayoutsPageNumber}
            />
          </TabsContent>
        </section>
      </Tabs>
    </section>
  );
};

export default StatsTabs;
