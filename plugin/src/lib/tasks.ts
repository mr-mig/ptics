import { get } from 'svelte/store';
import { user, type User } from './user.store'

let localAutoIncrement = 0;

export const STATES = {
    TODO: 'todo',
    ONGOING: 'ongoing',
    DONE: 'done'
} as const

export type PossibleStates = typeof STATES[keyof typeof STATES];

export type Task = {
    id: number;
    title: string;
    state: PossibleStates;
    owner: User;
    updated_at: string;
}

export function start(task: Task) {
    if (task.state === STATES.TODO) {
        task.state = STATES.ONGOING;
    }
    return task
}

export function complete(task: Task) {
    if (task.state === STATES.ONGOING) {
        task.state = STATES.DONE;
    }
    return task
}

export function reopen(task: Task) {
    if (task.state === STATES.DONE) {
        task.state = STATES.ONGOING;
    }
    return task
}

export function reset(task: Task) {
    if (task.state === STATES.ONGOING) {
        task.state = STATES.TODO;
    }
    return task
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

export function update(task: Task, dataset: Task[]) {
    return dataset.map(t => t.id === task.id ? task : t);
}

export function remove(task: Task, dataset: Task[]) {
    return dataset.filter(t => t.id !== task.id);
}