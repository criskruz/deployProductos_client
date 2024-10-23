import { object, string, number, boolean, Output, array } from 'valibot'

export const DrafProductoSchema = object({
    name: string(),
    price: number()
})

export const ProductoSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductoSchema)

export type Producto = Output<typeof ProductoSchema>

