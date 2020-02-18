export default class AccountService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('accounts'));

        this._writeLocalStorage = (arr) => {
            localStorage.setItem('accounts', JSON.stringify(arr));
        }

        if(this.items === null) {
            this.items = [];
            this._writeLocalStorage([]);
        }
    }
    
    get() {
        return this.items;
    }

    removeAccountItem (id) {
        this.items = this.items.filter(e => e.id !== id);
        this._writeLocalStorage(this.items);
    }

    editAccountItem (id, name, value) {
        let elem = this.items.filter(e => e.id === id);

        elem[0].visibleEdit = !elem[0].visibleEdit;
        elem[0].accName = name;
        elem[0].accValue = value;

        this.items = this.items;
        this._writeLocalStorage(this.items);
    }

    addAccountItem (name, value) {
        let elem = this.items[this.items.length - 1];

        if(elem === undefined) {
            elem = 1;
        };

        let newObj = {
            id            : elem.id === undefined ? 1 : elem.id + 1,
            accName : name,
            accValue: value,
            visibleEdit   : false
        };

        this.items = [...this.items, newObj];

        this._writeLocalStorage(this.items);

        return newObj;
    }
};