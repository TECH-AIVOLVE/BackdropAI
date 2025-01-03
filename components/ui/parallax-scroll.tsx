"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[] | StaticImageData[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll();

  // Parallax scroll transforms
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]); // Reduced translation
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]); // Reduced translation

  const third = Math.ceil(images.length / 3);

  // Split the images into three parts
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={cn("h-full items-start overflow-y-auto w-full", className)} ref={gridRef}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-10 pt-20 px-4"
        ref={gridRef}
      >
        {/* First Column */}
        <div className="grid gap-6">
          {firstPart.map((el, idx) => (
            <motion.div
              key={"grid-1-" + idx}
              style={{ y: translateFirst }} // Apply parallax effect to each image
            >
              <Image
                src={el}
                className="w-full object-cover object-top rounded-lg border-white md:border-0 border"
                width={300} // Responsive width
                height={400} // Responsive height
                alt="thumbnail"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        {/* Second Column */}
        <div className="grid gap-6">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2-" + idx}>
              <Image
                src={el}
                className="w-full object-cover object-top rounded-lg border-white md:border-0 border"
                width={300}
                height={400}
                alt="thumbnail"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        <br className="block sm:hidden" />
        {/* Third Column */}
        <div className="grid gap-6">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3-" + idx}>
              <Image
                src={el}
                className="w-full object-cover object-top rounded-lg border-white md:border-0 border"
                width={300}
                height={300}
                alt="thumbnail"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
