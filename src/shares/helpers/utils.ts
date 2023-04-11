// eslint-disable-next-line
const Web3 = require('web3');
import ShortUniqueId from 'short-unique-id';

export const sleep = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

export const emptyWeb3 = new Web3();

export const uid = new ShortUniqueId({ dictionary: 'hex', length: 15 });

export const checkRecoverSameAddress = async ({
  address,
  signature,
  message,
}: {
  address: string;
  signature: string;
  message: string;
}): Promise<boolean> => {
  const recover = await emptyWeb3.eth.accounts.recover(message, signature);
  const recoverConvert = Web3.utils.toChecksumAddress(recover);
  const addressConvert = Web3.utils.toChecksumAddress(address);
  return addressConvert === recoverConvert;
};
