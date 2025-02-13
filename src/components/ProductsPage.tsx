"use client"
import { useState } from "react"
import { createClient } from "@sanity/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import ProductForm from "./ProductForm"
import ProductDetails from "./ProductDetails"
import { urlFor } from "@/sanity/lib/image"

const ProductsPage = ({ initialProducts }: any) => {
    const [products, setProducts] = useState(initialProducts)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const [sortBy, setSortBy] = useState("")

    const filteredProducts = products
        .filter((product: any) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (categoryFilter ? product.category === categoryFilter : true)
        )
        .sort((a: any, b: any) => {
            if (sortBy === "price-asc") return a.price - b.price
            if (sortBy === "price-desc") return b.price - a.price
            if (sortBy === "stock-asc") return a.stock - b.stock
            if (sortBy === "stock-desc") return b.stock - a.stock
            return 0
        })

    const handleCreate = async (newProduct: any) => {
        // Implementation for creating product in Sanity
        setIsCreateModalOpen(false)
    }

    const handleUpdate = async (updatedProduct: any) => {
        // Implementation for updating product in Sanity
        setIsEditModalOpen(false)
    }

    const handleDelete = async (productId: any) => {
        // Implementation for deleting product from Sanity
    }

    return (
        <div className="p-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Products</CardTitle>
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm onSubmit={handleCreate} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            // prefix={<Search className="h-4 w-4 text-gray-400" />}

                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="tshirt">T-Shirt</SelectItem>
                                <SelectItem value="short">Short</SelectItem>
                                <SelectItem value="jeans">Jeans</SelectItem>
                                <SelectItem value="hoodie">Hoodie</SelectItem>
                                <SelectItem value="shirt">Shirt</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
                                <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product: any) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <img
                                            src={urlFor(product.image).url()}
                                            alt={product.name}
                                            className="h-12 w-12 rounded-md object-cover"
                                        />
                                    </TableCell>
                                    <TableCell
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={() => {
                                            setSelectedProduct(product)
                                            setIsViewModalOpen(true)
                                        }}
                                    >
                                        {product.name}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={product.stock > 10 ? "default" : "destructive"}
                                        >
                                            {product.stock} in stock
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {product.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedProduct(product)
                                                    setIsEditModalOpen(true)
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* View Product Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Product Details</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && <ProductDetails product={selectedProduct} />}
                </DialogContent>
            </Dialog>

            {/* Edit Product Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                        <ProductForm
                            product={selectedProduct}
                            onSubmit={handleUpdate}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductsPage