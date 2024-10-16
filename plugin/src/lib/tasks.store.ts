import { get, writable, type Writable } from 'svelte/store';
import { user, type User } from './user.store'

let localAutoIncrement = 0;

export const STATES = { 
    TODO: 'todo',
    ONGOING: 'ongoing',
    DONE: 'done'
} as const

export type Task = {
    id: number;
    title: string;
    state: typeof STATES.DONE | typeof STATES.ONGOING | typeof STATES.TODO;
    owner: User;
    updated_at: string;
}

export function start(task: Task) {
    if (task.state === STATES.TODO) {
        task.state = STATES.ONGOING;
    }
    tasks.update(t => t);
}

export function complete(task: Task) {
    if (task.state === STATES.ONGOING) {
        task.state = STATES.DONE;
    }
    tasks.update(t => t);
}

export function reopen(task: Task) {
    if (task.state === STATES.DONE) {
        task.state = STATES.ONGOING;
    }
    tasks.update(t => t);
}

export function reset(task: Task) {
    if (task.state === STATES.ONGOING) {
        task.state = STATES.TODO;
    }
    tasks.update(t => t);
}

export function create(taskTitle: string) {
    const task: Task = {
        id: localAutoIncrement--,
        title: taskTitle,
        state: STATES.TODO,
        owner: get(user)!,
        updated_at: new Date().toISOString(),
    };
    return task
}

export function remove(task: Task) {
    tasks.update(t => t.filter(t => t.id !== task.id));
}

export let tasks: Writable<Task[]> = writable([
    { id: 1, title: 'Task 1', state: STATES.TODO, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 2, title: 'Task 2', state: STATES.TODO, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 3, title: 'Task 3', state: STATES.DONE, owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 4, title: 'Task 1', state: STATES.DONE, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 5, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 6, title: 'Task 3', state: STATES.DONE, owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 7, title: 'Task 1', state: STATES.TODO, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 8, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 9, title: 'Task 3', state: STATES.DONE, owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 10, title: 'Task 1', state: STATES.DONE, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 11, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 12, title: 'Task 3', state: STATES.DONE, owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
    { id: 13, title: 'Task 1', state: STATES.DONE, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 14, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'User 1' }, updated_at: new Date() },
    { id: 15, title: 'Task 3', state: STATES.DONE, owner: { id: 2, name: 'User 2' }, updated_at: new Date() },
]);