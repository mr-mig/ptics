<script>
    import StackLayout from "../components/StackLayout.svelte";
    import { user } from "../lib/user.store";

    if ($user === null) {
        // fetch user here
    }
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
    <svelte:fragment slot="main">
        {#if $user}
            <div>
                <input placeholder="Invitation Key" />
                <button>Join</button>
            </div>
        {:else }
            Initializing...
        {/if}
        <button>Create New List</button>
    </svelte:fragment>
</StackLayout>
