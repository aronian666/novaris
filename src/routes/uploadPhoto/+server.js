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
    return await getDownloadURL(response.ref)

}
const optimizeBuffer = (buffer) => imagemin.buffer(buffer, { plugins: [imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] })] });
const uploadPhoto = async (file, ref, size = 800) => {
    let arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const optimize = await optimizeBuffer(buffer)
    const resize = await sharp(optimize).resize(size, size).toBuffer()
    arrayBuffer = resize.buffer.slice(resize.byteOffset, resize.byteOffset + resize.byteLength)
    return await upload(arrayBuffer, ref, { contentType: file.type })
}

export const POST = async ({ request }) => {
    const { file, ref, size } = formToJson(await request.formData())
    const url = await uploadPhoto(file, ref, size)
    return new Response(JSON.stringify(url), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}