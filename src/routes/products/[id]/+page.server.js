import { Product } from "../../../lib/tables"
export const load = async ({ params }) => {
    const product = await Product.find({ id: params.id }, "*, category:category_id(*), photos(*)").model()
    return { product }
}