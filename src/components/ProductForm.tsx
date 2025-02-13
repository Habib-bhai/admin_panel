import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// eslint-disable-next-line
const ProductForm = ({ product, onSubmit }:any) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      price: "",
      description: "",
      category: "",
      discountPercent: "",
      new: false,
      colors: [],
      sizes: [],
      tags: [],
      stock: "",
    }
  )

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tshirt">T-Shirt</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="jeans">Jeans</SelectItem>
              <SelectItem value="hoodie">Hoodie</SelectItem>
              <SelectItem value="shirt">Shirt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPercent">Discount Percentage</Label>
          <Input
            id="discountPercent"
            type="number"
            value={formData.discountPercent}
            onChange={(e) =>
              setFormData({ ...formData, discountPercent: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="colors">Colors (comma-separated)</Label>
          <Input
            id="colors"
            value={formData.colors.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sizes">Sizes (comma-separated)</Label>
          <Input
            id="sizes"
            value={formData.sizes.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="new"
            checked={formData.new}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, new: checked })
            }
          />
          <Label htmlFor="new">Mark as New</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <Input id="image" type="file" accept="image/*" />
      </div>

      <Button type="submit" className="w-full">
        {product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  )
}

export default ProductForm