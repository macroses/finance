<script>
    import {onMount} from 'svelte';
    import { fly, slide, fade } from 'svelte/transition';

    let show = false;

    onMount(() => {
        show = true;
    })

</script>

<style>
    div{
        position: relative;
    }
</style>

{#if show}
    <div out:slide>
        <slot></slot>
    </div>
{/if}