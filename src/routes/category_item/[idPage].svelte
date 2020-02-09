<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>
    import {fly, slide, fade} from 'svelte/transition';
    import { beforeUpdate } from 'svelte';
    import CategoryService from '../../service-finance';
    import CategoryItemService from './service-category-item.js';

    export let idPage;
    let categoryService = new CategoryService();
    let categoryItemService = new CategoryItemService();

    let { id, name, visible } = categoryService.getElem(idPage);

    let moneyValue = '';
    let commentValue = '';

    let operationsArray = JSON.parse(localStorage.getItem('operations'));
    if(operationsArray === null) {
        operationsArray = [];
        localStorage.setItem('operations', JSON.stringify(operationsArray));
    }

    let newArr;

    // перед апдейтом отфильтруем отображаемый массив из стора.
    beforeUpdate(() => {
		newArr = operationsArray.filter(e => e.categoryId === idPage);
	});

    // валидация цифрового инпута
    function onlydigits(node) {
        function clean_value(){
            node.value = node.value.replace(/[^\d]/g,'');
        }
        node.addEventListener('input',clean_value);
    }

    const addItem = () => {
        if(moneyValue === '') {
            return;
        } else if (commentValue === '') {
            commentValue = '<Без комментария>'
        };

        let elem = operationsArray[operationsArray.length - 1];

        if(elem === undefined) {
            elem = 1;
        };

        let newObj = {
            id            : elem.id === undefined ? 1: elem.id + 1,
            operationName : commentValue,
            operationValue: moneyValue,
            visibleEdit   : false,
            categoryId    : idPage
        };

        operationsArray = [...operationsArray, newObj];
        moneyValue = '';
        commentValue = '';

        localStorage.setItem('operations', JSON.stringify(operationsArray));
    }

    const removeItem = (id) => {
        operationsArray = operationsArray.filter(e => e.id !== id);
        localStorage.setItem('operations', JSON.stringify(operationsArray));
    }

    const editItem = (id, value, name) => {
        let elem = operationsArray.filter(e => e.id === id);
        elem[0].visibleEdit = !elem[0].visibleEdit;

        elem[0].operationValue = value;
        elem[0].operationName = name;

        operationsArray = operationsArray;
        localStorage.setItem('operations', JSON.stringify(operationsArray));
    }

</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div class="page-wrap" out:slide>
    <h1>{name}</h1>
    <input type="number" placeholder="введите сумму" bind:value={moneyValue} use:onlydigits>
    <textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
    <button class="add_item" on:click={addItem}>Добавить</button>

    {#if operationsArray.length > 0}
        <div class="description">Список операций</div>
        <ul class="money_list">
            {#each newArr as operation, i}
                <li class="money_item" in:slide out:slide>
                    <div class="money_item-value">{ operation.operationValue }</div>
                    <div class="money_item-comment">{ operation.operationName }</div>
                    <button class="remove_item" on:click={ removeItem(operation.id) }></button>
                    <button class="edit_item" on:click={ 
                        editItem(
                            operation.id, 
                            operation.operationValue, 
                            operation.operationName
                        )}></button>
                    
                    {#if operation.visibleEdit}
                        <div transition:slide="{{ y: 20, duration: 200 }}">
                            <input type="text" 
                                use:onlydigits bind:value={operation.operationValue}>
                            <textarea 
                                bind:value={operation.operationName}></textarea>
                            <button type="submit" on:click={
                                editItem(
                                    operation.id, 
                                    operation.operationValue, 
                                    operation.operationName
                                )}>submit</button>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    {:else}
        <div class="description">Добавьте операцию</div>
    {/if}
</div>

<style>
    h1 {
        font-size: 50px;
        text-align: center;
    }

    input[type=number], textarea {
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
        font-size: 22px;
    }

    .money_item {
        padding: 10px;
        border: 1px solid lightgray;
        margin-bottom: 5px;
        position: relative;
    }

    .money_item-value {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .money_item-comment {
        font-style: italic;
    }
    
    .description{
        color: gray;
        font-size: 30px;
        margin: 20px 0 10px;
        text-align: center;
    }

    .add_item{
        padding: 10px;
    }

    .remove_item {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 10px;
        background: url(../img/close.svg) no-repeat;
        background-size: contain;
        display: inline-block;
        border: 1px solid lightgray;
        border-radius: 3px;
        width: 20px;
        height: 20px;
    }

    .edit_item {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 40px;
        background: url(../img/pen.svg) no-repeat;
        background-size: contain;
        display: inline-block;
        border: 1px solid lightgray;
        border-radius: 3px;
        width: 20px;
        height: 20px;
    }
</style>