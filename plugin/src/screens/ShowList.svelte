<script lang="ts">
    import ListView from "../components/ListView.svelte";
    import StackLayout from "../components/StackLayout.svelte";
    import CreateNewTask from "../components/CreateNewTask.svelte";
    import { list } from "../lib/list.store";
    import { user } from "../lib/user.store";

    let element: HTMLElement | null = null;

    function resetScroll() {
        if (element) {
            element.scrollTop = 0;
        }
    }
</script>

<StackLayout bind:scrollable={element}>
    <svelte:fragment slot="header">
        <div>
            {#if $list}
                <h1>{$list.title}</h1>
                <h3 class="shaded">Login key: {$list.login_key}</h3>
            {/if}
            {#if $user}
                <h3 class="shaded">User: {$user.name}</h3>
            {/if}
        </div>
    </svelte:fragment>
    <svelte:fragment slot="north">
        <CreateNewTask on:taskAdded={resetScroll} />
    </svelte:fragment>
    <svelte:fragment slot="main">
        <div class="scrollable">
            <ListView />
        </div>
    </svelte:fragment>
</StackLayout>

<style>
    .scrollable {
        max-height: 100%;
        width: 100%;
        align-self: flex-start;
    }

    .shaded {
        color: var(--shaded-text)
    }
</style>