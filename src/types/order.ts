export interface Order {
    _id: string
    _createdAt?: string
    customer: {
     
      name: string,
      _ref: string
    }
    products: Array<{
      product: {
        _id: string
        name: string
      }
      quantity: number
      size: string
    }>
    status: "pending" | "shipped" | "delivered" | "returned"
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    total: number
    isPaid: boolean
  }
  
  