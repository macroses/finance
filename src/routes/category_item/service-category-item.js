export default class CategoryItemService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('operations'));

        this._writeLocalStorage = (arr) => {
            localStorage.setItem('operations', JSON.stringify(arr));
        }

        if(this.items === null) {
            this.items = [];
            this._writeLocalStorage([]);
        }
    }
    
    get(options) {
        if(options != null && options.categoryId != null)
            return this.items.filter(a => a.categoryId == options.categoryId);

        return this.items;
    }

    getOperationItem (pageId) {
        return this.items.filter(e => e.id == pageId)[0];
    }

    removeOperationItem (id) {
        this.items.filter(e => e.id !== id);
        return this._writeLocalStorage(this.items);
    }

    editOperationItem (id, name) {
        let elem = this.items.filter(a => a.id === id);
        elem[0].name = name;
        elem[0].visible = !elem[0].visible;
        return this.items;
    }

    addOperationItem (name, value, pageId) {
        let elem = this.items[this.items.length - 1];

        if(elem === undefined) {
            elem = 1;
        };

        let newObj = {
            id            : elem.id === undefined ? 1 : elem.id + 1,
            operationName : name,
            operationValue: value,
            visibleEdit   : false,
            categoryId    : pageId
        };

        this.items = [...this.items, newObj];

        this._writeLocalStorage(this.items);

        return newObj;
    }
};