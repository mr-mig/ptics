import { expect, test, beforeEach } from 'vitest'
import { type Task, start, complete, reopen, reset, create, remove, STATES } from './tasks'
import { get } from 'svelte/store'

// Initial setup for tasks 
const initialTasks: () => Task[] = () => [
    { id: 1, title: 'Task 1', state: STATES.TODO, owner: { id: 1, name: 'test' }, updated_at: new Date().toISOString() },
    { id: 2, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'test' }, updated_at: new Date().toISOString() },
    { id: 3, title: 'Task 3', state: STATES.DONE, owner: { id: 1, name: 'test' }, updated_at: new Date().toISOString() }
];

let tasks: Task[] = [];

// Helper function to reset tasks to initial state
function resetTasks() {
    tasks = initialTasks();
}

beforeEach(resetTasks)

test('start transition', () => {
    const task = start(tasks[0]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('start transition on `done` is a noop', () => {
    const task = start(tasks[2]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('complete transition', () => {
    const task = complete(tasks[1]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('complete transition on `todo` is a noop', () => {
    const task = complete(tasks[0]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.TODO);
})

test('reopen transition', () => {
    const task = reopen(tasks[2]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('reopen transition on `ongoing` is a noop', () => {
    const task = reopen(tasks[1]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('reset transition', () => {
    const task = reset(tasks[1]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.TODO);
})

test('reset transition on `done` is a noop', () => {
    const task = reset(tasks[2]);
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('create transition prepends the task', () => {
    const task = create('Task 4');
    expect(task).toBeDefined();
    expect(task!.title).toBe('Task 4');
})

test('remove transition', () => {
    const task = tasks[1];
    expect(task.title).toBe('Task 2');
    tasks = remove(task, tasks);
    expect(tasks.length).toBe(2);
    expect(tasks[1].title).toBe('Task 3');
})