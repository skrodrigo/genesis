import { headers } from "next/headers"
import { auth } from "./utils/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/landing")
  }

  return
}
