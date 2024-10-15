import { writable } from 'svelte/store';

export let tasks = writable([
    {id: 1, label: 'Task 1', state: 'done'},
    {id: 2, label: 'Task 2', state: 'ongoing'},
    {id: 3, label: 'Task 3', state: 'done'},
]);