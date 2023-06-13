import ShortUniqueId from 'short-unique-id';

export const sleep = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

export const uid = new ShortUniqueId({ dictionary: 'hex', length: 15 });

export const randomCodeNumber = (number = 6): string => {
  let randomCode = '';
  for (let i = 0; i < number; i++) {
    const code = Math.floor(Math.random() * 10);
    randomCode = randomCode + code;
  }

  return randomCode;
};

export const decimalToString = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => decimalToString(item));
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);

    keys.forEach((key) => {
      data[key] = data[key].constructor.name === 'Decimal128' ? parseFloat(data[key].toString()) : data[key];
    });

    return data;
  } else {
    return data;
  }
};
