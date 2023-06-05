<script>
    import { Inputs } from "../../../lib/components";
    import { page } from "$app/stores";
    export let product;
    const form = {
        name: { title: "Nombre del producto", required: true },
        brand: { title: "Marca", required: true },
        category_id: {
            title: "Categoria",
            options: $page.data.categories,
            blank: " ",
            required: true,
            option: ["id", "name"],
            type: "select",
        },
        count: { title: "Cantidad", required: true, type: "number", min: "0" },
        price: {
            title: "Precio",
            required: true,
            type: "number",
            min: "0",
            step: "0.1",
        },
    };
</script>

<section class="grid" style="gap: 1rem">
    <h2>Detalles generales</h2>
    <Inputs bind:object={product} {form} />
</section>
