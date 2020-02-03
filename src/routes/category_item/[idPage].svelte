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
</script>

<p>новая страница {name}</p>