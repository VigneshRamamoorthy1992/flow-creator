import { BusinessEntity, Catagory, ElementType, EntityType } from "./Model";

export const CATAGORIES: Catagory[] = [
    { entityType: EntityType.Customer, entityTypeName: "Customer" },
    { entityType: EntityType.Merchant, entityTypeName: "Merchant" },
    { entityType: EntityType.PaymentMode, entityTypeName: "Payment Mode" },
    {
        entityType: EntityType.Common,
        entityTypeName: "Payment Service Providers",
    },
    { entityType: EntityType.Common, entityTypeName: "Network Provider" },
    { entityType: EntityType.Common, entityTypeName: "Issuer" },
    { entityType: EntityType.Common, entityTypeName: "Acquirer" },
    {
        entityType: EntityType.Common,
        entityTypeName: "Financial Institution/Banks",
    },
]


export const GET_ENTITY_TYPE_OBJECT = (entityType: EntityType): BusinessEntity => {
    switch (entityType) {
        case EntityType.Customer:
            return {
                entityType: EntityType.Customer,
                type: ElementType.ItemContent,
                entityTypeName: "",
                selected: false,
                customerId: "",
                customerName: "",
                customerEmail: "",
                customerBankCode: "",
            };
        case EntityType.Merchant:
            return {
                entityType: EntityType.Merchant,
                type: ElementType.ItemContent,
                entityTypeName: "",
                selected: false,
                merchantId: "",
                merchantName: "",
                merchantCode: "",
                merchantBankCode: "",
            };
        case EntityType.PaymentMode:
            return {
                entityType: EntityType.PaymentMode,
                type: ElementType.ItemContent,
                entityTypeName: "",
                selected: false,
                paymentModeId: "",
                paymentMode: "",
                issuer: "",
                last4DigitsAccNo: "",
                payeeCode: "",
            };
        default:
            return {
                entityType: EntityType.Common,
                type: ElementType.ItemContent,
                entityTypeName: "",
                selected: false,
                id: "",
                name: "",
                code: "",
            };
    }
}
