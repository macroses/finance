<script>
    let arrAcc = JSON.parse(localStorage.getItem('accounts'));
</script>

<select name="" id="">
    {#each arrAcc as item, i}
        <option value={i}>{item.accName}</option>
    {/each}
</select>