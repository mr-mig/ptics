import { writable, type Writable } from 'svelte/store';
import { type User } from './user.store'

export type Task = {
    id: number;
    title: string;
    state: 'done' | 'ongoing' | 'todo';
    owner: User;
    updated_at: Date;
}

export function start(task: Task) {
    if (task.state === 'todo') {
        task.state = 'ongoing';
    }
    tasks.update(t => t);
}

export function complete(task: Task) {
    if (task.state === 'ongoing') {
        task.state = 'done';
    }
    tasks.update(t => t);
}

export function reopen(task: Task) {
    if (task.state === 'done') {
        task.state = 'ongoing';
    }
    tasks.update(t => t);
}

export function reset(task: Task) {
    if (task.state === 'ongoing') {
        task.state = 'todo';
    }
    tasks.update(t => t);
}

export function create(task: Task) {
    tasks.update(t => [...t, task]);
}

export function remove(task: Task) {
    tasks.update(t => t.filter(t => t.id !== task.id));
}

export let tasks: Writable<Task[]> = writable([
    { id: 1, title: 'Task 1', state: 'todo', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 2, title: 'Task 2', state: 'todo', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 3, title: 'Task 3', state: 'done', owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 4, title: 'Task 1', state: 'done', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 5, title: 'Task 2', state: 'ongoing', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 6, title: 'Task 3', state: 'done', owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 7, title: 'Task 1', state: 'todo', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 8, title: 'Task 2', state: 'ongoing', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 9, title: 'Task 3', state: 'done', owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 10, title: 'Task 1', state: 'done', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 11, title: 'Task 2', state: 'ongoing', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 12, title: 'Task 3', state: 'done', owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 13, title: 'Task 1', state: 'done', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 14, title: 'Task 2', state: 'ongoing', owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 15, title: 'Task 3', state: 'done', owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
]);