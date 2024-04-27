class Product {
    constructor(
    private _id: number,
    private _name: string,
    private _price: number
    ) { }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

}

class Delivery {
    constructor(public date: Date,) {}
}

class HomeDelivery extends Delivery {
    constructor(date: Date, public address: string) {
        super(date);
    }
}

class ShopDelivery extends Delivery {
    constructor(public shopId: number) {
        super(new Date());
    }
}


class Cart {
    private products: Product[] = [];
    private delivery: HomeDelivery | ShopDelivery;

    public addProduct(p: Product): void {
        this.products.push(p);
    }

    public removeProductById(id: number): void {
        this.products = this.products.filter((p: Product) => p.id !== id);
    }

    public getPrice(): number {
        let totalPrice: number = 0;
        for (const product of this.products) {
            totalPrice += product.price;
        }
        return totalPrice;

        // alternate implementation using map reduce
    }

    public setDelivery(delivery: HomeDelivery | ShopDelivery) {
        this.delivery = delivery;
    }

    public checkout(): boolean {
        if (this.products.length === 0) {
            throw new Error('No products added to cart');
        }
        if (!this.delivery) {
            throw new Error('No delivery selected');
        }
        return true;
    }
}

const cart = new Cart();

cart.addProduct(new Product(1, "cookies", 42));
cart.addProduct(new Product(2, "candies", 53));
console.log(cart.getPrice());
cart.removeProductById(1);
cart.setDelivery(new ShopDelivery(13));
if (cart.checkout()) {
    console.log('Checkout successfully');
}