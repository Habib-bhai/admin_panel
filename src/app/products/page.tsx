import ProductsPage from '@/components/ProductsPage'
import { client } from '@/lib/sanity'
import React from 'react'

async function ProductsMainPage() {
    const products = await client.fetch('*[_type == "products"]')

    return <ProductsPage initialProducts={products} />
}

export default ProductsMainPage