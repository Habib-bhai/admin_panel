import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2025-01-18",
  token: process.env.SANITY_TOKEN,
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()

  try {
    const result = await client.patch(params.id).set(body).commit()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await client.delete(params.id)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

