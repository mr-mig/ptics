<script lang="ts">
    import { create, type Task } from "../lib/tasks.store";
    import { createEventDispatcher } from 'svelte';

    let taskTitle = "";
    const dispatch = createEventDispatcher();

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter" && taskTitle.trim() !== "") {
            addTask(taskTitle);
        }
    }

    function addTask(title: string) {
        create(title);
        taskTitle = "";
        dispatch('taskAdded');
    }
</script>

<div class="task-add">
    <input 
        placeholder="Task title" 
        bind:value={taskTitle} 
        on:keypress={handleKeyPress} 
    />
    <button on:click={() => { addTask(taskTitle);}}>Create</button>
</div>

<style>
    .task-add {
        width: 100%;
        display: flex;
        padding: var(--space-medium);
        justify-content: space-between;
    }

    input {
        width: 100%;
        margin-right: var(--space-medium);
    }
</style>
