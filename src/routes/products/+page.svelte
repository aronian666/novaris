<script>
    import { Product } from "../../lib/tables";
    import { Table } from "../../lib/components";
    export let data;
    $: products = Product.toArray(data.products.data);
</script>

<div class="flex">
    <a class="button" href="/products/new">Agregar producto</a>
</div>
<section class="panel grid">
    <Table header={["Nombre", "Categoria"]} array={products} let:item={product}>
        <tr>
            <td>{product.name}</td>
            <td>{product.category.name}</td>
        </tr>
    </Table>
</section>
