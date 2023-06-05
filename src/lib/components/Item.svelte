<script>
    import Icon from "./Icon.svelte";
    import Nested from "./Nested.svelte";
    import Modal from "./Modal.svelte";
    import Form from "./Form.svelte";
    import Input from "./Input.svelte";
    import TextArea from "./TextArea.svelte";
    export let object;
    export let property;
    export let model;
    export let key;
    let edit = false;
    let expand = false;
    let newObject;
</script>

<li class="grid" style="gap: 0.5rem">
    <div class="flex" style="gap: 0.5rem">
        <fieldset>
            <input
                type="text"
                bind:value={object[property]}
                on:keypress={async (e) => {
                    if (e.key === "Enter") {
                        await object.save();
                        edit = false;
                    }
                }}
                on:dblclick={(e) => (edit = true)}
                on:blur={async (e) => {
                    if (edit) await object.save();
                    edit = false;
                }}
                readonly={!edit}
            />
        </fieldset>
        <button
            class="small holed"
            type="button"
            style="--color: var(--dark)"
            on:click={(e) => (expand = !expand)}
        >
            <Icon icon={expand ? "expand_less" : "expand_more"} />
        </button>
        <button
            class="small holed"
            type="button"
            on:click={(e) =>
                (newObject = new model({
                    category: object,
                    [key]: object.id,
                }))}
        >
            <Icon icon="add" />
        </button>
    </div>
    {#if expand}
        <Nested {model} {property} {key} value={object.id} index={1} />
    {/if}
</li>
{#if newObject}
    <Modal class="panel" onClose={(e) => (newObject = null)}>
        <h2 class="text-center">{newObject.category[property]}</h2>
        <Form
            onSubmit={async () => {
                newObject = await newObject.create();
                expand = false;
                setTimeout(() => {
                    expand = true;
                }, 100);

                newObject = null;
            }}
        >
            <Input title="Sub categoria" bind:value={newObject[property]} />
            <TextArea title="Descripcion" bind:value={newObject.description} />
            <button type="submit">Agregar</button>
        </Form>
    </Modal>
{/if}
