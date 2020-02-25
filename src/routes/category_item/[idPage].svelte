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

    let { id, name, visible } = categoryService.getElem(idPage);

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

        categoryItemService.addOperationItem(commentValue, moneyValue, idPage, selectedAccount, name);

        items = categoryItemService.get({categoryId: idPage});
        moneyValue = '';
        commentValue = '';
    }

    const removeItem = (idOperation) => {
        categoryItemService.removeOperationItem(idOperation);
        items = categoryItemService.get({categoryId: idPage});
    }

    const editItem = (id, value, name, account) => {
        categoryItemService.editOperationItem(id, value, name, account);
        
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
        <h1>{name}</h1>
        <div class="page_top_inp">
            <input type="number" placeholder="введите сумму" bind:value={moneyValue}>
            <BankAccountSelect bind:selectValue={ selectedAccount } />

        </div>
        <textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
        <ButtonApply on:click={addItem}>Добавить</ButtonApply>

        {#if items.length > 0}
            <div class="description">Список операций</div>
            <ul class="money_list">
                {#each items as operation, i}
                    <li class="money_item plus" 
                        class:minus={operation.operationValue < 0} 
                        in:slide out:slide>

                        <div class="money_item-value">
                            { operation.operationValue } ({operation.bankAccount})
                        </div>
                        <div class="money_item-comment">{ operation.operationName }</div>
                        <button class="remove_item"
                            on:click={ removeItem(operation.id) }><i class="material-icons">close</i></button>

                        <button class="edit_item" on:click={ 
                            editItem(
                                operation.id, 
                                operation.operationValue, 
                                operation.operationName,
                                operation.bankAccount
                            )}><i class="material-icons">edit</i></button>
                        
                        {#if operation.visibleEdit}
                            <div class="edit_operation_box" transition:slide>
                                <input type="number" 
                                    bind:value={operation.operationValue}>
                                <textarea 
                                    bind:value={operation.operationName}></textarea>
                                <BankAccountSelect bind:selectValue={ operation.bankAccount } />
                                <button type="submit" on:click={
                                    editItem(
                                        operation.id, 
                                        operation.operationValue, 
                                        operation.operationName,
                                        operation.bankAccount
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
    .page_top_inp {
        display: flex;
        margin-bottom: 10px;
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
        padding: 10px 10px 10px 25px;
        margin-bottom: 15px;
        position: relative;

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

    .money_item-value {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #ffffff;
    }

    .money_item-comment {
        font-style: italic;
        font-size: 14px;
        color: #a3a3a3;
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
        top: 0; right: 0px;
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
        top: 0; right: 40px;
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }
</style>