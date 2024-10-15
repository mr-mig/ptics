import Home from './screens/Home.svelte';
import NotFound from './screens/NotFound.svelte';

export default {
    '/': Home,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
}