<script lang="ts">
    import {tasks} from "../lib/tasks.store";
    import Task from "./Task.svelte";
</script>

<ul>
    {#each $tasks as task (task.id)}
        <li>
            <Task {task}/>
        </li>
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
    }
</style>