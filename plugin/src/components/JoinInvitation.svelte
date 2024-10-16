<script lang="ts">
    import { useMutation } from "@sveltestack/svelte-query";
    import { joinInvitation } from "../lib/api";
    import { save, list, type List } from "../lib/list.store";
    import { push } from "svelte-spa-router";

    let login_key = "";

    // Define the mutation
    const invitationMutation = useMutation(joinInvitation, {
        onSuccess: (data: List) => {
            console.log("Joined successfully:", data);
            $list = data;
            push(`/list/${data.id}`);
            save(data);
        },
        onError: (error: Error) => {
            console.error("Error joining invitation:", error);
            // Handle error, e.g., show an error message
        },
    });

    function handleJoin() {
        $invitationMutation.mutate(login_key);
    }
</script>

<input
    placeholder="Invitation Key"
    bind:value={login_key}
    disabled={$invitationMutation.isLoading}
/>
<button on:click={handleJoin} disabled={$invitationMutation.isLoading}
    >Join</button
>
{#if $invitationMutation.isError}
    <p>{$invitationMutation.error?.message}</p>
{/if}
{#if $invitationMutation.isSuccess}
    <p>Joined successfully!</p>
{/if}
