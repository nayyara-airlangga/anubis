import { useRouter } from "next/router"
import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"
import { useAuth } from "@hooks"

const ReplyForm = () => {
  const { user } = useAuth()

  const { reload, push } = useRouter()

  const [replyToComment, setReplyToComment] = useState(false)
  const [reply, setReply] = useState("")

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)

  const submitReply = async (event: React.FormEvent<HTMLFormElement>) => {}

  return !replyToComment ? (
    <Button
      onClick={() => setReplyToComment(true)}
      padding="pt-4"
      bgColor="bg-transparent"
      hoverBgColor="hover:bg-transparent"
      clickedBgColor="active:bg-transparent"
      className="mt-2 group"
    >
      <Body
        variant="b3"
        size="text-[14px] tablet:text-[16px]"
        className="text-blue-500 group-hover:text-blue-400 group-active:text-blue-300"
      >
        Reply
      </Body>
    </Button>
  ) : (
    <form onSubmit={submitReply}>
      <InputField
        padding="px-2"
        type="textarea"
        className="mt-4 tablet:text-[14px] text-[12px]"
        rows={3}
        name="comment"
        value={reply}
        onChange={(event) => setReply(event.target.value)}
      />
      {loadStatus === "ERROR" && (
        <Body
          variant="b3"
          size="text-[12px] tablet:text-[14px]"
          className="relative -mt-4 text-red-500"
        >
          An error occured
        </Body>
      )}
      <div className="flex justify-end items-center gap-4">
        <Button
          onClick={() => {
            setReplyToComment(false)
            setReply("")
          }}
          padding="py-2 px-2"
          bgColor="bg-transparent"
          hoverBgColor="hover:bg-transparent"
          clickedBgColor="active:bg-transparent"
          className="relative -mt-2 group"
        >
          <Body
            variant="b3"
            size="text-[12px] tablet:text-[14px]"
            className="text-red-500 group-hover:text-red-400 group-active:text-red-300"
          >
            Cancel
          </Body>
        </Button>
        <Button
          padding="px-2 py-2"
          className={`relative -mt-2 ${
            loadStatus === "LOADING" && "animate-pulse"
          }`}
          type={loadStatus === "LOADING" ? "button" : "submit"}
        >
          <Body variant="b3" size="text-[12px] tablet:text-[14px]">
            {loadStatus === "LOADING" ? "Loading..." : "Submit Reply"}
          </Body>
        </Button>
      </div>
    </form>
  )
}

export { ReplyForm }
