import ActiveRecord from "./ActiveRecord";

export default class Photo extends ActiveRecord {
    constructor(photo) {
        super(photo)
    }
    static table = "photos"
}