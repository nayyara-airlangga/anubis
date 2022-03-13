import axios from "axios"

const DevCreatePage = () => {
  return (
    <button
      onClick={async () => {
        await axios.post("/api/posts/create", {
          title: "Anjay Mabar",
          content: "Keren juga nih blog",
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Create
    </button>
  )
}

export default DevCreatePage
