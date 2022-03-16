import { Body, Heading } from "@components"
import { Project } from "@models"

const ProjectCard = ({
  name,
  description,
  techStack,
  repo,
  siteUrl,
}: Project) => {
  return (
    <div className="w-full p-4 dark:bg-neutral-600 my-6 rounded-lg">
      <div className="flex tablet:flex-row flex-col gap-2 items-center">
        <Heading
          variant="h6"
          size="text-[16px] tablet:text-[20px]"
          weight="bold"
          className="inline dark:text-white"
        >
          {name}
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
        size="text-[12px] tablet:text-[16px]"
        className="mt-4 dark:text-white"
      >
        {description}
      </Body>
      <div className="flex gap-4">
        {siteUrl && (
          <Body
            variant="b4"
            size="text-[12px] tablet:text-[16px]"
            className="mt-4 dark:text-white"
          >
            {siteUrl !== "development" ? (
              <a href={siteUrl} className="text-blue-500 hover:text-blue-400">
                Link to Site
              </a>
            ) : (
              <i>Under development</i>
            )}
          </Body>
        )}
        <Body
          variant="b4"
          size="text-[12px] tablet:text-[16px]"
          className="mt-4 text-blue-500 hover:text-blue-400"
        >
          <a href={repo}>Repo</a>
        </Body>
      </div>
    </div>
  )
}

export { ProjectCard }
