import React, { useRef } from "react";
import me from "../assets/img/hemang3.png";
import { aboutMeData } from "../assets/lib/data";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, useTransform } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSectionInView } from "../assets/lib/hooks";
import { useLanguage } from "../context/language-context";

const AboutMe: React.FC = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const { ref } = useSectionInView("About me");
  const { language } = useLanguage();
  const animationReference = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: animationReference,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  const paragraphs =
    language === "DE" ? aboutMeData.paragraphs_DE : aboutMeData.paragraphs_EN;

  return (
    <React.Fragment>
      <section className="about-me relative mt-16 " id="about-me" ref={ref}>
        <div className="title-container flex flex-col gap-6 justify-center items-center p-32 w-1/2 max-lg:w-full max-lg:p-16 max-lg:items-start">
          <motion.div
            ref={animationReference}
            style={{
              scale: scaleProgess,
              opacity: opacityProgess,
              textAlign: "left",
            }}
          >
            <p className="text-[--black] mb-6">
              <span className="text-orange">&lt;</span>
              {language === "DE" ? aboutMeData.title : aboutMeData.title_EN}
              <span className="text-orange">/&gt;</span>
            </p>

            <h2 className="text-[--black] text-center max-lg:text-left break-words">
              {language === "DE"
                ? aboutMeData.description
                : aboutMeData.description_EN}
            </h2>
          </motion.div>
        </div>
        <div className="flex flex-row justify-center gap-6 items-center pl-32 pr-32 mb-16  max-lg:flex-col max-lg:p-16 min-[1921px]:px-[45rem] min-[1921px]:mb-48">
          <article className="pl-60 max-lg:p-0">
            {/* Animated coding laptop SVG placeholder */}
            <div className="flex items-center justify-center w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-white/60 rounded-2xl shadow-lg relative overflow-hidden animate-pulse group">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="30" width="90" height="50" rx="8" fill="#13183F"/>
                <rect x="25" y="42" width="70" height="26" rx="3" fill="#272F56"/>
                <rect x="30" y="48" width="60" height="6" rx="2" fill="#5B71EB"/>
                <rect x="30" y="58" width="40" height="4" rx="2" fill="#9DAAF2"/>
                <rect x="30" y="64" width="32" height="3" rx="1.5" fill="#D1D5DB"/>
                <rect x="0" y="80" width="120" height="10" rx="5" fill="#F3F4F6"/>
                <rect x="20" y="90" width="80" height="8" rx="3" fill="#EAB308" className="animate-pulse"/>
                <rect x="40" y="100" width="40" height="5" rx="2.5" fill="#FB7185" />
              </svg>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full bg-gradient-to-r from-[rgba(91,113,235,0.3)] via-[rgba(234,179,8,0.2)] to-[rgba(251,113,133,0.3)] blur-md opacity-60 animate-bounce"></div>
            </div>
          </article>
          <Swiper
            spaceBetween={100}
            centeredSlides={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="w-full md:w-1/2 pt-24 md:pt-32 relative z-2 pr-0 md:pr-20 pb-16 md:pb-32 pl-0 md:pl-20 max-lg:w-full max-lg:pt-8 max-lg:pb-8 max-lg:pl-0 max-lg:pr-0 min-[1921px]:w-1/2"
          >
            {paragraphs.map((paragraph, index) => (
              <SwiperSlide
                className="bg-white/50 backdrop-blur-md shadow-2xl hover:shadow-orange-300/40 text-[--black] flex flex-col justify-center items-start gap-16 rounded-3xl p-14 md:p-20 transition-all duration-300 text-left max-lg:p-8 cursor-pointer hover:scale-105 hover:bg-white/70 hover:backdrop-blur-lg hover:ring-2 hover:ring-orange-300/70 hover:z-20"
                key={index}
              >
                <div className="flex gap-4 lg:gap-6 flex-row justify-start items-center max-lg:flex-col max-lg:justify-center max-lg:text-center ">
                  <div>
                    <img
                      src={paragraph.icon}
                      alt={paragraph.icon}
                      className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-xl border-4 border-white/70 group-hover:border-orange-300/60 transition-all duration-300 bg-white/80 backdrop-blur-md object-cover"
                    />
                  </div>
                  <div>
                    <h2>{paragraph.title}</h2>
                  </div>
                </div>
                <div className="flex flex-row gap-8 max-lg:flex-col">
                  <div className="flex flex-col gap-4 items-center justify-between -mt-10 -mb-10 max-lg:flex-row max-lg:m-0">
                    <p className="text-white">
                      <span className="text-orange">&lt;</span>h3
                      <span className="text-orange">/&gt;</span>
                    </p>
                    <div className="flex justify-between items-center w-1 h-[100%] max-lg:flex-row max-lg:w-[10rem]  max-lg:bg-lightblue">
                      <div></div>
                      <div className="w-[0.5rem] bg-[--lightblue] h-[100%] max-lg:w-10  max-lg:bg-lightblue max-lg:h-[0.25rem]"></div>
                      <div></div>
                    </div>
                    <p className="text-white">
                      <span className="text-orange">&lt;</span>h3
                      <span className="text-orange">/&gt;</span>
                    </p>
                  </div>
                  <div>
                <p className="text-black/80 text-xl md:text-2xl font-light leading-relaxed transition-colors duration-300 group-hover:text-black">
                  {paragraph.description}
                </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div
              className="autoplay-progress absolute right-0 bottom-0 z-10 flex items-center justify-center font-bold text-orange text-4xl w-24 h-24 max-lg:w-16 max-lg:h-16 max-lg:text-3xl "
              slot="container-end"
            >
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutMe;
