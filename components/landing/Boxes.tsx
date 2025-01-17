import { nunito, recoleta } from "@/lib/agent-api/utils";
import Image from "next/image";

export default function Boxes() {
  return (
    <section className="max-w-[1500px] w-full mx-auto">
      <div className="mt-80 lg:mt-[30rem] lg:min-h-[500px] flex flex-col lg:mx-36 gap-16">
        {/* <span id="how-it-works" className="font-averia font-semibold text-xl text-center text-black">
          Here's how it works
        </span> */}

        {/* Video Box */}
        <div
          id="videos"
          className="bg-[#3AAFFF1A] rounded-md flex flex-col lg:flex-row-reverse px-4 lg:pl-0 lg:min-h-[390px]"
        >
          <div className="flex flex-col gap-10 lg:flex-1">
            <div className="flex items-center gap-6 pt-14 lg:pr-8">
              <Image
                src="/landing/video-icon.png"
                alt=""
                height={43}
                width={43}
              />
              <span
                className={`text-xl font-semibold text-[#3AAFFF] ${nunito.className}`}
              >
                Videos
              </span>
            </div>
            <h1
              className={`lg:text-2xl text-xl  text-[#333333] lg:hidden ${recoleta.className}`}
            >
              Explore videos on topics such as pre-campus mentorship, academics,
              general motivation, entertainment, and courses.
            </h1>
            <h1
              className={`text-xl text-[#333333] hidden lg:block ${recoleta.className}`}
            >
              Explore videos across different categories including
            </h1>
            <span className={`${nunito.className}`}>
              Our videos are recorded and produced for those who find them
              resourceful based on their needs.
            </span>
          </div>

          <div className="flex flex-col items-start lg:flex-1 relative mx-auto">
            <div className="absolute hidden lg:block top-0 left-0 h-[370px] w-[370px] rounded-full bg-gradient-to-r from-[#1975b3] to-[#68a7ff] z-0"></div>
            <div className="relative z-10 flex justify-center items-center h-full">
              <Image
                src="/landing/video.png"
                alt=""
                height={700}
                width={490}
                className="relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Books Box */}
        <div
          id="books"
          className="bg-[#FFF7ED] rounded-md flex flex-col lg:flex-row lg:min-h-[390px] px-4 lg:pr-0"
        >
          <div className="flex flex-col gap-10 lg:flex-1 lg:pl-8 mb-16 ">
            <div className="flex items-center gap-6 pt-14">
              <Image
                src="/landing/bookspic.png"
                alt=""
                height={43}
                width={43}
              />
              <span
                className={`text-xl font-semibold text-[#FFAC4A] ${nunito.className}`}
              >
                Books
              </span>
            </div>
            <h1
              className={`lg:text-2xl text-xl  text-[#333333] lg:hidden ${recoleta.className}`}
            >
              We avail books we recommend for our users to read on the app.
            </h1>
            <h1
              className={`text-xl text-[#333333] hidden lg:block ${recoleta.className}`}
            >
              Read diverse books covering varying topics from professional
              authors.
            </h1>
            <span className={`${nunito.className}`}>
              These books are sourced from our internal team and partners who
              write on topics relevant to our mission and vision.
            </span>
          </div>
          <div className="flex flex-col items-start lg:flex-1 relative mx-auto">
            <div className="absolute hidden lg:block top-0 right-0 h-[370px] w-[370px] rounded-full bg-gradient-to-r from-[#FFAC4A] to-[#99672D] z-0"></div>
            <div className="relative lg:absolute z-10 flex justify-center items-center h-full lg:right-16">
              <Image
                src="/landing/books.png"
                alt=""
                height={600}
                width={390}
                className="relative z-10 lg:top-8"
              />
            </div>
          </div>
        </div>

        {/* Exam Box */}
        <div
          id="exam-materials"
          className="bg-[#A55FEF1A] mb-16 rounded-md flex flex-col lg:flex-row-reverse px-4 lg:pl-0 lg:min-h-[380px]"
        >
          <div className="flex flex-col gap-10 lg:flex-1 mb-16">
            <div className="flex items-center gap-6 pt-14 lg:pr-8">
              <Image
                src="/landing/examspic.png"
                alt=""
                height={43}
                width={43}
              />
              <span
                className={`text-xl font-semibold text-[#A55FEF] ${nunito.className}`}
              >
                Exam Materials
              </span>
            </div>
            <h1
              className={`lg:text-2xl text-xl text-[#333333] lg:hidden ${recoleta.className}`}
            >
              There’s a collection of resources to equip students for academic
              excellence.
            </h1>
            <h1
              className={`text-xl text-[#333333] hidden lg:block ${recoleta.className}`}
            >
              Get full papers with both exam questions and marking schemes.
            </h1>
            <span className={`${nunito.className}`}>
              We avail exam materials from top schools, i.e., question papers
              and marking schemes to help students prepare for assessments.
            </span>
          </div>

          <div className="flex flex-col items-start lg:flex-1 relative mx-auto">
            <div className="absolute hidden lg:block top-0 left-0 h-[370px] w-[370px] rounded-full bg-gradient-to-r from-[#A55FEF] to-[#5F3689] z-0"></div>
            <div className="relative z-10 flex justify-center items-center h-full">
              <Image
                src="/landing/exams.png"
                alt=""
                height={600}
                width={390}
                className="relative z-10 lg:top-7 lg:left-20 lg:max-h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
