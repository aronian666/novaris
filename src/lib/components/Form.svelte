<script>
    import { invalidateAll } from "$app/navigation";
    /**
     * @type {function(): Promise<void> | undefined}
     */
    export let onSubmit;
    let loading = false;
    const handleSubmit = async (e) => {
        loading = true;
        if (onSubmit) await onSubmit(e);
        loading = false;
        invalidateAll();
    };
</script>

<form class:loading on:submit|preventDefault={handleSubmit}>
    <slot />
</form>
