"use client";

export default function PricingCard({ plan }: any) {
  return (
    <>
      <div className="mt-5">
        {plan.popular && (
          <div className="-mt-9.25 w-34 py-2 bg-primary mx-auto text-white text-center px-4 ">
            <p className="font-commissioner font-normal text-[14px] leading-[150%] tracking-[-4%]">
              {" "}
              Most Popular
            </p>
          </div>
        )}
        <div
          className={`border p-4 h-full flex flex-col ${
            plan.popular ? "border-primary " : "border-black/20"
          }`}
        >
          <div className="flex flex-col flex-1">
            {/* badge */}
            <div className=" flex gap-2 items-center   bg-[#301C1B] py-1 px-3  mt-5 w-10/12">
              <div className="border-3 w-4 h-1 bg-white border-primary"></div>
              <h1 className=" font-dm-mono font-normal text-[14px] leading-[150%] tracking-[-4%] text-primary">
                {plan.badge}
              </h1>
            </div>
            {/* title */}
            <h1 className="font-commissioner font-semibold text-[24px] leading-[110%] tracking-[-4%] uppercase text-[#301C1B] mt-5">
              {plan.title}
            </h1>
            {/* description */}
            <p className="font-dm-mono font-normal text-[14px] leading-[150%] tracking-[-4%]  text-[#301C1B] mt-5">
              <span className="font-medium">Best For: </span> {plan.description}
            </p>
            {/* price */}

            <div
              className="flex justify-between border border-x-0 py-5 mt-5 px-2 border-primary bg-[radial-gradient(circle,rgba(249,115,22,0.15)_1px,transparent_1px)]
         bg-size-[6px_6px]
         sm:bg-size-[8px_8px]
         lg:bg-size-[10px_10px]"
            >
              <h5 className="font-dm-mono font-medium text-[14px] leading-[150%] tracking-[-4%]">
                Starting From:
              </h5>
              <h5 className="font-commissioner font-semibold text-[24px] leading-[110%] tracking-[-4%] uppercase text-primary">
                {plan.price}
              </h5>
            </div>
            {/* Featcher */}
            <div className="mt-5 space-y-3">
              {plan.features.map((item: any) => (
                <div className="flex gap-2 items-center my-3">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <path
                        d="M8 12.5L10.8 15.3L16.5 9.7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-dm-mono font-normal text-[14px] leading-[150%] tracking-[-4%]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {/* Border */}
            <div className="border my-10 border-black/20"></div>

            {/* testimonial */}
            <div>
              <div className="flex flex-col ">
                {/* Quote */}
                <div className="mb-5 size-5 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2 13V21H10V13H6.5C6.5 10.8 7.8 8.8 10 7.5L8.8 5.5C5.2 7.3 2 10.5 2 15V13ZM14 13V21H22V13H18.5C18.5 10.8 19.8 8.8 22 7.5L20.8 5.5C17.2 7.3 14 10.5 14 15V13Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* description  */}
                <p
                  className="max-w-190
                       font-dm-mono
                       font-normal
                       text-[14px]
                       leading-[150%]
                       tracking-[-4%]
                       "
                >
                  {plan.testimonial.quote}
                </p>

                {/*  Bottom  */}
                <div className="mt-auto pt-5">
                  <div className="mt-6 flex items-center justify-around gap-10">
                    <div className="flex items-center gap-2">
                      <img
                        src={plan.testimonial.image}
                        alt={plan.testimonial.author}
                        className="h-8 w-8 object-cover"
                      />
                      <h4
                        className="font-dm-mono
                               text-[14px]
                               leading-[150%]
                               tracking-[-4%]
                               font-medium
                               "
                      >
                        {plan.testimonial.author}
                      </h4>
                    </div>
                    <p
                      className="mt-1
                               font-dm-mono
                               text-[14px]
                               leading-[150%]
                               tracking-[-4%]
                               font-normal
                               "
                    >
                      {plan.testimonial.designation}
                    </p>
                  </div>
                </div>
                <div className="border my-5 border-black/20"></div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className=" mt-auto pt-8">
            <button className=" bg-primary py-3 px-2 w-full flex  justify-center items-center gap-2">
              <h1 className="text-white font-commissioner font-normal text-[14px] leading-[150%] tracking-[-4%] ">
                Choose plan
              </h1>
              <div className="size-6 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
