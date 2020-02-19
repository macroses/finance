<script>
    import {fly, slide, fade} from 'svelte/transition';
    import AccountService from '../service-acc';
    import ButtonApply from '../components/UI/ButtonApply.svelte';
    import InputText from '../components/UI/InputText.svelte';
    // import OperationWithAccaunt from '../components/OperationWIthAccount.svelte';

    let accountName = '';
    let accountValue = '';
    let accountService = new AccountService();
    let accountItems = accountService.items;
    let operationsFromAcc = false;

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

    // операции связанные с определнным счетом
    let operationsNameArr = JSON.parse(localStorage.getItem('operations'));

    const onShowOperations = (e) => {
        operationsFromAcc = !operationsFromAcc;
    }

</script>

<svelte:head>
    <title>Счета</title>
</svelte:head>

<div class="account_wrap" out:slide>
    <div class="create_account_box">
        <input type="text" placeholder="Введите название счета" bind:value={ accountName }>
        <input type="number" placeholder="Количество средств на счете" bind:value={ accountValue }>
        <ButtonApply on:click={ addAccItem }>Добавить</ButtonApply>
    </div>
    <ul class="accounts_list">
        {#each accountItems as item}
            <li on:click={onShowOperations}>
                <div class="account_name">{ item.accName }</div>
                <div class="account_value">{ item.accValue }</div>
                <i class="material-icons">arrow_drop_down</i>
                <div class="control_box">
                    <button class="edit" on:click={ editAccItem(item.id, item.accName, item.accValue) }><i class="material-icons">edit</i></button>
                    <button class="remove" on:click={ removeAccItem(item.id) }><i class="material-icons">close</i></button>
                </div>

                {#if item.visibleEdit}
                    <div class="edit_box">
                        <InputText bind:newValue={ item.accName } pholder />
                        <input type="number" bind:value={ item.accValue } />
                        <ButtonApply on:click={ editAccItem(item.id, item.accName, item.accValue) } ><i class="material-icons">check</i></ButtonApply>
                    </div>
                {/if}

                <!-- список операций привязанный к конкретному счету -->
                {#if operationsFromAcc}
                    <h4>Последние 5 операций по счету "{item.accName}"</h4>
                    <ul transition:slide>
                        {#each operationsNameArr.filter(e => e.bankAccount === item.accName) as concatArraysitem, i}
                            <li> {concatArraysitem.operationName} </li>
                        {/each}
                    </ul>
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
            font-size: 16px;
            align-items: center;
            padding: 30px 0 10px;
            position: relative;
            cursor: pointer;
        }
    }

    .account_name {
        font-weight: bold;
        margin-right: 20px;
    }
    .account_value {
        color: lightgreen;
        margin-right: 20px;
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
    }

    .control_box {
        position: absolute;
        right: -13px;
        top: 27px;
        button {
            display: inline-block;
            width: 40px;
            height: 100%;
            z-index: 2;
            background-color: transparent;
            color: #a3a3a3;
            border: 0;
            outline: 0;
            cursor: pointer;
            &:hover{
                color: #fff;
            }
        }
    }

    .edit_box {
        position: absolute;
        display: flex;
    }
</style>