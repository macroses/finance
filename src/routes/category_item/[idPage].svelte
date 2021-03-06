<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>
    import {fly, slide, fade, scale} from 'svelte/transition';

    import CategoryService from '../../service-finance';
    import CategoryItemService from './service-category-item.js';
    import AccountService from '../../service-acc.js'; 

    import BankAccountSelect from '../../components/BankAccaunt.svelte';
    import ButtonApply from '../../components/UI/ButtonApply.svelte';

    export let idPage;

    let accountService = new AccountService();
    let categoryService = new CategoryService();
    let categoryItemService = new CategoryItemService();

    let { id, name, visible, icon } = categoryService.getElem(idPage);

    let positiveOperation = false;

    let moneyValue = '';
    let commentValue = '';
    $: selectedAccount = '';

    let bankAccArray = JSON.parse(localStorage.getItem('accounts'));

    let items = categoryItemService.get({categoryId: idPage});

    const addItem = () => {
        if(moneyValue === '') {
            return;
        } else if (commentValue === '') {
            commentValue = '<Без комментария>'
        } else if (selectedAccount === '') {
            alert('Выберите счет');
            return;
        }

        categoryItemService.addOperationItem(
            commentValue, 
            moneyValue, 
            idPage, 
            selectedAccount, 
            name, 
            positiveOperation
        );

        items = categoryItemService.get({categoryId: idPage});
        moneyValue = '';
        commentValue = '';
        positiveOperation = false;
    }

    const removeItem = (idOperation) => {
        categoryItemService.removeOperationItem(idOperation);
        items = categoryItemService.get({categoryId: idPage});
    }

    const editItem = (id, value, name, account, time, date) => {
        categoryItemService.editOperationItem(id, value, name, account, time, date);
        items = categoryItemService.get({categoryId: idPage});
    }

