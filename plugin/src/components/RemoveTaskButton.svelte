<script lang="ts">
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import type { Task } from "../lib/tasks.store";
    import { removeTask } from "../lib/api"; // Adjust the import path as necessary

    export let task: Task | undefined = undefined;

    const client = useQueryClient();

    const removeMutation = useMutation(removeTask, {
        retry: 3,
        onMutate: (id: number) => {
            client.cancelQueries("tasks");
            const previousValues = client.getQueryData<Task[]>("tasks");
            client.setQueryData<Task[]>("tasks", (old: Task[] | undefined) =>
                old !== undefined ? old.filter((t) => t.id !== id) : [],
            );
            return previousValues;
        },
        onSuccess: () => {
            console.log("Task Removed successfully");
        },
        onError: (error: Error, id: number, previousValues) => {
            client.setQueryData("todos", previousValues);
            console.error("Error removing task:", error);
        },
        onSettled: () => {
            client.invalidateQueries("tasks");
        }
    });

    function handleClick() {
        if (task) {
            $removeMutation.mutate(task!.id);
        }
    }
</script>

<button class="small" on:click={handleClick}>❌</button>
