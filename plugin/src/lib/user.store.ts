import { writable, type Writable } from 'svelte/store';

export type User = {
    id: number;
    name: string;
}

export const user: Writable<User | null> = writable({id:0, name: 'Test user'});