</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div class="page-wrap" in:scale="{{duration: 500, opacity: 0.5, start: 0}}" out:slide>
    {#if accountService.items.length === 0}
        <a href="accounts">Сначала добавьте счет</a>
    {:else}
        <h1>
            {name}
            <i class="material-icons">{icon}</i>
        </h1>

        <label class="consumption">
            <input type="checkbox" bind:checked={positiveOperation}>
            <span class="title">Доход</span>
            <span class="descr">
                ?
                <span class="descr_content">Операация по умолчанию - <span class="minus">"расход"</span>. Выберите <span class="plus">"доход"</span>, если вы получили какую-то прибыль (возврат денег, премия, подарок и пр.)</span>
            </span>
        </label>
        
        <div class="page_top_inp">
            <input type="number"bind:value={moneyValue} placeholder="сумма">
            <BankAccountSelect bind:selectValue={ selectedAccount } />
        </div>
        <textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
        <ButtonApply on:click={addItem}>Добавить</ButtonApply>

        {#if items.length > 0}
            <div class="description"  transition:slide>Список операций</div>
            <div class="table_head" transition:slide>
                <div class="cell cell_money">Сумма</div>
                <div class="cell cell_account">Название счета</div>
                <div class="cell cell_comment">Комментарий</div>
                <div class="cell cell_time">Время операции</div>
            </div>
            <ul class="money_list">
                {#each items as operation (operation.id)}
                    <li class="money_item plus" 
                        class:minus={!operation.positiveOperation} 
                        transition:slide>

                        <div class="cell money_item-value">
                            { operation.operationValue }
                        </div>
                        <div class="cell cell_account">{ operation.bankAccount }</div>
                        <div class="cell cell_comment">
                            <span title={ operation.operationName }>{ operation.operationName }</span>    
                        </div>
                        <div class="cell cell_time">{ operation.postTime } { operation.postDate }</div>
                        <button class="remove_item"
                            on:click={ removeItem(operation.id) }><i class="material-icons">close</i></button>

                        <button class="edit_item" on:click={ 
                            editItem(
                                operation.id, 
                                operation.operationValue, 
                                operation.operationName,
                                operation.bankAccount,
                                operation.postTime,
                                operation.postDate
                            )}><i class="material-icons">edit</i></button>
                        
                        {#if operation.visibleEdit}
                            <div class="edit_operation_box" transition:slide>
                                <input type="number" 
                                    bind:value={operation.operationValue}>
                                <textarea 
                                    bind:value={operation.operationName}></textarea>
                                <BankAccountSelect bind:selectValue={ operation.bankAccount } />
                                <input type="date" bind:value={operation.postDate}>
                                <button type="submit" on:click={
                                    editItem(
                                        operation.id, 
                                        operation.operationValue, 
                                        operation.operationName,
                                        operation.bankAccount,
                                        operation.postTime,
                                        operation.postDate
                                    )}><i class="material-icons">check</i></button>
                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        {:else}
            <div class="description">Добавьте операцию</div>
        {/if}
    {/if}
</div>

<style lang="scss">
    .table_head {
        display: flex;
        color: #fff;
        font-weight: bold;
        margin-bottom: 15px;
        padding-right: 45px;
    }

    .cell {
        flex: 1;
        text-align: center;
        color: #fff;
        text-align: center;
    }

    .cell_comment {
        overflow: hidden;
        span {
            display: inline-block;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .consumption {
        cursor: pointer;
        display: flex;
        margin-bottom: 10px;
        input {
            display: none;
        }

        .title {
            display: flex;
            align-items: center;
            position: relative;
            color: #fff;
            margin-left: 5px;
            &:before {
                content: '\e835';
                font-size: 20px;
                font-family: 'Material Icons';
                position: relative;
                left: -5px;
            }
        }

        input:checked + .title:before {
            content: '\e834';
            font-size: 20px;
            font-family: 'Material Icons';
            color: rgba(55, 239, 186, 1);
        }


        .descr {
            display: inline-block;
            border: 1px solid #a3a3a3;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            position: relative;
            margin-left: 10px;
            font-size: 11px;
            color: #fff;
            text-align: center;
            .plus {
                color: green;
            }

            .minus {
                color: red;
            }

            &:hover .descr_content {
                display: block;
            }
        }

        .descr_content {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 250px;
            border-radius: 4px;
            background: #424250;
            color: #a3a3a3;
            padding: 10px;
            border: 1px solid;
            box-shadow: 2px 2px 10px 2px rgba(0,0,0, .5);
            display: none;
            font-size: 11px;
            z-index: 2;
        }
    }

    .page_top_inp {
        display: flex;
        margin-bottom: 10px;
        position: relative;
    }       

    .page-wrap {
        padding: 0 20px;
        a {
            color: #fff;
            padding: 20px 0;
            display: inline-block;
        }
    }

    .edit_operation_box{
        width: 100%;
        margin-top: 10px;
        display: flex;
        input[type=number] {
            font-size: 22px;
            font-weight: bold;
            padding: 10px;
            flex: 1;
            margin-right: 10px;
            margin-bottom: 0;
        }

        textarea {
            flex : 1;
            margin-right: 10px;
            resize: none;
            margin-bottom: 0;
        }

        button {
            padding: 6px 10px;
            background: transparent;
            border-radius: 2px;
            color: #fff;
            border: 1px solid #fff;
            opacity: .5;
            cursor: pointer;
            transition: .2s;
            margin-bottom: 0;
            &:hover{
                opacity: 1;
                color: rgba(55, 239, 186, 1); 
            }
        }
    }

    h1 {
        font-size: 30px;
        color: #ffffff;
        display: flex;
        align-items: center;
        i {
            display: inline-block;
            margin-left: 20px;
        }
    }

    input[type=number], textarea {
        margin-right: 10px;
        padding: 12px 7px;
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

    .money_item {
        padding: 10px 45px 10px 0;
        margin-bottom: 15px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
        }

        &.plus {
            &:before{
                background: rgba(55, 239, 186, 1);
            }
        }

        &.minus {
            &:before {
                background: lightpink;
            }
        }
    }
    
    .description{
        color: gray;
        font-size: 30px;
        margin: 20px 0 10px;
        text-align: center;
    }

    .remove_item {
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 40px;
        z-index: 2;
        background-color: transparent;
        color: #a3a3a3;
        top: -2px; right: -20px;
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }

    .edit_item {
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 40px;
        z-index: 2;
        background-color: transparent;
        color: #a3a3a3;
        top: -2px; right: 5px;
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }
</style>