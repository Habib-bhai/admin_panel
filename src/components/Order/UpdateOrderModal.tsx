"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Order } from "@/types/order"

interface UpdateOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (order: Order) => void
  order: Order
}

export default function UpdateOrderModal({ isOpen, onClose, onSubmit, order }: UpdateOrderModalProps) {
  const [updatedOrder, setUpdatedOrder] = useState<Order>(order)

  useEffect(() => {
    setUpdatedOrder(order)
  }, [order])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(updatedOrder)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={updatedOrder.customer.name}
              onChange={(e) =>
                setUpdatedOrder({ ...updatedOrder, customer: { ...updatedOrder.customer, name: e.target.value } })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={updatedOrder.status}
              onValueChange={(value: "pending" | "shipped" | "delivered" | "returned") => setUpdatedOrder({ ...updatedOrder, status: value })}
            >
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
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={updatedOrder.address}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, address: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={updatedOrder.city}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, city: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={updatedOrder.state}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, state: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={updatedOrder.postalCode}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, postalCode: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={updatedOrder.country}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, country: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="total">Total</Label>
            <Input
              id="total"
              type="number"
              value={updatedOrder.total}
              onChange={(e) => setUpdatedOrder({ ...updatedOrder, total: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPaid"
              checked={updatedOrder.isPaid}
              onCheckedChange={(checked) => setUpdatedOrder({ ...updatedOrder, isPaid: checked })}
            />
            <Label htmlFor="isPaid">Is Paid</Label>
          </div>
          <Button type="submit">Update Order</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

