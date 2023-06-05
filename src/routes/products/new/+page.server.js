import { Category } from "../../../lib/tables"
export const load = async () => {
    const { data: categories } = await Category.all()
    return { categories }
}

