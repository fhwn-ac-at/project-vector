// Service entity
export class ServiceEntity {
    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    id?: string;
    name?: string;
    price?: number;
}