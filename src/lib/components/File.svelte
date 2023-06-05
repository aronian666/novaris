<script>
    export let name;
    export let title;
    export let value;
    export let url;
    export let onChange;
</script>

<fieldset>
    {#if title}
        <label for={name}>{title}</label>
    {/if}
    <label style="background-image: url({url});">
        <input
            type="file"
            bind:files={value}
            id={name}
            {name}
            on:change={onChange}
            {...$$restProps}
        />
    </label>
</fieldset>

<style>
    label:has(input) {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
