export const imgBase = "http://192.168.101.146/uploads/";
export const imgDefault = `${imgBase}/default-image.webp`;
export const apiBase = "http://192.168.101.146/api/v1";
export const apiBasePharma =
  "https://webapps.acibd.com/api/pharma-ecommerce-app-stagging/api";
// 192.168.101.46

export function formatNumber(number) {
  const isInteger = Number.isInteger(number);

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  }).format(number);
}
