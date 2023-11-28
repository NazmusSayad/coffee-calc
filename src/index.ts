import { r } from 'rype'

export const coffeeCalculatorOptions = r.object({
  coffeeRatio: r.number().min(0).default(1),
  sugarRatio: r.number().min(0).default(1),
  creamerRatio: r.number().min(0).default(1),
  waterRatio: r.number().min(0).default(24),
  superAccurate: r.boolean().default(false),
})

export type CoffeeCalculatorInputOptions = r.inferInput<
  typeof coffeeCalculatorOptions
>
export type CoffeeCalculatorOutputOptions = r.inferOutput<
  typeof coffeeCalculatorOptions
>
export type CoffeeResult = {
  coffee: number
  sugar: number
  creamer: number
  water: number
  ingredients: number
  total: number
}

export default class CoffeeCalculator {
  private coffee: number
  private sugar: number
  private creamer: number
  private water: number
  private ingredients: number
  private total: number

  constructor(ratio: CoffeeCalculatorInputOptions) {
    const conf = coffeeCalculatorOptions.parse(ratio)

    const coffee = conf.coffeeRatio
    const sugar = conf.sugarRatio
    const creamer = conf.creamerRatio
    const water = conf.waterRatio
    const ingredients = coffee + sugar + creamer

    const ingredientsLoss = conf.superAccurate ? ingredients * 0.01 : 0
    const total = ingredients - ingredientsLoss + water

    this.coffee = coffee
    this.sugar = sugar
    this.creamer = creamer
    this.water = water
    this.ingredients = ingredients
    this.total = total
  }

  getByCoffee(amount: number): CoffeeResult {
    const coffee = amount
    const ratio = amount / this.coffee
    return {
      coffee,
      sugar: this.sugar * ratio,
      creamer: this.creamer * ratio,
      ingredients: this.ingredients * ratio,
      water: this.water * ratio,
      total: this.total * ratio,
    }
  }

  getBySugar(amount: number): CoffeeResult {
    const sugar = amount
    const ratio = amount / this.sugar
    return {
      coffee: this.coffee * ratio,
      sugar,
      creamer: this.creamer * ratio,
      ingredients: this.ingredients * ratio,
      water: this.water * ratio,
      total: this.total * ratio,
    }
  }

  getByCreamer(amount: number): CoffeeResult {
    const creamer = amount
    const ratio = amount / this.creamer
    return {
      coffee: this.coffee * ratio,
      sugar: this.sugar * ratio,
      creamer,
      ingredients: this.ingredients * ratio,
      water: this.water * ratio,
      total: this.total * ratio,
    }
  }

  getByWater(amount: number): CoffeeResult {
    const water = amount
    const ratio = amount / this.water
    return {
      coffee: this.coffee * ratio,
      sugar: this.sugar * ratio,
      creamer: this.creamer * ratio,
      ingredients: this.ingredients * ratio,
      water,
      total: this.total * ratio,
    }
  }

  getByIngredients(amount: number): CoffeeResult {
    const ingredients = amount
    const ratio = amount / this.ingredients
    return {
      coffee: this.coffee * ratio,
      sugar: this.sugar * ratio,
      creamer: this.creamer * ratio,
      ingredients,
      water: this.water * ratio,
      total: this.total * ratio,
    }
  }

  getByTotal(amount: number): CoffeeResult {
    const total = amount
    const ratio = amount / this.total
    return {
      coffee: this.coffee * ratio,
      sugar: this.sugar * ratio,
      creamer: this.creamer * ratio,
      ingredients: this.ingredients * ratio,
      water: this.water * ratio,
      total,
    }
  }
}
