<button on:click>
    <slot></slot>
</button>

<style>
    button {
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
    }

    button:hover{
        color: rgba(55, 239, 186, .7);
        border-color: #fff;
    }
</style>