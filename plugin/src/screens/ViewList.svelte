<script>
    import List from "../components/List.svelte";
    import StackLayout from "../components/StackLayout.svelte";
    import { list } from "../lib/list.store";
    import { user } from "../lib/user.store";
</script>

<StackLayout>
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
    <svelte:fragment slot="main">
        <List />
    </svelte:fragment>
</StackLayout>
