import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Order } from "@/types/order"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (order: Omit<Order, "_id">) => void
}

export default function CreateOrderModal({ isOpen, onClose, onSubmit }: CreateOrderModalProps) {
  const [newOrder, setNewOrder] = useState<Omit<Order, "_id">>({
    customer: { _ref: "", name: "" },
    products: [],
    status: "pending",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    total: 0,
    isPaid: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newOrder)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={newOrder.customer.name}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customer: { ...newOrder.customer, name: e.target.value } })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newOrder.city}
                    onChange={(e) => setNewOrder({ ...newOrder, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newOrder.state}
                    onChange={(e) => setNewOrder({ ...newOrder, state: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={newOrder.postalCode}
                    onChange={(e) => setNewOrder({ ...newOrder, postalCode: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newOrder.country}
                    onChange={(e) => setNewOrder({ ...newOrder, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newOrder.status} onValueChange={(value: "pending" | "shipped" | "delivered" | "returned") => setNewOrder({ ...newOrder, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="number"
                  value={newOrder.total}
                  onChange={(e) => setNewOrder({ ...newOrder, total: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPaid"
                  checked={newOrder.isPaid}
                  onCheckedChange={(checked) => setNewOrder({ ...newOrder, isPaid: checked })}
                />
                <Label htmlFor="isPaid">Is Paid</Label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-[#106a2e] hover:bg-[#0c5023]">
            Create Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

