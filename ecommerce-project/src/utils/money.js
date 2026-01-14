export function formantMoney(amountCents) {
    return `$${(amountCents / 100).toFixed(2)}`
}