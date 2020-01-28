<script context="module">
	export async function preload(page, session) {
		let idNum = page.params;
        let data = JSON.parse(localStorage.getItem('arr'))
		return console.log(data);;
    }
</script>

<script>
    export let pageId;
</script>

<p >новая страница {idNum}</p>