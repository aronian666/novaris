<script>
    import { Inputs } from "../../../lib/components";
    export let product;
    const form = {
        details: {
            type: "array",
            value: [],
            helper: "textarea",
            title: "Detalles",
        },
    };
</script>

<section class="grid" style="gap: 1rem">
    <h2>Detalles extras</h2>
    <Inputs bind:object={product} {form} />
</section>
