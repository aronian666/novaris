import { formToJson } from "../../lib/utils";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import sharp from "sharp";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const upload = async (file, path, metadata) => {
    const fileRef = ref(storage, path)
    const response = await uploadBytes(fileRef, file, metadata)
    const url = await getDownloadURL(response.ref)
    return url
}
const optimizeBuffer = (buffer) => imagemin.buffer(buffer, { plugins: [imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] })] });
const uploadPhotos = async (files = [], ref) => {
    const urls = files.map(async (file, i) => {
        if (file.size === 0) return []
        const arrayBuffer = await file.arrayBuffer()
        const extesion = file.name.split(".").pop()
        const buffer = Buffer.from(arrayBuffer)
        const optimize = await optimizeBuffer(buffer)
        let resizes = [sharp(optimize).resize(800, 800).toBuffer()]
        if (i === 0) resizes.push(sharp(optimize).resize(400, 400).toBuffer())
        resizes = await Promise.all(resizes)
        const urls = await Promise.all(resizes.map((resize, j) => {
            const arrayBuffer = resize.buffer.slice(resize.byteOffset, resize.byteOffset + resize.byteLength)
            return upload(arrayBuffer, `${ref}/${i}_${j}.${extesion}`, { contentType: file.type })
        }))
        return urls
    })
    return await Promise.all(urls)
}
export const POST = async ({ request }) => {
    const formData = await request.formData()
    const { photos, ref } = formToJson(formData)
    const urls = await uploadPhotos(photos, ref)
    return response = new Response(JSON.stringify(urls), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}