<script>
    import { Inputs } from "../../../lib/components";
    import { invalidateAll } from "$app/navigation";
    export let product;
    const generatePhotos = () => {
        const titles = [
            "De frente",
            "De Atras",
            "Del costado derecho",
            "Del costado Izquierdo",
        ];
        return titles.map((title, index) => {
            return {
                value: {
                    type: "file",
                    accept: "image/png, image/gif, image/jpeg",
                    url: "/imgs/img.svg",
                    title,
                    value: [],
                    onChange: async (e) => {
                        const photo = product.photos[index];
                        const file = e.target.files[0];
                        const extension = file.name.split(".").pop();
                        photo.ref = `/products/${product.id}/${index}.${extension}`;
                        const formData = new FormData();
                        formData.append("ref", photo.ref);
                        formData.append("file", file);
                        const response = await fetch("/uploadPhoto", {
                            method: "post",
                            body: formData,
                        });
                        photo.url = await response.json();
                        photo.order = index;
                        photo.product_id = product.id;
                        await photo.save();
                        await invalidateAll();
                    },
                },
            };
        });
    };
    const form = { photos: generatePhotos() };
</script>

<section class="grid" style="gap: 2rem">
    <div class="grid auto-fill" style="gap: 0.5rem; --size: 200px">
        <Inputs object={product} {form} />
    </div>
</section>
