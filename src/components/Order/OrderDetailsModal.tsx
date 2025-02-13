import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Order } from "@/types/order"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, Truck, CreditCard } from "lucide-react"

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Information</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-sm text-muted-foreground">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{new Date(order._createdAt as string).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-sm text-muted-foreground">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Information</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p className="text-sm font-medium">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.address}</p>
                <p className="text-sm text-muted-foreground">
                  {order.city}, {order.state} {order.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">{order.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Items</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {order.products.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item.product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Qty: {item.quantity}, Size: {item.size}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipping Information</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p className="text-sm">
                  <strong>Carrier:</strong> Sample Carrier
                </p>
                <p className="text-sm">
                  <strong>Tracking Number:</strong> SAMPLE1234567890
                </p>
                <p className="text-sm">
                  <strong>Estimated Delivery:</strong> 3-5 business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "pending":
      return "outline"
    case "shipped":
      return "secondary"
    case "delivered":
      return "default"
    case "returned":
      return "destructive"
    default:
      return "default"
  }
}

