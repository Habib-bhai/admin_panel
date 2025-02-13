import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2021-08-31",
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const pageSize = 10

  let query = `*[_type == "orders"`

  if (search) {
    query += ` && customer->name match "*${search}*"`
  }

  if (status) {
    query += ` && status == "${status}"`
  }

  query += `] | order(_createdAt desc) {
    _id,
    _createdAt,
    customer->{_id, name},
    products[]{
      product->{_id, name},
      quantity,
      size
    },
    status,
    address,
    city,
    state,
    postalCode,
    country,
    total,
    isPaid
  }`

  try {
    const totalCount = await client.fetch(`count(${query})`)
    const orders = await client.fetch(`${query}[${(page - 1) * pageSize}...${page * pageSize}]`)

    return NextResponse.json({
      orders,
      totalPages: Math.ceil(totalCount / pageSize),
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const result = await client.create({
      _type: "orders",
      ...body,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

