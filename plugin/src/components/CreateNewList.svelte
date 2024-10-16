<script lang="ts">
    import { useMutation } from "@sveltestack/svelte-query";
    import { createNewList } from "../lib/api";
    import { push } from "svelte-spa-router";
    import { list, save } from "../lib/list.store";

    let title = "";
    const listCreateQuery = useMutation(createNewList, {
        retry: 3,
        onSuccess: (data) => {
            console.log("List created successfully:", data);
            $list = data;
            push(`/list/${data.id}`);
            save(data);
        },
        onError: (error: Error) => {
            console.error("Error creating list:", error);
        },
    });

    function createTask() {
        if (title && title.trim() !== "") {
            $listCreateQuery.mutate({ title: title, id: -1, login_key: "" });
            title = "";
        }
    }

    function handleClick() {
        createTask()
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            createTask()
        }
    }
</script>

{#if $listCreateQuery.isLoading}
    <p>Creating...</p>
{:else if $listCreateQuery.isError}
    <p>Error creating new list: {$listCreateQuery.error?.message}</p>
{:else if $listCreateQuery.isSuccess}
    <p>List Created</p>
{:else}
    <input
        type="text"
        placeholder="New title"
        bind:value={title}
        on:keypress={handleKeyPress}
    />
    <button on:click={handleClick}>Create New List</button>
{/if}
