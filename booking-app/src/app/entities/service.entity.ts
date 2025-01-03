// Service entity
export class ServiceEntity {
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    name?: string;
    price?: number;
}