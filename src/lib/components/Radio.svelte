<script>
    export let options;
    export let value;
    export let title;
    export let name;
    export let option;
</script>

<fieldset>
    {#if title}
        <label for={name}>{title}</label>
    {/if}
    <div class="flex" style="gap: 1rem">
        {#each options as item, index}
            <label>
                <input
                    type="radio"
                    bind:group={value}
                    name={`${name}[${index}]`}
                    value={option ? item[option[0]] : item}
                    {...$$restProps}
                />
                {option ? item[option[1]] : item}
            </label>
        {/each}
    </div>
</fieldset>
