import { nunito } from "@/lib/agent-api/utils";
import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <div className=" pb-3 flex flex-col bg-[#eeeeee] rounded-[30px] mt-10 lg:mx-40 lg:flex-row  mx-3 gap-6">
        <div className="pt-4  flex justify-center items-center">
          <Image src="/landing/info.png" alt="" width={400} height={300} />
        </div>

        <div className=" flex   items-center flex-col lg:justify-center lg:pl-20">
          <h1 className=" font-sansita text-xl font-semibold mb-3">
            Contact Information
          </h1>
          <p className=" font-nunito mb-4 text-center px-3">
            If you have any questions or concerns about these Terms of Use,
            please contact us at
            <a href="mailto:info@gmotivate.com" className="text-blue-600">
              {" "}
              [info@gmotivate.com.]
            </a>
            .
          </p>
          <div className="flex items-center gap-5">
            <Link href="mailto:info@gmotivate.com " className="pb-2">
              <button className=" font-nunito py-2 px-6 rounded-md text-sm bg-blue-700  ml-1 text-white hover:opacity-75 transition-opacity">
                Email Us
              </button>
            </Link>
            <Link href="tel:0716044379" className="pb-2">
              <button className="font-nunito py-2 px-7 rounded-md text-sm bg-blue-700 text-white hover:opacity-75 transition-opacity">
                Call Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 px-3 lg:mx-32 mb-12 ">
        <h1 className="text-xl text-center font-sansita font-semibold mb-7">
          PRIVACY POLICY
        </h1>
        <p className="lg:text-center text-base font-nunito">
          As Gmotivate we value your privacy and are commmitted to protecting
          it. Your personal data is important to us and for this reason we would
          like to make sure you know how we use and protect it. In this privacy
          policy, personal data is defined as any information that can be used
          to identify a natural person. We will explain how we collect, share
          and process your personal data.{" "}
        </p>
      </div>

      <div className=" px-3 lg:mx-32 mb-12 ">
        <h1 className="mb-7 text-xl font-sansita font-semibold ">
          WHAT TYPE OF PERSONAL DATA DO WE COLLECT
        </h1>
        <p className="font-nunito mb-1">
          We collect the following types of personal information:{" "}
        </p>
        <ul className="font-nunito list-disc list-inside pl-2">
          <li className={`${nunito.className}`}>
            Identification Data: This refers to information that identifies you
            such as your name, your date of birth, your gender and your user log
            in credentials{" "}
          </li>
          <li className={`${nunito.className}`}>
            Usage Data: Information automatically collected when you use the
            Software, such as your IP address, device information, and browsing
            history.{" "}
          </li>
          <li className={`${nunito.className}`}>
            Violate any intellectual property rights related to the Software.
          </li>
          <li className="font-nunito">
            {" "}
            Cookies: We may use cookies and similar tracking technologies to
            enhance your experience on our platform
          </li>
        </ul>
      </div>

      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          WHY DO WE NEED TO COLLECT YOUR PERSONAL DATA
        </h1>
        <p className="font-nunito mb-1">
          Collecting your personal data allows us to:
        </p>
        <ol className="list-decimal list-inside font-nunito pl-2">
          <li className="font-nunito">
            To improve our products and services to our clients. This includes
            developing, testing, and analyzing our software, products, and
            services.
          </li>
          <li className="font-nunito">
            Monitoring and recording our communications. It allows us to
            communicate with you regarding updates, features, and customer
            service support.
          </li>
          <li className="font-nunito">
            Compliance with legal obligations. To comply with the relevant local
            legal obligations, regulations, directives, judgments, or court
            orders.
          </li>
          <li className="font-nunito">
            To perform analytics and improve our app in general and the services
            we offer.
          </li>
        </ol>
      </div>
      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          WHO MAY WE SHARE YOUR PERSONAL DATA WITH
        </h1>
        <p className="font-nunito mb-1">
          We may share your personal information with third parties in the
          following circumstances:{" "}
        </p>
        <h2 className="font-medium mb-1">Service Providers: </h2>
        <span className="mb-1 font-nunito">
          We may at times engage third-party service providers such as
          operational, administrative , payment processor, technology and any
          other persons that we engage or partner with in order to assist us
          analyze or facilitate improvement in our service delivery providers to
          assist in operating the software, such as payment processors or
          hosting providers.
        </span>
        <h2 className="font-medium mb-1">Legal Compliance:</h2>
        <span className="font-nunito">
          We may disclose your personal information in order to comply with
          legal obligations i.e as required by law or and when requested by any
          authority, in order to enforce our policies, or protect our rights.
        </span>
        <h2 className="font-medium mb-1">Cross-Border Data Transfer:</h2>
        <span className="font-nunito">
          If your data is transferred outside Kenya, we will ensure it is
          protected in accordance with Kenyan laws.
        </span>
      </div>
      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          WHERE DO WE TRANSFER PERSONAL DATA
        </h1>
        <p className="font-nunito mb-4">
          We may process, store, share or transfer personal data within our
          sanitation or share it with other third parties for the reasons
          outlined in this policy . This ensures that our operations remain
          secure and efficient, in order to effectively deliver our services to
          you. It also allows us to monitor and improve our business operations
          while also complying with our legal and regulatory obligations.{" "}
        </p>
        <p className="font-nunito">
          Where the recipient of your personal information is a third party
          outside of Kenyas jurisdiction we will ensure that all reasonable
          steps are taken to ensure that your personal information is protected.
        </p>
      </div>
      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          HOW DO WE PROTECT YOUR PERSONAL DATA
        </h1>
        <p className="font-nunito">
          To ensure that your personal data is well protected , we have put in
          place physical and technical measures to safeguard your information.
          i.e we ensure that all contracts we get into have confidential and
          data protection clauses. We also ensure that all third parties that we
          deal with have put in place data protection policies in line with the
          Data Protection Act, 2019.
        </p>
      </div>
      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          HOW LONG DO WE RETAIN YOUR DATA
        </h1>
        <p className="font-nunito mb-4">
          For the reasons stated in this privacy notice, we retain your personal
          data for the purposes of effectively operating our business while you
          engage with us for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, or as required by law
        </p>
        <p className="font-nunito">
          We will delete, destroy and or stop using personal data as soon as we
          dont want it
        </p>
      </div>
      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          CHILDREN&apos;S POLICY
        </h1>
        <p className="font-nunito">
          Our Software is not intended for children under the age of 18. We do
          not knowingly collect personal information from individuals under 18.
          If we become aware of such data, we will take steps to delete it.
        </p>
      </div>

      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          YOUR PERSONAL DATA PROTECTION RIGHTS
        </h1>
        <p className="font-nunito">
          Under the Kenya Data Protection Act, 2019, you have the right to:
        </p>
        <p className="font-nunito">
          Access the personal data we hold about you. You have the right to
          inquire on whatever personal data we hold about you and request for a
          copy of such information and an explanation on how we have used it{" "}
        </p>
        <ul className="list-disc list-inside">
          <li className="font-nunito">
            <strong className="">
              Request correction of inaccurate or incomplete personal data.
            </strong>
            <p>
              Where information we hold about you is out of date or incorrect,
              you have a right to ask that we correct and or update such
              information{" "}
            </p>
          </li>
          <li className="font-nunito">
            <strong>
              Request correction of inaccurate or incomplete personal data.
            </strong>
            <p>
              You have the right to request that we delete personal data.
              However we may need personal details in order to provide our
              services to you.
            </p>
            <p>
              Object to the processing of your data or withdraw consent where
              applicable.
            </p>
            <p>
              You have the right to ask to stop using your data or change how we
              use it.
            </p>
          </li>
          <li className="font-nunito">
            <strong>The right to provide, change or withdraw consent.</strong>
            <p>
              Where we need to process personal data, we may ask for your
              consent. If you withdraw your consent or fail to offer your
              consent,we will not process your personal data.{" "}
            </p>
            <p>However we may not be able to provide our services to you. </p>
          </li>
          <li className="font-nunito">
            <strong>The right to withdraw from direct marketing</strong>
            <p>
              You may at any time choose to withdraw your consent and we will
              stop sharing our marketing emails at any time
            </p>
          </li>
          <li className="font-nunito list-none">
            <strong>
              - Be informed as to the use to which your personal data is put.{" "}
            </strong>
            <p>
              The main aim of our privacy policy is to inform you on how your
              personal data will be used
            </p>
          </li>
        </ul>
      </div>

      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          CHANGES TO THIS POLICY
        </h1>
        <p className="font-nunito">
          We may update this Privacy Policy from time to time. Any changes will
          be communicated via the Software or other appropriate means. Continued
          use of the Software after updates are posted constitutes acceptance of
          the revised policy.
        </p>
      </div>

      <div className="px-3 lg:mx-32 mb-12">
        <h1 className="mb-7 text-xl font-sansita font-semibold">
          CONTACT INFORMATION
        </h1>
        <p className="font-nunito">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at
          <a
            href="mailto:info@gmotivate.com"
            className="text-blue-500 underline ml-1"
          >
            info@gmotivate.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
