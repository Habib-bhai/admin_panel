import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

//  eslint-disable-next-line
const ProductDetails = ({ product }:any) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Image
          src={product.image}
          alt={product.name}
          className="h-48 w-48 rounded-lg object-cover"
          height={150}
          width={150}
        />
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-lg text-muted-foreground">
              ${product.price}
            </p>
          </div>
          <div className="flex gap-2">
            {product.new && (
              <Badge variant="default">New</Badge>
            )}
            <Badge variant="secondary">{product.category}</Badge>
            {product.discountPercent > 0 && (
              <Badge variant="destructive">
                {product.discountPercent}% OFF
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Description</h4>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold">Stock Information</h4>
            <p className="text-muted-foreground">{product.stock} units available</p>
          </div>

          <div>
            <h4 className="font-semibold">Available Colors</h4>
            <div className="flex gap-2 mt-1">
            {/* eslint-disable-next-line */}
              {product.colors.map((color:any) => (
                <Badge key={color} variant="outline">
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Available Sizes</h4>
            <div className="flex gap-2 mt-1">
            {/* eslint-disable-next-line */}
              {product.sizes.map((size:any) => (
                <Badge key={size} variant="outline">
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Tags</h4>
            <div className="flex flex-wrap gap-2 mt-1">
            {/* eslint-disable-next-line */}
              {product.tags.map((tag:any) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Reviews</h4>
            <p className="text-muted-foreground">{product.reviews} customer reviews</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetails