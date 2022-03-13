import axios from "axios"

const CommUpdatePage = () => {
  return (
    <button
      onClick={async () => {
        await axios.put("/api/posts/anjay-mabar/comments/1", {
          comment: "Updated again",
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Comment Update
    </button>
  )
}

export default CommUpdatePage
