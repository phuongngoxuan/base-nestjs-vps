import { EventWeb3Dto } from './event-web3js.dto';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class ReturnValues {
  '0': string;
  '1': string[];
  account?: string;
  user?: string;
  amount?: string[];
  reward?: string[];
}

export class LogEventDto extends EventWeb3Dto {
  returnValues: ReturnValues;
}
