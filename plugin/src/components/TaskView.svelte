<script lang="ts">
    import { complete, remove, reopen, reset, start, STATES, type Task } from "../lib/tasks.store";

    export let task: Task;
    
    function formatDate(ISODate: string): string {
        return new Intl.DateTimeFormat("en-UK", {
            weekday: "short",
            month: "short",
            day: "2-digit",
        }).format(new Date(ISODate));
    }

    function formatTime(ISODate: string): string {
        return new Intl.DateTimeFormat("en-UK", {
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
        }).format(new Date(ISODate));
    }
</script>

<div class="panel">
    <div class="status" class:active={task.state === 'ongoing'}></div>
    <div class="actions">
        {#if task.state === STATES.TODO}
            <button class="small" on:click={() => start(task)}>▶️</button>
        {/if}
        {#if task.state === STATES.ONGOING}
            <button class="small" on:click={() => reset(task)}>⏮️</button>
            <button class="small" on:click={() => complete(task)}>✅</button>
        {/if}
        {#if task.state === STATES.DONE}
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
    <div class="delete-container">
        <button class="small" on:click={() => remove(task)}>❌</button>
    </div>
</div>

<style>
    .panel {
        border: 1px solid var(--border-color);
        background-color: var(--panel-bg-color);
        border-radius: var(--space-small);

        min-height: 2em;
        min-width: 400px;

        display: flex;
        align-items: center;
    }

    .status {
        align-self: stretch;
        border: transparent solid var(--space-xsmall);
    }

    .status.active{
        border: var(--active-accent-color) solid var(--space-xsmall);
    }

    .actions {
        padding: var(--space-medium) 0 var(--space-medium) var(--space-medium);
        flex-grow: 1;
        flex-basis: 3em;
    }

    button.small {
        font-size: 0.8em;
        height: 2.2em;
        vertical-align: middle;
        padding: var(--space-xsmall) var(--space-small);
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
        padding: var(--space-medium) var(--space-large);
        display: inline-block;
        font-size: var(--space-small)
    }

    .timestamp {
        padding: var(--space-medium) var(--space-large);
        display: inline-block;
        font-size: var(--space-small)
    }

</style>
