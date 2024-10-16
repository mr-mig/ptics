import { writable, type Writable } from 'svelte/store';

export type User = {
    id: number;
    name: string;
}

let initialValue: User | null = null
if (typeof window !== 'undefined' && window.sessionStorage) {
    const item = sessionStorage.getItem('user')
    if (item) {
        initialValue = JSON.parse(item) as User
    }
}

export function save(user: User) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const item = sessionStorage.setItem('user', JSON.stringify(user))
    }
}

export const user: Writable<User | null> = writable(initialValue);