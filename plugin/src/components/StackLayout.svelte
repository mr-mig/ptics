<script lang="ts">
    import svelteLogo from "/svelte.svg";
    import viteLogo from "/vite.svg";

    export let scrollable: HTMLElement | null = null
</script>

<header>
    <slot name="header">Stack Layout</slot>
</header>
{#if $$slots.north}
    <div class="north">
        <slot name="north" />
    </div>
{/if}
<main bind:this={scrollable}>
    <div class="scrollable">
        <slot name="main" />
    </div>
</main>
<footer>
    <slot name="footer">
        <span class="powered-by">
            Powered by
            <img src={viteLogo} class="logo" alt="Vite Logo" />
            and
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
        </span>
    </slot>
</footer>

<style>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        border-bottom: 1px solid var(--border-color);
    }

    .north {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid var(--border-color);
    }

    main {
        overflow-y: auto;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .scrollable {
        max-height: 100%;
        width: 100%;
        align-self: flex-start;
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 1em;
        border-top: 1px solid var(--border-color);
    }

    .logo {
        height: 1em;
        display: inline-block;
        text-align: center;
    }
</style>
