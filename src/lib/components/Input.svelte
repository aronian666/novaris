<script>
    export let name;
    export let title;
    export let value;
</script>

<fieldset>
    {#if title}
        <label for={name}>{title}</label>
    {/if}
    <input
        autocomplete="off"
        placeholder=" "
        id={name}
        {name}
        type="text"
        bind:value
        on:keypress
        {...$$restProps}
    />
</fieldset>
