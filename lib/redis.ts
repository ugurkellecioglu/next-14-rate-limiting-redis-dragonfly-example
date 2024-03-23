import { createClient } from "redis"

const client = createClient()

client.on("error", (error) => {
  console.error(error)
})

if (!client.isOpen) {
  client.connect()
}

export default client
