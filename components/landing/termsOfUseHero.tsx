import Image from "next/image";

/* eslint-disable react/no-unescaped-entities */

export default function TermsOfUseHero() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-9 flex-col justify-center items-center md:mx-14 xl:mx-36 xl:px-40">
        <h1 className="font-sansita text-2xl md:text-4xl text-center">
          Terms of Use & Privacy Policy
        </h1>
        <p className="text-center text-sm px-2 font-nunito">
          Welcome to Gmotivate ("we", "our", or "the Company"). Please read the
          following terms and conditions together with our PRIVACY POLICY in
          depth before accessing any of our online services. If you have any
          concerns or are uncertain, we recommend that you seek further
          clarification.
        </p>
      </div>
      <div className="flex flex-col mt-20 gap-20">
        <div className="flex items-center gap-3">
          <Image src="/landing/playstore.svg" alt="" height={56} width={120} />
          <Image src="/landing/appstore.svg" alt="" height={56} width={140} />
        </div>
        <span className="text-center text-lg font-nunito">Scroll to Read</span>
      </div>
    </div>
  );
}
