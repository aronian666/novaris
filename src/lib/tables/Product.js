import ActiveRecord from "./ActiveRecord";
import Photo from "./Photo"
export default class Product extends ActiveRecord {
    constructor({ photos = [], ...product } = {}) {
        super(product)
        this.photos = Array(6).fill(0).map((_, index) => {
            const photo = photos.find(photo => photo.order === index)
            if (photo) return new Photo(photo)
            return new Photo()
        })
    }
    static table = "products"
    static searchProperties = ["name"]
    static permit = ["details"]
}

