import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import { Body, Button, InputField } from "@components"
import { LoadStatus } from "@constants"

const PostCreate = () => {
  const [postData, setPostData] = useState({
    title: "",
    headline: "",
    content: "",
  })

  const router = useRouter()

  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.SUCCESS)

  const postDataChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value

    setPostData({ ...postData, [event.target.name]: value })
  }

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoadStatus(LoadStatus.LOADING)

    try {
      const { data } = await axios.post("/api/posts/create", postData)

      if (data.status === "success") {
        setLoadStatus(LoadStatus.SUCCESS)
        const slug = data.post.slug
        router.push("/posts/" + slug)
      }
    } catch (error: any) {
      console.log(error.response.data.message)
      setLoadStatus(LoadStatus.ERROR)

      if (error.status == 401) {
        router.push("/auth")
      }
    }
  }

  return (
    <form onSubmit={createPost} className="tablet:mt-8 mt-4">
      <InputField
        type="text"
        name="title"
        label="Title"
        errorMessage="This is a required field"
        value={postData.title}
        onChange={postDataChangeHandler}
        required
      />
      <InputField
        type="textarea"
        rows={6}
        name="headline"
        label="Headline"
        errorMessage="This is a required field"
        value={postData.headline}
        onChange={postDataChangeHandler}
        required
      />
      <InputField
        type="textarea"
        rows={14}
        name="content"
        label="Content"
        errorMessage="This is a required field"
        value={postData.content}
        onChange={postDataChangeHandler}
        required
      />
      <Button
        type="submit"
        className={loadStatus === "LOADING" ? "animate-pulse" : ""}
        isDisabled={
          postData.title.trim().length < 1 ||
          postData.headline.trim().length < 1 ||
          postData.content.trim().length < 1
        }
      >
        <Body variant="b3">
          {loadStatus === "LOADING" ? "Loading..." : "Create Post"}
        </Body>
      </Button>
    </form>
  )
}

export { PostCreate }
