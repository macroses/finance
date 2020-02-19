<script>
    import { slide } from 'svelte/transition';

    export let accountName;

    // взять массив с названиями счетов
    // взять массив с операциями, посмотреть каким счетам принадлежат операции
    // сравнить два массива на совпадения по названию счета

    let accNameArr = JSON.parse(localStorage.getItem('accounts'));
    let operationsNameArr = JSON.parse(localStorage.getItem('operations'));

    const concatArrays = operationsNameArr.filter(a => {
        return accNameArr.some(b => a.bankAccount === b.accName);
    })

    console.log(accountName);
</script>



<style>
    
</style>