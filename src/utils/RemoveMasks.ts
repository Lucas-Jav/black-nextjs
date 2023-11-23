export function convertPriceStringToNumber(priceString: string) {
  const numericString = priceString.replace(/[^0-9]/g, "");
  const price = parseFloat(numericString) / 100;
  return price;
}

export const unmaskPhoneNumber = (formattedPhoneNumber: string) => {
  return formattedPhoneNumber.replace(/\D/g, '');
};

export const unmaskDocument = (document: string) => {
  return document.replace(/\D/g, '');
};