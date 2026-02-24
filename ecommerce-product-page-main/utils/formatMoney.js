export function formatMoney(priceCents) {
    return Math.floor(priceCents / 100).toFixed(2);
}

export function calculateDiscount(priceCents, discount) {
    return Math.floor(priceCents - (priceCents * discount) / 100).toFixed(2);
}