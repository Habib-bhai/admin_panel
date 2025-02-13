import { Suspense } from "react"
import OrderList from "@/components/Order/OrderList"
import OrderListSkeleton from "@/components/Order/OrderListSkeleton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders | Admin Dashboard",
  description: "Manage your orders",
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Orders</h1>
      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList />
      </Suspense>
    </div>
  )
}

