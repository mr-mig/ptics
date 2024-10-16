<script lang="ts">
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { STATES, type PossibleStates, type Task, update, start, reopen, reset, complete } from "../lib/tasks";
    import { updateTask } from "../lib/api";

    export let task: Task | undefined = undefined;

    const client = useQueryClient();

    const updateMutation = useMutation(updateTask, {
        retry: 3,
        onMutate: (task: Task) => {
            client.cancelQueries("tasks");
            const previousValues = client.getQueryData<Task[]>("tasks");
            client.setQueryData<Task[]>("tasks", (old: Task[] | undefined) =>
                old !== undefined ? update(task, old) : [],
            );
            return previousValues;
        },
        onSuccess: () => {
            console.log("Task updated successfully");
        },
        onError: (error: Error, task: Task, previousValues) => {
            client.setQueryData("todos", previousValues);
            console.error("Error updating task:", error);
        },
        onSettled: () => {
            client.invalidateQueries("tasks");
        }
    });

    function handleClick(transition: (task: Task) => Task) {
        return () => {
            if (task) {
                $updateMutation.mutate(transition(task));
            }
        }
    }
</script>

{#if task && task.state === STATES.TODO}
    <button class="small" on:click={handleClick(start)}>▶️</button>
{/if}
{#if task && task.state === STATES.ONGOING}
    <button class="small" on:click={handleClick(reset)}>⏮️</button>
    <button class="small" on:click={handleClick(complete)}>✅</button>
{/if}
{#if task && task.state === STATES.DONE}
    <button class="small" on:click={handleClick(reopen)}>♻️</button>
{/if}
