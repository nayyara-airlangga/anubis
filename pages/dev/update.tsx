import axios from "axios"

const DevUpdatePage = () => {
  return (
    <button
      onClick={async () => {
        await axios.put("/api/posts/anjay-mabar/update", {
          title: "Rerouted endpoint",
          content: "Widih dah ganti endpoint",
        })
      }}
      className="p-4 bg-neutral-200 text-[20px]"
    >
      Update
    </button>
  )
}

export default DevUpdatePage
