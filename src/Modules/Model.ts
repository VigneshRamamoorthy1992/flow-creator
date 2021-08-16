export enum EntityType {
    Customer = "Customer",
    PaymentMode = "PaymentMode",
    Merchant = "Merchant",
    Common = "",
}

export enum ElementType {
    DropArea = "dropArea",
    Connector = "connector",
    ItemContent = "itemContent"
}

export interface BaseEntity {
    entityType: EntityType;
    entityTypeName: string;
    type: ElementType,
    selected: boolean,
}

export interface Customer extends BaseEntity {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerBankCode: string;
}

export interface PaymentMode extends BaseEntity {
    paymentModeId: string;
    paymentMode: string;
    issuer: string;
    last4DigitsAccNo: string;
    payeeCode: string;
}

export interface Merchant extends BaseEntity {
    merchantId: string;
    merchantName: string;
    merchantCode: string;
    merchantBankCode: string;
}

export interface ItemFields extends BaseEntity {
    id: string;
    name: string;
    code: string;
}

export type BusinessEntity = ItemFields | Merchant | PaymentMode | Customer;

export interface Catagory {
    entityType: EntityType,
    entityTypeName: string,
}
