<script lang="ts">
    import List from "../components/List.svelte";
    import StackLayout from "../components/StackLayout.svelte";
    import TaskAdd from "../components/TaskAdd.svelte";
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
                <h1>List: {$list.join_key}</h1>
            {/if}
            {#if $user}
                <h2>Welcome, {$user.name}</h2>
            {/if}
        </div>
    </svelte:fragment>
    <svelte:fragment slot="north">
        <TaskAdd on:taskAdded={resetScroll}/>
    </svelte:fragment>
    <svelte:fragment slot="main">
        <List />
    </svelte:fragment>
</StackLayout>
