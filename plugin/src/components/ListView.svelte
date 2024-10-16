<script lang="ts">
    import { useQuery } from "@sveltestack/svelte-query";
    import { fetchTasks } from "../lib/api";
    import { list } from "../lib/list.store";
    import { get } from "svelte/store";
    import type { Task } from "../lib/tasks.store";
    import TaskView from "./TaskView.svelte";

    const tasks = useQuery<Task[], Error>(
        "tasks",
        () => fetchTasks(get(list)!.id),
        {
            initialData: [],
            refetchInterval: 2*1000,
            refetchIntervalInBackground: true,
        }
    );
</script>

{#if $tasks.isLoading}
    <p>Loading...</p>
{:else if $tasks.isError}
    <p>Error: {$tasks.error?.message}</p>
{:else if $tasks.isSuccess}
    <ul>
        {#each $tasks.data as task (task.id)}
            <li>
                <TaskView {task} />
            </li>
        {:else}
            <li class="empty">This list is empty. Create new tasks!</li>
        {/each}
    </ul>
{/if}

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        margin: 0;
        padding: 0;
        margin: var(--space-medium) 0;
    }
    li:first-child {
        margin-top: var(--space-small);
    }
    .empty {
        padding: 1em;
        text-align: center;
    }
</style>
