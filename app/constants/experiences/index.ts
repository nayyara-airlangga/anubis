import { Experience } from "@models"

import LaravelIcon from "@icons/tech/laravel.svg"
import NextDotJsIcon from "@icons/tech/nextdotjs.svg"
import PHPIcon from "@icons/tech/php.svg"
import TailwindCSSIcon from "@icons/tech/tailwindcss.svg"
import TypeScriptIcon from "@icons/tech/typescript.svg"

const Experiences: Experience[] = [
  {
    organization: "Furaha Systems",
    techStack: [
      NextDotJsIcon,
      TailwindCSSIcon,
      LaravelIcon,
      TypeScriptIcon,
      PHPIcon,
    ],
    description:
      "Furaha Systems if a startup team based in Indonesia that provides effective digital solutions for the community.",
    duration: "Nov 2021 - Present",
    position: "Vice President of Engineering",
    pointers: [],
  },
]

export { Experiences }
