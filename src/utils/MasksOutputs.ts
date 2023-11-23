import { Maybe } from "yup";

export const maskMoney = (text: any) => {
  if (text === null) return "";

  if (typeof text === "number") text = text.toFixed(2).toString();

  let sig = "";

  if (text < 0) sig = "-";

  text = text.replace(/[\D]+/g, "").replace(/\b0+/g, "").padStart(3, "0");
  const unformatted = text.replace(/([0-9]{2})$/g, ".$1");
  const number = unformatted.split(".");
  number[0] = number[0].split(/(?=(?:...)*$)/).join(".");

  return `R$${sig} ${number.join(",")}`;
};

export const formatPhoneNumber = (phoneNumber: any) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/(\d{2})(\d{4,5})(\d{4})/);
  if (match) {
    const formattedNumber = `(${match[1]}) ${match[2]}-${match[3]}`;
    return formattedNumber;
  }
  return cleaned;
};


export const formatCPF = (cpf: any) => {
  const cleaned = cpf.replace(/\D/g, '');
  const match = cleaned.match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
  if (match) {
    const formattedCPF = `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    return formattedCPF;
  }
  return cleaned;
};

export const formatCNPJ = (cnpj: any) => {
  const cleaned = cnpj.replace(/\D/g, '');
  const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/);
  if (match) {
    const formattedCNPJ = `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    return formattedCNPJ;
  }
  return cleaned;
};

export const maskCEP = (text: any) => {
  if (text === null) return "";

  text = text.replace(/\D/g, "");
  text = text.substr(0, 8);

  if (text.length > 5) {
    const firstPart = text.substring(0, 5);
    const secondPart = text.substring(5);
    return `${firstPart}-${secondPart}`;
  } else {
    return text;
  }
};

export const maskNumberCard = (number: string) => {
  let numberClear = number.replace(/\D/g, '');

  if (numberClear.length > 16) {
    numberClear = numberClear.slice(0, 16);
  }

  const grupos = [];
  for (let i = 0; i < numberClear.length; i += 4) {
    grupos.push(numberClear.slice(i, i + 4));
  }

  return grupos.join(' ');
}

export const maskCVV = (cvv: string) => {
  let cvvClear = cvv.replace(/\D/g, '');

  if (cvvClear.length > 4) {
    cvvClear = cvvClear.slice(0, 4);
  }

  return cvvClear;
}

export const createCreditCardMask = (number: string) => {
  const cleanNumber = number.replace(/\D/g, '');

  const mask = '****  ****  ****  ****';

  let maskedNumber = '';
  let j = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '*') {
      maskedNumber += cleanNumber[j] || '*';
      j++;
    } else {
      maskedNumber += mask[i];
    }
  }

  return maskedNumber;
}

export const maskExpiryDate = (date: string) => {
  let cleanDate = date.replace(/\D/g, '');

  if (cleanDate.length > 4) {
    cleanDate = cleanDate.slice(0, 4);
  }

  if (cleanDate.length > 2) {
    return `${cleanDate.slice(0, 2)}/${cleanDate.slice(2)}`;
  } else {
    return cleanDate;
  }
}


export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}`
}

export const convertToDate = (dateString: Maybe<string>): Date => {
  if (!dateString) {
      return new Date();
  }

  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
      return new Date();
  }

  return parsedDate;
};

export const calculateDaysRemaining = (targetDate: Date): number => {
  const currentDate = new Date();
  const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return daysRemaining;
}

export const formatDocument = (document: string) => {
  const cleaned = document.replace(/\D/g, '');

  if (cleaned.length === 11) {
    const match = cleaned.match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
  } else if (cleaned.length === 14) {
    const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }
  }

  return document;
};

export const maskOnlyNumber = (input: string) => {
  const numericValue = input.replace(/\D/g, '');
  const formattedValue = numericValue;
  return formattedValue;
};

export const maskDecimalMoney = (input: string) => {
  const cleaned = input.replace(/[^\d,]/g, '');
  return cleaned;
}