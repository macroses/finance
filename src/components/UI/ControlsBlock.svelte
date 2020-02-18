<script>
    // your script goes here
</script>

<div class="control_box">
    <button on:click><i class="material-icons">edit</i></button>
    <button on:click><i class="material-icons">close</i></button>
</div>

<style>
    .control_box {
        position: absolute;
        right: -13px;
        top: 27px;
    }

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
    }

    button:hover{
        color: #fff;
    }
</style>