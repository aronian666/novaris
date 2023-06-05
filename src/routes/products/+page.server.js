import { Product } from "../../lib/tables"

export const load = async () => {
    console.log("Estoy pidiendo datos")
    return { products: Product.all("*, category:category_id(*)") }
}