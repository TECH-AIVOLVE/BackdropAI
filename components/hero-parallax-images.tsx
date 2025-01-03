"use client";

import { ParallaxScroll } from "./ui/parallax-scroll";

import life from '@/public/11.png' 
import legacy from '@/public/6.png'
import wow from '@/public/3.png'
import goat from '@/public/5.png'
import smoke from '@/public/13.png'
import coffee from '@/public/9.png'
import nature from '@/public/7.png'
import love from '@/public/10.png'
import Lucknow from '@/public/12.png'

export function HeroParallaxImages() {
  return <ParallaxScroll images={images} className="w-full"/>;
}

const images = [
  goat, life, legacy, Lucknow,  smoke,love
];
