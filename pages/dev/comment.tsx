import axios from "axios"

const CommentPage = () => {
  return (
    <button
      onClick={async () => {
        await axios.post("/api/posts/anjay-mabar/comments/create", {
          comment: "Cool post bro",
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Comment
    </button>
  )
}

export default CommentPage
