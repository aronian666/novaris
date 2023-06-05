<script>
    import { Form, Steps } from "../../../lib/components";
    import { Product } from "../../../lib/tables";
    import { goto } from "$app/navigation";
    import Details from "./Details.svelte";
    import Vital from "./Vital.svelte";
    let product = new Product();
    const steps = [
        { component: Vital, icon: "inventory" },
        { component: Details, icon: "details" },
    ];
</script>

<Steps class="panel grid" {steps} let:step let:updateStep>
    <Form
        onSubmit={async (e) => {
            if (steps.length > step + 1) return updateStep(++step);
            const { id } = await product.create(false);
            return goto(`/products/${id}`);
        }}
    >
        <svelte:component this={steps[step].component} {product} />
        <div class="flex" style="gap: 1rem">
            {#if step !== 0}
                <button
                    class="holed"
                    style="--color: var(--color1)"
                    type="button"
                    on:click={(e) => updateStep(--step)}
                >
                    Anterior
                </button>
            {/if}
            <button type="submit">
                {step < steps.length - 1 ? "Siguiente" : "Guardar"}
            </button>
        </div>
    </Form>
</Steps>
