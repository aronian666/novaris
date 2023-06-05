<script>
    import { Icon } from "../lib/components";

    const pages = [
        { name: "Dashboard", icon: "home", href: "/" },
        { name: "Productos", icon: "inventory_2", href: "/products" },
    ];
    let active = false;
</script>

<header class="flex content" style="--c: space-between">
    <div class="flex content items" style="gap: 0.25rem">
        <button class="icon" on:click={(e) => (active = !active)}>
            <Icon icon="menu" />
        </button>
        <img src="/imgs/logo.png" alt="Logo" />
    </div>
    <div>Usuario</div>
</header>
<div class="flex auto-fit">
    <aside class:active style="flex: 1 1 auto">
        <nav class="flex direction">
            {#each pages as { name, icon, href }}
                <a {href} class="flex items" style="gap: 1rem">
                    <Icon {icon} style="font-size:2rem" />
                    {name}
                </a>
            {/each}
        </nav>
    </aside>
    <main style="flex: 1 1 100%">
        <slot />
    </main>
</div>

<style>
    aside {
        height: calc(100vh - 4rem);
        background: white;
        padding: 0.5rem;
        transition: 0.3s;
        position: sticky;
        top: 0;
        width: 250px;
    }
    main {
        padding: 1rem;
    }
    img {
        width: 100px;
    }
    header {
        padding: 1rem;
        background-color: white;
    }
    a {
        --color: var(--color1);
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        color: var(--dark);
        text-decoration: none;
    }
    a:hover {
        --color: var(--color1);
        --alpha: 0.2;
        background-color: color-mix(
            in srgb,
            var(--color),
            transparent calc((1 - var(--alpha)) * 100%)
        );
        color: var(--color1);
    }
    .active {
        display: none;
    }
</style>
