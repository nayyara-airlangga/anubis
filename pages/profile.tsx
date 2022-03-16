import Head from "next/head"

import { Heading, Body, ExperienceCard } from "@components"
import { Experiences } from "@constants"

const ProfilePage = () => {
  return (
    <div className="w-full relative my-8">
      <Head>
        <title>Angga | Profile</title>
      </Head>
      <Heading
        variant="h2"
        size="tablet:text-[36px] text-[32px]"
        weight="bold"
        className="dark:text-white"
      >
        Who am I?
      </Heading>
      <section id="biodata" className="w-full my-8">
        <Body variant="b3" className="dark:text-white mt-8 mb-4">
          My name&apos;s Nayyara Airlangga Raharjo and I&apos;m a first year
          undergraduate Computer Science student. Currently, I am interested in
          the world of web and software development. Lately, I also have a
          growing interest towards ML and AI. I&apos;ve tried my hands on some
          web technologies and I currently use Next.js and/or Laravel for the
          most part. However, I would like to try new technologies should the
          opportunity presents itself
        </Body>
        <Body variant="b3" className="dark:text-white mb-8 mt-4">
          The beginning of my compsci journey started around the end of the last
          year of high school for me. For the most part, I was just doing
          YouTube tutorials for simple games like Tic-Tac-Toe. I started to get
          into mobile development around May 2021 and advanced towards web and
          software development around late August. Since then, I&apos;ve created
          a few web and mobile applications and contributed to a few college
          event websites.
        </Body>
      </section>
      <section id="experience" className="w-full my-8">
        <Heading
          variant="h2"
          size="tablet:text-[36px] text-[32px]"
          weight="bold"
          className="dark:text-white mb-8"
        >
          Experience
        </Heading>
        {Experiences.map((experience, index) => (
          <ExperienceCard
            key={index + experience.description}
            {...experience}
          />
        ))}
      </section>
    </div>
  )
}

export default ProfilePage
