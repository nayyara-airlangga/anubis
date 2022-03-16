import { Project } from "@models"

import DartIcon from "@icons/tech/dart.svg"
import FlutterIcon from "@icons/tech/flutter.svg"
import NextDotJsIcon from "@icons/tech/nextdotjs.svg"
import PrismaIcon from "@icons/tech/prisma.svg"
import TailwindCSSIcon from "@icons/tech/tailwindcss.svg"
import TypeScriptIcon from "@icons/tech/typescript.svg"

const Projects: Project[] = [
  {
    name: "Snippets",
    description:
      "A social media platform for literally anything. Blogs, pictures/videos, threads, you name it.",
    techStack: [NextDotJsIcon, TailwindCSSIcon, PrismaIcon, TypeScriptIcon],
    repo: "https://github.com/nayyara-airlangga/snippets",
    siteUrl: "development",
  },
  {
    name: "CryptoHub",
    description:
      "A cryptocurrency mobile application which shows the stats, exchanges, news, and details of cryptocurrencies around the world.",
    techStack: [FlutterIcon, DartIcon],
    repo: "https://github.com/nayyara-airlangga/cryptohub",
  },
]

export { Projects }
