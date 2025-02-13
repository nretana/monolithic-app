
//admin:ssh_signing_key

//i.e.
//feature:sub-feature
//manage:sub-feature
//read:sub-feature
//write:sub-feature
//delete:sub-feature

export const FEATURE_ADMIN_ROLE_PERMISSION = {
    feature: {
        "view:feature": true,
        "create:feature": true,
        "modify:feature": true,
        "delete:feature": true
    },
    ['feature:orders']: {
        "view:feature": true,
        "create:feature": true,
        "modify:feature": true,
        "delete:feature": true
    }
}

export const FEATURE_TRAINER_ROLE_PERMISSION = {
    feature: {
        "view:feature": true,
        "create:feature": false,
        "modify:feature": false,
        "delete:feature": false
    },
    ['feature:orders']: {
        "view:feature": true,
        "create:feature": true,
        "modify:feature": true,
        "delete:feature": true
    }
}

export const FEATURE_USER_ROLE_PERMISSION = {
    feature: {
        "view:feature": true,
        "create:feature": false,
        "modify:feature": false,
        "delete:feature": false
    },
    ['feature:orders']: {
        "view:feature": true,
        "create:feature": false,
        "modify:feature": false,
        "delete:feature": false
    }
}