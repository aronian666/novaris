<script>
    import Input from "./Input.svelte";
    import Select from "./Select.svelte";
    import Checkbox from "./Checkbox.svelte";
    import File from "./File.svelte";
    import Radio from "./Radio.svelte";
    import TextArea from "./TextArea.svelte";
    import Icon from "./Icon.svelte";
    const components = {
        select: Select,
        checkbox: Checkbox,
        file: File,
        radio: Radio,
        textarea: TextArea,
    };
    const helpers = {
        text: Input,
        textarea: TextArea,
    };
    export let object = {};
    export let form = {};
    export let objectName;
    Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) return;
        object[key] = object[key] ?? value.value;
    });
    objectName = objectName || object.constructor.name.toLowerCase();
</script>

{#each Object.entries(form) as [key, value]}
    {#if Array.isArray(value)}
        {#each value as form, index}
            <svelte:self
                {form}
                bind:object={object[key][index]}
                objectName={`${objectName}[${key}][${index}]`}
            />
        {/each}
    {:else if components[value.type]}
        <svelte:component
            this={components[value.type]}
            {...value}
            name={`${objectName}[${key}]`}
            bind:value={object[key]}
            url={object.url || value.url}
        />
    {:else if value.type === "array"}
        <div class="grid" style="gap: 0.5rem">
            <svelte:component
                this={helpers[value.helper]}
                {...value}
                name={`${objectName}[${key}]`}
                value=""
                title={value.title}
                on:keypress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        object[key].push(e.target.value);
                        object = object;
                        e.target.value = "";
                    }
                }}
            />
            <ul>
                {#each object[key] as value, index}
                    <li>
                        {value}
                        <button
                            class="holed"
                            type="button"
                            on:click={(e) => {
                                object[key].splice(index, 1);
                                object = object;
                            }}
                        >
                            <Icon icon="close" style="font-size:1.25rem" />
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {:else}
        <Input
            {...value}
            name={`${objectName}[${key}]`}
            bind:value={object[key]}
        />
    {/if}
{/each}

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    li {
        padding: clamp(0.3rem, 2vw, 0.6rem) 0.6rem;
        border: 1px solid var(--gray);
        position: relative;
    }

    button {
        position: absolute;
        display: none;
        padding: 0;
        top: -0.25rem;
        right: -0.25rem;
    }
    li:hover button {
        display: flex;
    }
    li:hover {
        border: 1px solid var(--dark);
    }
</style>
