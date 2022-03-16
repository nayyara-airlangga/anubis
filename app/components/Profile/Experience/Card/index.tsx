import { Body, Heading } from "@components"
import { Experience } from "@models"

const ExperienceCard = ({
  siteUrl,
  organization,
  position,
  duration,
  description,
  pointers,
  techStack,
}: Experience) => {
  return (
    <div className="w-full p-4 dark:bg-neutral-600 my-6 rounded-lg">
      <div className="flex tablet:flex-row flex-col gap-2 items-center">
        <Heading
          variant="h6"
          size="text-[16px] tablet:text-[20px]"
          weight="bold"
          className="inline dark:text-white"
        >
          {organization}
        </Heading>
        <div className="flex flex-wrap gap-2 items-center">
          {techStack.map((Tech, index) => (
            <div className="inline-block" key={index}>
              <Tech className="w-5 h-5 dark:fill-white" />
            </div>
          ))}
        </div>
      </div>
      <Body
        variant="b4"
        size="text-[10px] tablet:text-[14px]"
        className="dark:text-white tablet:m-0 mt-4 tablet:text-left text-center"
      >
        {position} | {duration}
      </Body>
      <Body
        variant="b4"
        size="text-[12px] tablet:text-[16px]"
        className="mt-4 dark:text-white"
      >
        {description}
      </Body>
      <ul className="list-inside list-disc dark:text-white mt-1">
        {pointers.map((pointer, index) => (
          <li
            key={pointer + index}
            className="text-[10px] tablet:text-[14px] list-item"
          >
            <Body
              variant="b4"
              size="text-[10px] tablet:text-[14px]"
              className="inline"
            >
              {pointer}
            </Body>
          </li>
        ))}
      </ul>
      <Body
        variant="b4"
        size="text-[12px] tablet:text-[16px]"
        className="mt-4 dark:text-white group"
      >
        {siteUrl ? (
          <a
            href={siteUrl}
            className="duration-500 text-blue-500 group-hover:text-blue-400"
          >
            Link to Site
          </a>
        ) : (
          <i>Under development</i>
        )}
      </Body>
    </div>
  )
}

export { ExperienceCard }
