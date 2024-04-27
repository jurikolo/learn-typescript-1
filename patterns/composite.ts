abstract class DeliveryItem {
    items: DeliveryItem[] = [];

    addItem(item: DeliveryItem) {
        this.items.push(item);
    }

    getItemPrices(): number {
        // loop over all child elements, get price and add to result
        return this.items.reduce((acc: number, i: DeliveryItem) => acc += i.getPrice(), 0);
    }

    abstract getPrice(): number;
}

export class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
        super();
    }

    getPrice(): number {
        return this.getItemPrices() + this.deliveryFee;
    }
}

export class Package extends DeliveryItem {
    getPrice(): number {
        return this.getItemPrices();
    }
}

export class Product extends DeliveryItem {
    constructor(private price: number) {
        super();
    }

    getPrice(): number {
        return this.price;
    }
}

const shop = new DeliveryShop(100);
shop.addItem(new Product(1000));

const package1 = new Package();
package1.addItem(new Product(200));
package1.addItem(new Product(450));
shop.addItem(package1);

const package2 = new Package();
package2.addItem(new Product(30));
shop.addItem(package2);

console.log(shop.getPrice());