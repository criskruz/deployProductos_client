import { safeParse } from "valibot"
import axios from 'axios'
import { DrafProductoSchema, ProductoSchema, ProductsSchema, Producto } from "../types"
import { toBoolean } from "../helpers"


type ProductoData = {
    [k: string]: FormDataEntryValue
}

export async function agregarProducto(data: ProductoData) {

    //Validamos si es la información que recibimos con valibot
    try {
        const result = safeParse(DrafProductoSchema, {
            name: data.name,
            price: +data.price
        })
        console.log(result.success)
        if (result.success) {

            // usamos axios para mandar los datos a la API
            const url = `${import.meta.env.VITE_API_URL}/productos/`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })


        } else {
            throw new Error('Datos invalidos')
        }
    } catch (error) {
        console.log(error)
    }

}

export async function obtenerProducto() {

    try {
        const url = `${import.meta.env.VITE_API_URL}/productos/`
        const { data } = await axios(url)
        console.log(data.data)
        const result = safeParse(ProductsSchema, data.data) // Utilizo el ProductsSchema por que lo convertimos a un array
        console.log(result.success)
        if (result.success) {

            return result.output
        } else {
           
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }

}

export async function obtenerProductoId(id: Producto['id']) {

    try {
        const url = `${import.meta.env.VITE_API_URL}/productos/${id}`
        const { data } = await axios(url)
        // console.log(data.data)
        const result = safeParse(ProductoSchema, data.data)


        if (result.success) {

            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }

}

export async function actualizarProducto(data: ProductoData, id: Producto['id']) {

    try {


        const result = safeParse(ProductoSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())//toBoolean
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/productos/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }

}

export async function borrarProducto(id: Producto['id']) {

    try {
        const url = `${import.meta.env.VITE_API_URL}/productos/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }

}

export async function actualizarDisponib(id: Producto['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/productos/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}