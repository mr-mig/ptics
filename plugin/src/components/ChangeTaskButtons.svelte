<script lang="ts">
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { STATES, type PossibleStates, type Task } from "../lib/tasks.store";
    import { updateTask } from "../lib/api";

    export let task: Task | undefined = undefined;

    const client = useQueryClient();

    const updateMutation = useMutation(updateTask, {
        retry: 3,
        onMutate: (task: Task) => {
            client.cancelQueries("tasks");
            const previousValues = client.getQueryData<Task[]>("tasks");
            client.setQueryData<Task[]>("tasks", (old: Task[] | undefined) =>
                old !== undefined ? old.map((t) => t.id === task.id ? task : t) : [],
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

    function handleClick(state: PossibleStates) {
        return () => {
            if (task) {
                $updateMutation.mutate({ ...task, state });
            }
        }
    }
</script>

{#if task && task.state === STATES.TODO}
    <button class="small" on:click={handleClick(STATES.ONGOING)}>▶️</button>
{/if}
{#if task && task.state === STATES.ONGOING}
    <button class="small" on:click={handleClick(STATES.TODO)}>⏮️</button>
    <button class="small" on:click={handleClick(STATES.DONE)}>✅</button>
{/if}
{#if task && task.state === STATES.DONE}
    <button class="small" on:click={handleClick(STATES.ONGOING)}>♻️</button>
{/if}
