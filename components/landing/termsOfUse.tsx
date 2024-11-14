import Image from "next/image";

export default function TermsOfUse() {
  return (
    <>
      <div className="mt-10 flex flex-col gap-10 px-4 md:px-20 xl:px-36">
        <h1 className="font-semibold font-sansita text-center text-xl">
          ACCEPTANCE OF TERMS AND CONDITIONS
        </h1>
        <p className="text-center font-medium font-nunito">
          Before agreeing to being registered on the Gmotivate App, you must
          carefully read the terms and conditions as set out in this agreement,
          which may be amended from time to time by Gmotivate. These terms and
          conditions will govern the use of the App before registration. By
          accessing, using or registering on the Gmotivate app, you hereby
          expressly acknowledge and agree to be bound by this agreement, any
          future amendments and additions to this agreement as may be published
          from time to time.
        </p>
      </div>
      <div className="mt-16 pt-11 px-4 flex flex-col lg:flex-row bg-[#3AAFFF1A]">
        {/* Left */}
        <div className="flex flex-col flex-1 gap-14 lg:pl-20 mb-20">
          <div className="flex flex-col gap-7">
            <h1 className="font-semibold text-lg font-sansita">
              CREATING AN ACCOUNT
            </h1>
            <p className="font-nunito">
              By using the Gmotivate app you represent and warrant that you are
              of the legal age and have the required capacity to enter into
              binding contracts. That you have the authority and capacity to
              enter into this agreement and abide by the terms and conditions of
              this agreement.
            </p>
          </div>
          <div className="flex flex-col gap-7">
            <h1 className="font-semibold text-lg font-sansita">USAGE RIGHTS</h1>
            <p className="font-nunito">
              You are granted a non-exclusive, non-transferable, limited license
              to use the Software for personal or commercial purposes, as
              applicable. You agree to use the Software in compliance with all
              applicable laws and regulations, and you will not:
            </p>
            <ul className="list-disc list-inside">
              <li className="font-nunito">
                Use the Software for illegal or unauthorized purposes.
              </li>
              <li className="font-nunito">
                Attempt to reverse engineer, modify, or tamper with the
                Software.
              </li>
              <li className="font-nunito">
                Violate any intellectual property rights related to the
                Software.
              </li>
            </ul>
          </div>
        </div>
        {/* Right */}
        <div className=" flex flex-col flex-1  pl-7 justify-center items-center  ">
          <div className="relative flex items-center justify-center  h-[250px] w-[250px] lg:h-[400px] lg:w-[350px] bg-[#FCA949]">
            <Image
              src="/landing/term.png"
              alt=""
              width={150}
              height={130}
              className=" absolute bottom-[-20px] lg:w-[190px] lg:h-[460px] "
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 mt-14 px-3 md:px-14 lg:px-28">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">
            INTELLECTUAL PROPERTY
          </h1>
          <p className="font-nunito">
            All content and materials available on the Gmotivate App, including
            but not limited to text, graphics, software, and logos, are the
            property of Gmotivate or its licensors. You are granted no ownership
            rights over the App or any associated content.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">USER ACCOUNTS</h1>
          <p className="font-nunito">
            To access certain features of the Software, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account. Notify us immediately if you suspect
            any unauthorized use of your account.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">
            LIMITATION OF LIABILITY
          </h1>
          <p className="font-nunito">
            The Software is provided on an "as is" basis. We make no warranties
            or representations about the accuracy or completeness of the
            Software. [Company Name] will not be liable for any damages arising
            from your use of the Software, including direct, indirect,
            incidental, or consequential damages.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">TERMINATION</h1>
          <p className="font-nunito">
            We reserve the right to terminate or suspend your access to the
            Software at any time, with or without notice, for any violation of
            these Terms of Use or for any other reason.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">GOVERNING LAW</h1>
          <p className="font-nunito">
            These Terms of Use are governed by the laws of Kenya. Any disputes
            arising from the use of the Software shall be resolved in the courts
            of Kenya.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold font-sansita text-xl">CHANGES OF TERMS</h1>
          <p className="font-nunito">
            We reserve the right to modify these Terms of Use at any time. Any
            changes will be communicated through the Software or other
            reasonable means. Continued use of the Software after changes are
            posted constitutes your acceptance of the revised terms.
          </p>
        </div>
      </div>
    </>
  );
}
