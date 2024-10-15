import { expect, test, beforeEach } from 'vitest'
import { tasks, type Task, start, complete, reopen, reset, create, remove, STATES } from './tasks.store'
import { get } from 'svelte/store'

// Initial setup for tasks 
// the functiona makes sure that every new test starts with the same initial state without mutations
const initialTasks: () => Task[] = () => [
    { id: 1, title: 'Task 1', state: STATES.TODO, owner: { id: 1, name: 'test' }, updated_at: new Date() },
    { id: 2, title: 'Task 2', state: STATES.ONGOING, owner: { id: 1, name: 'test' }, updated_at: new Date() },
    { id: 3, title: 'Task 3', state: STATES.DONE, owner: { id: 1, name: 'test' }, updated_at: new Date() }
];

// Helper function to reset tasks to initial state
function resetTasks() {
    tasks.set(initialTasks());
}

beforeEach(resetTasks)

test('tasks exist', () => {
    expect(tasks).toBeDefined()
})

test('tasks be populated', () => {
    expect(get(tasks).length).toBeGreaterThan(0)
})

test('start action', () => {
    start(get(tasks)[0]);
    const task = get(tasks)[0];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('start action on `done` is a noop', () => {
    start(get(tasks)[2]);
    const task = get(tasks)[2];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('complete action', () => {
    complete(get(tasks)[1]);
    const task = get(tasks)[1];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('complete action on `todo` is a noop', () => {
    complete(get(tasks)[0]);
    const task = get(tasks)[0];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.TODO);
})

test('reopen action', () => {
    reopen(get(tasks)[2]);
    const task = get(tasks)[2];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('reopen action on `ongoing` is a noop', () => {
    reopen(get(tasks)[1]);
    const task = get(tasks)[1];
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.ONGOING);
})

test('reset action', () => {
    reset(get(tasks)[1]);
    const task = get(tasks)[1]
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.TODO);
})

test('reset action on `done` is a noop', () => {
    reset(get(tasks)[2]);
    const task = get(tasks)[2]
    expect(task).toBeDefined();
    expect(task!.state).toBe(STATES.DONE);
})

test('create action prepends the task', () => {
    create('Task 4');
    const task = get(tasks)[0];
    expect(task).toBeDefined();
    expect(task!.title).toBe('Task 4');
})

test('remove action', () => {
    const task = get(tasks)[1];
    expect(task).toBeDefined();
    expect(task!.title).toBe('Task 2');
    remove(task!);
    expect(get(tasks).length).toBe(2);
    expect(get(tasks)[1].title).toBe('Task 3');
})