class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number
    ) {}
}

class Delivery {
    constructor(
        public date: Date
    ) {}
}

class HomeDelivery extends Delivery {
    constructor(date: Date, public address: string) {
        super(date)
    }
}

type DeliveryOptions = HomeDelivery | ShopDelivery

class ShopDelivery extends Delivery {
    constructor(public shopId: number) {
        super(new Date())
    }
}

class Cart {
    private products: Product[] = []
    private delivery: HomeDelivery | ShopDelivery

    // Добавить продукт
    public addProduct(product: Product): void {
        this.products.push(product)
    }

    // Удалить продукт
    public deleteProduct(productId: number) {
        this.products = this.products.filter((p: Product) => p.id !== productId)
    }


    public getSum(): number {
        return this.products
            .map((p:Product) => p.price)
            .reduce((p1: number, p2: number) => p1 + p2)
    }

    public setDelivery (delivery: DeliveryOptions): void {
        this.delivery = delivery
    }

    // Проверка на наличие товара и доставки
    public checkOut() {
        if (this.products.length == 0) {
            throw new Error('Нет нии одного товара в корзине')
        }
        if (!this.delivery) {
            throw new Error('Не указан способ доставки')
        }
        return {success: true}
    }
}

const cart = new Cart()
cart.addProduct(new Product(1, 'Яблоко', 14))
cart.addProduct(new Product(2, 'хлеб-француз', 88))
cart.addProduct(new Product(3, 'Свеча', 227))
cart.deleteProduct(1)
cart.setDelivery(new HomeDelivery(new Date(), 'лубянка 2/1'))

console.log(cart.getSum())
console.log(cart.checkOut())