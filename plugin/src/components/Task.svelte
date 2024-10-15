<script lang="ts">
    import { complete, reopen, reset, start, type Task } from "../lib/tasks.store";

    export let task: Task;
    
    function formatDate(date: Date): string {
        return new Intl.DateTimeFormat("en-UK", {
            weekday: "short",
            month: "short",
            day: "2-digit",
        }).format(date);
    }

    function formatTime(date: Date): string {
        return new Intl.DateTimeFormat("en-UK", {
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
        }).format(date);
    }
</script>

<div class="panel">
    <div class="actions">
        {#if task.state === 'todo'}
            <button class="small" on:click={() => start(task)}>▶️</button>
        {/if}
        {#if task.state === 'ongoing'}
            <button class="small" on:click={() => reset(task)}>⏮️</button>
            <button class="small" on:click={() => complete(task)}>✅</button>
        {/if}
        {#if task.state === 'done'}
            <button class="small" on:click={() => reopen(task)}>♻️</button>
        {/if}
        
        
        
    </div>
    <div class="title" class:strike={task.state === 'done'}>{task.title}</div>
    <div class="metadata">
        <div class="owner">{task.owner.name}</div>
        <div class="timestamp">
            <div class="date">{formatDate(task.updated_at)}</div>
            <div class="time">{formatTime(task.updated_at)}</div>
        </div>
    </div>
</div>

<style>
    .panel {
        border: 1px solid var(--border-color);
        background-color: var(--panel-bg-color);
        border-radius: 6px;
        margin: 0.6em 0;

        min-height: 2em;
        min-width: 400px;

        display: flex;
        align-items: center;
    }

    .actions {
        padding: 1em 0 1em 0.6em;
        flex-grow: 1;
        flex-basis: 3em;
    }

    button.small {
        font-size: 0.8em;
        height: 2.2em;
        vertical-align: middle;
        padding: 0.2em 0.4em;
    }

    .title {
        padding: 1em 0;
        flex-grow: 10;
    }

    .strike {
        text-decoration: line-through;
        color: var(--shaded-text);
    }

    .metadata {    
        position: relative;
        flex-grow: 0;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;

        color: var(--metadata-text);
    }

    .owner {
        padding: 0.6em 1em;
        display: inline-block;
        font-size: 0.4em;
    }

    .timestamp {
        padding: 0.6em 1em;
        display: inline-block;
        font-size: 0.4em;
    }

</style>
