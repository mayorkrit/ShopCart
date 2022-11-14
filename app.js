"use strict";
class Product {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, address) {
        super(date);
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.products = [];
    }
    // Добавить продукт
    addProduct(product) {
        this.products.push(product);
    }
    // Удалить продукт
    deleteProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    getSum() {
        return this.products
            .map((p) => p.price)
            .reduce((p1, p2) => p1 + p2);
    }
    setDelivery(delivery) {
        this.delivery = delivery;
    }
    // Проверка на наличие товара и доставки
    checkOut() {
        if (this.products.length == 0) {
            throw new Error('Нет нии одного товара в корзине');
        }
        if (!this.delivery) {
            throw new Error('Не указан способ доставки');
        }
        return { success: true };
    }
}
const cart = new Cart();
cart.addProduct(new Product(1, 'Яблоко', 14));
cart.addProduct(new Product(2, 'хлеб-француз', 88));
cart.addProduct(new Product(3, 'Свеча', 227));
cart.deleteProduct(1);
cart.setDelivery(new HomeDelivery(new Date(), 'лубянка 2/1'));
console.log(cart.getSum());
console.log(cart.checkOut());
