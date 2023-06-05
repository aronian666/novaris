<script>
    import { Nested } from "../../lib/components";
    import { Category } from "../../lib/tables";
</script>

<svelte:head>
    <title>Categorias</title>
</svelte:head>

<h1>Categorias</h1>
<section class="panel flex direction" style="gap: 1rem">
    <Nested model={Category} key="category_id" value={null} />
</section>
