export default class CategoryService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('arr'));
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

    addItem (id, name, icon) {
        let newObj = {
            id     : id === undefined ? 1: id + 1,
            name   : name,
            visible: false,
            icon  : icon,
        }

        return this.items = [...this.items, newObj];
    }
};