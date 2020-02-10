export default class CategoryItemService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('operations'));
    }
    
    getElem (pageId) {
        return this.items.filter(e => e.id == pageId)[0];
    }

    removeItem (id) {
        return this.items.filter(e => e.id !== id);
    }

    editItem (id, name) {
        let elem = this.items.filter(a => a.id === id);
        elem[0].name = name;
        elem[0].visible = !elem[0].visible;
        return this.items;
    }

    addItem (id, name, value, pageId) {
        let newObj = {
            id            : id === undefined ? 1: id + 1,
            operationName : name,
            operationValue: value,
            visibleEdit   : false,
            categoryId    : pageId
        };

        return this.items = [...this.items, newObj];
    }
};