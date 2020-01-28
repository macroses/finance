<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>
    export let idPage;
    let arrFromStore = JSON.parse(localStorage.getItem('arr')).filter(e => e.id == idPage);
    const { id, name, visible } = arrFromStore[0];
</script>

<p>новая страница {name}</p>