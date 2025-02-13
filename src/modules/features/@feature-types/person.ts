
export type EmailAddress = {
    emailAddressId: number
    emailAddress1: string
    modifiedDate: string
}

export type Person = {
    businessEntityId: number,
    personType: string,
    nameStyle: boolean,
    title?: string,
    firstName: string
    middleName?: string
    lastName?: string,
    suffix?: string,
    emailPromotion?: string,
    additionalContactInfo?: string,
    demographics?: string,
    rowguid: string,
    modifiedDate: Date,
    businessEntity?: null,
    businessEntityContacts?: [],
    customers?: [],
    emailAddresses?: EmailAddress[],
    employee?: null,
    password?: null,
    personCreditCards?: [],
    personPhones?: []
}