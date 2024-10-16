<script>
    import CreateNewList from "../components/CreateNewList.svelte";
    import JoinInvitation from "../components/JoinInvitation.svelte";
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
                <div class="inputs">
                    <JoinInvitation />
                </div>
                <div class="inputs">
                    <CreateNewList />
                </div>
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
    .inputs {
        margin: var(--space-small);
    }
</style>
