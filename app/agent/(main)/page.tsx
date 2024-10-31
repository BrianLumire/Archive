"use client";
import Hero from "@/components/agent/hero";
import Statistics from "@/components/agent/statistics";
import StatsTabs from "@/components/agent/statsTabs";
import { useAuth } from "@/lib/agent_provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { accessToken } = useAuth();

  const router = useRouter();
  if (accessToken === null) {
    return router.push("/agent/auth/sign-in");
  } else
    return (
      <section className="w-full">
        <section className="flex flex-col mx-auto w-full max-w-md lg:max-w-[1500px]">
          <Hero />
          <Statistics />
        </section>
        <StatsTabs />
      </section>
    );
}
