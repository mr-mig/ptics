<script lang="ts">
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { create, type Task } from "../lib/tasks.store";
    import { createEventDispatcher } from "svelte";
    import { createTask } from "../lib/api";

    let taskTitle = "";
    const dispatch = createEventDispatcher();
    const client = useQueryClient();

    const taskMutation = useMutation(createTask, {
        retry: 3,
        onMutate: (title: string) => {
            client.cancelQueries("tasks");
            const previousValues = client.getQueryData<Task[]>("tasks");
            client.setQueryData<Task[]>("tasks", (old: Task[] | undefined) =>
                old !== undefined ? [create(title), ...old] : [create(title)],
            );
            return previousValues;
        },
        onSuccess: (data: Task) => {
            console.log("Task created successfully:", data);
        },
        onError: (error: Error, title: string, previousValues) => {
            client.setQueryData("todos", previousValues),
                console.error("Error creating task:", error);
        },
        onSettled: () => {
            client.invalidateQueries("tasks");
        },
    });

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter" && taskTitle.trim() !== "") {
            addTask(taskTitle);
        }
    }

    function handleClick() {
        addTask(taskTitle);
    }

    function addTask(title: string) {
        $taskMutation.mutate(taskTitle);
        taskTitle = "";
        dispatch("taskAdded");
    }
</script>

<div class="task-add">
    <input
        placeholder="Task title"
        bind:value={taskTitle}
        on:keypress={handleKeyPress}
    />
    <button on:click={handleClick}>Create</button>
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
