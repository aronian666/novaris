<script>
    export let name;
    export let title;
    export let options;
    export let value;
    export let option;
    export let blank;
</script>

<fieldset>
    <label for={name}>{title}</label>
    <select id={name} {name} bind:value {...$$restProps}>
        {#if blank}
            <option value="">{blank}</option>
        {/if}
        {#each options as item}
            <option value={option ? item[option[0]] : item}>
                {option ? item[option[1]] : item}
            </option>
        {/each}
    </select>
</fieldset>
