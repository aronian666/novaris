<script>
    import { Product } from "../../../lib/tables";
    import Photos from "./Photos.svelte";
    export let data;
    $: product = new Product(data.product);
    $: console.log(product);
</script>

<section class="panel">
    <h1>{product.name}</h1>
    <p>Cantidad</p>
    <p>{product.count}</p>
    <p>Precio</p>
    <p>{product.price}</p>
</section>

<section class="panel">
    <h2>Fotos</h2>
    <Photos {product} />
</section>
