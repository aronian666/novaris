<script>
    import { onMount } from "svelte";
    import Item from "./Item.svelte";
    import Modal from "./Modal.svelte";
    import Form from "./Form.svelte";
    import Input from "./Input.svelte";
    export let property = "name";
    export let model;
    export let value;
    export let key;
    export let index = 0;
    let newObject;
    let objects = [];
    onMount(async () => {
        const sign = value === null ? "is" : "eq";
        const { data, count } = await model
            .all()
            .matchSign({ [key]: `${sign}.${value}` })
            .model();
        objects = data;
    });
</script>

{#if !value}
    <button on:click={(e) => (newObject = new model())}
        >Agregar categoria</button
    >
{/if}

{#if objects.length}
    <ul class="grid" style="gap: 0.5rem; padding: 0 {index * 1}rem">
        {#each objects as object, index}
            <Item {object} {property} {model} {key} />
        {/each}
    </ul>
{/if}

{#if newObject}
    <Modal class="panel" onClose={(e) => (newObject = null)}>
        <h2 class="text-center">Agregar categoria</h2>
        <Form
            onSubmit={async () => {
                newObject = await newObject.create(true);
                objects.push(newObject);
                objects = objects;
                newObject = null;
            }}
        >
            <Input title="Categoria" bind:value={newObject[property]} />
            <button type="submit" style="--color: var(--color1)">Agregar</button
            >
        </Form>
    </Modal>
{/if}
