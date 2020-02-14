<script>
    import {fly, slide, fade} from 'svelte/transition';
    import AccountService from '../service-acc';

    let accountName = '';
    let accountValue = '';
    let accountService = new AccountService();
    let accountItems = accountService.items;

    const addAccItem = () => {
        if (accountName === '') {
            return;
        } else if (accountValue === '') {
            accountValue = 0;
        }

        accountService.addAccountItem(accountName, accountValue);        

        accountItems = accountService.get();

        accountName = '';
        accountValue = '';
    }

    const editAccItem = (id, name, value) => {
        accountService.editAccountItem(id, name, value);
        accountItems = accountService.get();
    }

    const removeAccItem = (id) => {
        accountService.removeAccountItem(id);
        accountItems = accountService.get();
    }

</script>

<svelte:head>
    <title>Счета</title>
</svelte:head>

<div class="account_wrap" out:slide>
    <div class="create_account_box">
        <input type="text" placeholder="Введите название счета" bind:value={ accountName }>
        <input type="number" placeholder="Количество средств на счете" bind:value={ accountValue }>
        <button on:click={ addAccItem }>Добавить</button>
    </div>
    <ul class="accounts_list">
        {#each accountItems as item}
            <li>
                <div class="account_name">{ item.accName }</div>
                <div class="account_value">{ item.accValue }</div>
                <button on:click={ editAccItem(item.id, item.accName, item.accValue) }>edit</button>
                <button on:click={ removeAccItem(item.id) }>remove</button>

                {#if item.visibleEdit}
                    <p>123123</p>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .account_wrap {
        padding: 20px;
        color: #fff;
    }

    .accounts_list{
        li {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            padding: 30px 0 10px;
        }
    }

    .account_name {
        font-weight: bold;
    }
    .account_value {
        color: lightgreen;
    }

    .create_account_box {
        display: flex;
        input {
            padding: 12px 7px;
            flex: 1;
            margin-right: 10px;
            background: #26282f;
            color: #fff;
            font-size: 13px;
            border: 0;
            width: 100%;
            border-radius: 2px;
            transition: .2s;
            outline: 0;
            &::placeholder{
                font-style: italic;
                font-size: 13px;
            }

            &:hover {
                box-shadow: 0 0 1px 1px rgba(55, 239, 186, .5);
            }

            &:focus, &:active {
                box-shadow: 0 0 1px 1px rgba(55, 239, 186, 1);
            }
        }

        button {
            color: #a3a3a3;
            border: 0;
            background: transparent;
            border-radius: 2px;
            display: block;
            font-size: 13px;
            padding: 10px 15px;
            outline: 0;
            cursor: pointer;
            border: 1px solid #a3a3a3;
            transition: .2s;
            &:hover{
                color: rgba(55, 239, 186, .7);
                border-color: #fff;
            }
        }
    }
</style>