import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
interface Props {
  heroImage: string;
  title: string;
  description: string;
  industry: string;
  tags: string[];
}
const LatestWorkCard = ({
  heroImage,
  title,
  description,
  industry,
  tags,
}: Props) => {
  useEffect(() => {
     const ctx = gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);
     document.querySelectorAll(".portfolio-card").forEach((card) => {
       const image = card.querySelector(".card-image");

       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: card,
           start: "top 80%",
           toggleActions: "play none none reverse",
         },
       });

       tl.from(card, {
         y: 100,
         opacity: 0,
         duration: 1,
         ease: "expo.out",
       })

         .from(
           image,
           {
             clipPath: "inset(0 0 100% 0)",
             scale: 1.1,
             filter: "blur(12px)",
             duration: 1.8,
             ease: "expo.out",
           },
           "-=0.8",
         )

         .from(
           card.querySelector(".card-title"),
           {
             y: 40,
             opacity: 0,
             duration: 0.8,
             ease: "power3.out",
           },
           "-=1.1",
         )

         .from(
           card.querySelectorAll(".card-tag"),
           {
             y: 15,
             scale: 0.8,
             opacity: 0,
             stagger: 0.05,
             duration: 0.5,
             ease: "back.out(2)",
           },
           "-=0.5",
         )

         .from(
           [
             card.querySelector(".card-description"),
             card.querySelector(".card-industry"),
           ],
           {
             y: 20,
             opacity: 0,
             stagger: 0.08,
             duration: 0.7,
             ease: "power3.out",
           },
           "-=0.3",
         );

       // Hover
       card.addEventListener("mouseenter", () => {
         gsap.to(image, {
           scale: 1.08,
           duration: 0.8,
           ease: "power3.out",
         });
       });

       card.addEventListener("mouseleave", () => {
         gsap.to(image, {
           scale: 1,
           duration: 0.8,
           ease: "power3.out",
         });
       });
     });
  });
   
     ScrollTrigger.refresh();
      return () => {
        ctx.revert();
      };
  }, []);
  return (
    <div className="portfolio-card overflow-hidden">
      {/* <!-- Hero --> */}
      <div className="relative h-50 sm:h-87.5 lg:h-113.25">
        <img
          src={heroImage}
          alt={title}
          className="card-image absolute inset-0 w-full h-113.25  object-cover"
        />
      </div>

      {/* <!-- Content --> */}
      <div className="relative bg-[#221617] h-49 ">
        {/* <!-- Dot Pattern --> */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ED7743 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        ></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-2 lg:gap-27">
          {/* <!-- Left --> */}
          <div className="card-title pt-8 pr-8 md:pr-0 pl-8">
            <h3
              className="font-commissioner font-semibold
          text-xl leading-[110%] tracking-[-4%]
          text-white"
            >
              {title}
            </h3>

            <div className="flex flex-wrap gap-3 mt-5">
              {tags.map((tag: any) => (
                <span
                  className="card-tag font-dm-mono font-normal text-[12px] leading-[150%] tracking-[-4%]  px-4 py-1 border border-[#4A3737]
                rounded-full text-sm text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* <!-- Right --> */}
          <div className="my-8 ml-8 md:ml-0 mr-8 md:mr-1">
            <p
              className="card-description font-dm-mono text-white font-normal
          text-sm leading-[150%] tracking-[-4%] mb-8"
            >
              {description}
            </p>

            <p
              className="card-industry mt-8 font-dm-mono font-normal
          text-sm leading-[150%] tracking-[-4%] text-white"
            >
              Industry:{" "}
              <span
                className="text-[#ED7743] font-dm-mono font-medium
          text-sm leading-[150%] tracking-[-4%]"
              >
                {industry}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LatestWorkCard;
