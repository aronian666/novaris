import ActiveRecord from "./ActiveRecord"
export default class Category extends ActiveRecord {
    constructor(category) {
        super(category)
    }
    static table = "categories"
}