<script>
    import {fly, slide, fade} from 'svelte/transition';
    import AccountService from '../service-acc';
    import CategoryItemService from './category_item/service-category-item.js';
    import ButtonApply from '../components/UI/ButtonApply.svelte';
    import InputText from '../components/UI/InputText.svelte';

    let accountName = '';
    let accountValue = '';
    let accountService = new AccountService();
    let accountItems = accountService.items;

    // операции связанные с определнным счетом
    let operationsNameArr = JSON.parse(localStorage.getItem('operations'));

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

    const removeAccItem = (id) => {
        accountService.removeAccountItem(id);
        accountItems = accountService.get();
    }

    
    const showOperation = (e) => {
        e.operationAccVisible = !e.operationAccVisible;
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
        <ButtonApply on:click={ addAccItem }>Добавить</ButtonApply>
    </div>
    <ul class="accounts_list">
        {#each accountItems as item(item.id)}
            <li transition:slide>
                <div class="main_item_content">
                    <div class="account_name">{ item.accName }</div>
                    <div class="account_value">{ item.accValue }</div>
                    {#if operationsNameArr.length > 0}
                        <i class="material-icons" on:click={ showOperation(item) }>arrow_drop_down</i>
                    {/if}
                    <div class="control_box">
                        <button class="remove" on:click={ removeAccItem(item.id) }><i class="material-icons">close</i></button>
                    </div>
                </div>
                <!-- список операций привязанный к конкретному счету -->
                {#if item.operationAccVisible}
                    <div class="additional_info" transition:slide>
                        <h4>Последние 5 операций по счету "{item.accName}"</h4>
                        <ul>
                            {#each operationsNameArr.filter(e => e.bankAccount === item.accName) as concatArraysitem, i}
                                <li>
                                    <div class="category_name">
                                        {concatArraysitem.operationCategoryName}
                                        
                                        <span class="operation_value"
                                            class:minus={!concatArraysitem.positiveOperation}>
                                            {concatArraysitem.operationValue}
                                        </span>

                                        ({concatArraysitem.postDate})
                                    </div>
                                    <div class="operation_comment">{concatArraysitem.operationName}</div>
                                </li>
                            {/each}
                        </ul>
                    </div>
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

    .category_name {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .operation_value {
        font-weight: bold;
        margin-bottom: 10px;
        color: rgba(55, 239, 186, 1);
        &.minus {
            color: lightpink;
        }
    }

    .operation_comment {
        font-style: italic;
        color: #a3a3a3;
    }

    .accounts_list{
        li {
            display: flex;
            flex-direction: column;

            font-size: 16px;
            align-items: flex-start;
            justify-content: center;
            padding: 30px 0 10px;
            position: relative;
            i {
                cursor: pointer;
            }
        }
    }

    .main_item_content {
        display: flex;
        align-items: center;
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

    .additional_info {
        margin-top: 10px;
        width: 100%;
        h4 {
            font-size: 14px;
            color: #a3a3a3;
            margin-left: 20px;
        }

        ul {
            margin-left: 40px;
            margin-right: 20px;
            border-bottom: 1px solid gray;
        }
    }
</style>