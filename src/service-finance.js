export default class CategoryService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('arr'));
        this.icons = ['3d_rotation','ac_unit','access_alarm','access_alarms','access_time','accessibility','accessible','account_balance','account_balance_wallet','account_box','account_circle','adb','add','add_a_photo','add_alarm','add_alert','add_box','add_circle','add_circle_outline','add_location','add_shopping_cart','add_to_photos','add_to_queue','adjust','airline_seat_flat','airline_seat_flat_angled','airline_seat_individual_suite','airline_seat_legroom_extra','airline_seat_legroom_normal','airline_seat_legroom_reduced','airline_seat_recline_extra','airline_seat_recline_normal','airplanemode_active','airplanemode_inactive','airplay','airport_shuttle'];
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