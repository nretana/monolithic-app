import { appConfig } from '@/modules/core/configs/app.config'

export const priceRangeFormat = (startPrice: number, endPrice: number ) => {
    return `${appConfig.currency.symbol}${startPrice} - ${appConfig.currency.symbol}${endPrice}`
}