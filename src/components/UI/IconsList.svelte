<script>
    import {slide} from 'svelte/transition';
    import CategoryService from '../../service-finance.js';

    export let currentIcon = '';

    let icons = new CategoryService().icons;

    let iconFunc = (icon) => {
        currentIcon = icon;
    }
</script>


<ul transition:slide>
    {#each icons as icon}
        <li 
            class="material-icons" 
            on:click={() => iconFunc(icon)}>
            {icon}
        </li>
    {/each}
</ul>

<style>
    ul {
        max-height: 80vh;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        
    }

    li {
        font-size: 40px;
        color: #fff;
        margin: 10px;
        cursor: pointer;
    }
</style>