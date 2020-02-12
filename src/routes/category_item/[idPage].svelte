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

    export let idPage;
    let categoryService = new CategoryService();
    let categoryItemService = new CategoryItemService();

    let { id, name, visible } = categoryService.getElem(idPage);

    let moneyValue = '';
    let commentValue = '';

    let items = categoryItemService.get({categoryId: idPage});
    
    // валидация цифрового инпута
    function onlydigits(node) {
        // function clean_value(){
        //     node.value = node.value.replace(/[^\d]/g,'');
        // }
        // node.addEventListener('input',clean_value);
    }

    const addItem = () => {
        if(moneyValue === '') {
            return;
        } else if (commentValue === '') {
            commentValue = '<Без комментария>'
        };

        categoryItemService.addOperationItem(commentValue, moneyValue, idPage);

        items = categoryItemService.get({categoryId: idPage});
        moneyValue = '';
        commentValue = '';
    }

    const removeItem = (idOperation) => {
        categoryItemService.removeOperationItem(idOperation);
        items = categoryItemService.get({categoryId: idPage});
    }

    const editItem = (id, value, name) => {
        categoryItemService.editOperationItem(id, value, name);
        items = categoryItemService.get({categoryId: idPage});
    }

</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div class="page-wrap" in:scale="{{duration: 500, opacity: 0.5, start: 0}}" out:slide>
    <h1>{name}</h1>
    <input type="number" placeholder="введите сумму" bind:value={moneyValue} use:onlydigits>
    <textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
    <button class="add_item" on:click={addItem}>Добавить</button>

    {#if items.length > 0}
        <div class="description">Список операций</div>
        <ul class="money_list">
            {#each items as operation, i}
                <li class="money_item plus" 
                    class:minus={operation.operationValue < 0} 
                    in:slide out:slide>

                    <div class="money_item-value">{ operation.operationValue }</div>
                    <div class="money_item-comment">{ operation.operationName }</div>
                    <button class="remove_item"
                        on:click={ removeItem(operation.id) }><i class="material-icons">close</i></button>

                    <button class="edit_item" on:click={ 
                        editItem(
                            operation.id, 
                            operation.operationValue, 
                            operation.operationName
                        )}><i class="material-icons">edit</i></button>
                    
                    {#if operation.visibleEdit}
                        <div class="edit_operation_box" transition:slide>
                            <input type="number" 
                                use:onlydigits 
                                bind:value={operation.operationValue}>
                            <textarea 
                                bind:value={operation.operationName}></textarea>
                            <button type="submit" on:click={
                                editItem(
                                    operation.id, 
                                    operation.operationValue, 
                                    operation.operationName
                                )}><i class="material-icons">check</i></button>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    {:else}
        <div class="description">Добавьте операцию</div>
    {/if}
</div>

<style lang="scss">
    .page-wrap {
        padding: 0 20px;
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
        margin-bottom: 10px;
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

    .add_item{
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