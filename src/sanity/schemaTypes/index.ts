import { type SchemaTypeDefinition } from 'sanity'
import products from "./product"
import { User } from './user'
import { orders } from './orders'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, User, orders],
}
