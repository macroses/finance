export default class CategoryService {
    constructor(items = []) {
        this.items = items;
    }
    
    // получение элемента из стора
    getStoreElem (arr, pageId){
        arr = arr.filter(e => e.id == pageId);
        return arr[0];
    }
};