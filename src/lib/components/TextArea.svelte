<script>
    export let name;
    export let title;
    export let value;
</script>

<fieldset>
    {#if title}
        <label for={name}>{title}</label>
    {/if}
    <textarea
        {name}
        id={name}
        autocomplete="off"
        placeholder=" "
        bind:value
        on:keypress
        {...$$restProps}
    />
</fieldset>
