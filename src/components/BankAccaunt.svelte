<script>
    import { setContext } from 'svelte';
 
    let bankAcc = JSON.parse(localStorage.getItem('accounts'));

    setContext('bankAcc', bankAcc);
</script>

<select name="" id="">
    {#each bankAcc as item, i}
        <option value={i}>{item.accName}</option>
    {/each}
</select>