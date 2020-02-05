<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>

    import CategoryService from '../../service-finance';
    export let idPage;
    let categoryService = new CategoryService();
    let { id, name, visible } = categoryService.getElem(idPage);

    let moneyValue = '';
    let commentValue = '';
    let categoryId = idPage;

    let operationsArray = JSON.parse(localStorage.getItem(`${categoryId}`));
    if(operationsArray === null) {
        operationsArray = [];
        localStorage.setItem(`${categoryId}`, JSON.stringify(operationsArray));
    }

    
    localStorage.setItem(`${categoryId}`, JSON.stringify(operationsArray.filter(e => e.categoryId === idPage)))


    const addItem = () => {
        if(moneyValue === '') {
            return;
        };

        let elem = operationsArray[operationsArray.length - 1];

        if(elem === undefined) {
            elem = 1;
        };

        let newObj = {
            id     : elem.id === undefined ? 1: elem.id + 1,
            operationName   : commentValue,
            operationValue: moneyValue,
            categoryId: categoryId
        };

        operationsArray = [...operationsArray, newObj];
        moneyValue = '';
        commentValue = '';

        localStorage.setItem(`${categoryId}`, JSON.stringify(operationsArray));
    }

    const removeItem = (id) => {
        operationsArray = operationsArray.filter(e => e.id !== id);
        localStorage.setItem(`${categoryId}`, JSON.stringify(operationsArray));
    }

</script>

<h1>{name}</h1>
<input type="number" placeholder="введите сумму" bind:value={moneyValue}>
<textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
<button class="add_item" on:click={addItem}>Добавить</button>

{#if operationsArray.length > 0}
    <div class="description">Список операций</div>
    <ul class="money_list">
        {#each operationsArray as {id, operationName, operationValue}, i}
            <li class="money_item">
                <div class="money_item-value">{ operationValue }</div>
                <div class="money_item-comment">{ operationName }</div>
                <button class="remove_item" on:click={ removeItem(id) }></button>
                <button class="edit_item"></button>
            </li>
        {/each}
    </ul>
{:else}
    <div class="description">Добавьте операцию</div>
{/if}

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