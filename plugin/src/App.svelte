<script type="ts">
    import Router from "svelte-spa-router";
    import routes from "./routes";
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import { replace } from "svelte-spa-router";
    import User from "./components/User.svelte";

    const conditionsFailed = () => {
        console.log("conditions failed");
        replace("/join");
    };

    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <User/>
    <Router {routes} on:conditionsFailed={conditionsFailed} />
</QueryClientProvider>
