import { Experience } from "@models"

import JavaScriptIcon from "@icons/tech/javascript.svg"
import LaravelIcon from "@icons/tech/laravel.svg"
import NextDotJsIcon from "@icons/tech/nextdotjs.svg"
import PHPIcon from "@icons/tech/php.svg"
import StrapiIcon from "@icons/tech/strapi.svg"
import TailwindCSSIcon from "@icons/tech/tailwindcss.svg"
import TypeScriptIcon from "@icons/tech/typescript.svg"

const Experiences: Experience[] = [
  {
    organization: "Snippo D-IBT",
    techStack: [
      NextDotJsIcon,
      TailwindCSSIcon,
      LaravelIcon,
      TypeScriptIcon,
      PHPIcon,
    ],
    description:
      "Snippo D-IBT is an online test platform geared towards educational and competitional organizations",
    duration: "Nov 2021 - Present",
    position: "Head of Engineering",
    pointers: [
      "Designed the workflow of the development process",
      "Reviewed and managed the work of fellow engineers",
      "Implemented role based authentication using Laravel Gates and Middleware",
      "Implemented auth page with Next.js",
    ],
  },
  {
    organization: "EDUCARE 2022",
    techStack: [
      NextDotJsIcon,
      TailwindCSSIcon,
      StrapiIcon,
      TypeScriptIcon,
      JavaScriptIcon,
    ],
    description:
      "EDUCARE is an event held by the University of Indonesia's Faculty of Computer Science. It's purpose is to help students in determining their career choices and provide education on post-graduation life.",
    duration: "Nov 2021 - Feb 2022",
    position: "IT Development Engineer",
    pointers: [
      "Developed Landing and CV Review features using Next.js and Strapi",
    ],
    siteUrl: "https://educare.cs.ui.ac.id",
  },
]

export { Experiences }
