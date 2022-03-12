import axios from "axios"

const DevUpdatePage = () => {
  return (
    <button
      onClick={async () => {
        await axios.put("/api/posts/anjay-mabar", {
          title: "Mabar Anjay",
          content: "Widih dah diupdate",
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Update
    </button>
  )
}

export default DevUpdatePage
