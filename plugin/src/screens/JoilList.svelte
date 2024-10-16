<script>
    import CreateNewList from "../components/CreateNewList.svelte";
    import StackLayout from "../components/StackLayout.svelte";
    import { user } from "../lib/user.store";
</script>

<StackLayout>
    <svelte:fragment slot="header">
        <div>
            <h1>Join List</h1>
            {#if $user}
                <h2>Welcome, {$user && $user.name}</h2>
            {/if}
        </div>
    </svelte:fragment>
    <div class="container" slot="main">
        <div>
            {#if $user}
                <div>
                    <input placeholder="Invitation Key" />
                    <button>Join</button>
                </div>
                <CreateNewList />
            {:else}
                Initializing...
            {/if}
        </div>
    </div>
</StackLayout>

<style>
    .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        margin: var(--space-medium);
    }
</style>
