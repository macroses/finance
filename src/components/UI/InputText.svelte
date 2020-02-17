<script>
    export let pholder;
    export let inpValue;
</script>

<input type="text" placeholder={pholder} value={inpValue}>

<style lang="scss">
    input {
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
</style>