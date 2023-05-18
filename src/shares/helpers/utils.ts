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
