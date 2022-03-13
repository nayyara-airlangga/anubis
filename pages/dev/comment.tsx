import axios from "axios"

const CommentPage = () => {
  return (
    <button
      onClick={async () => {
        await axios.post("/api/posts/anjay-mabar/comments/create", {
          comment: "Another cool post bro",
          parentId: 1,
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Comment
    </button>
  )
}

export default CommentPage
