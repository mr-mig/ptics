<script lang="ts">
    import {tasks} from "../lib/tasks.store";
    import Task from "./Task.svelte";
</script>

<ul>
    {#each $tasks as task (task.id)}
        <li>
            <Task {task}/>
        </li>
    {:else}
        <li class="empty">This list is empty. Create new tasks!</li>
    {/each}
</ul>

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