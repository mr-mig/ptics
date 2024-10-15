import { writable, type Writable } from 'svelte/store';

type List = {
    id: number;
    title: string;
    join_key: string;
}

export const list: Writable<List | null> = writable({id: 1, title: 'List 1', join_key: '1234asdasd'});