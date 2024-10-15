<script type="ts">
    import Router from 'svelte-spa-router';
    import routes from './routes';
    import { replace } from 'svelte-spa-router';

    const conditionsFailed = () => {
        console.log('conditions failed');
        replace('/join')
    }
</script>

<Router {routes} on:conditionsFailed={conditionsFailed}/>