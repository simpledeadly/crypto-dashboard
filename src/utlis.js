// утилиты это функции, которые не используют никаких данных из внешнего скоупа
export const percentDifference = (a, b) => {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}