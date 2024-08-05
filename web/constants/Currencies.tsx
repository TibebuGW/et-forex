import { USFlag, EUFlag, UKFlag, SWFlag, KWFlag } from "@/public/assets/flags";
interface ICurrency {
  name: string;
  longName: string;
  flag: any;
}

const currencies: ICurrency[] = [
  {
    name: "USD",
    longName: "US Dollar",
    flag: USFlag,
  },
  {
    name: "EUR",
    longName: "Euro",
    flag: EUFlag,
  },
  {
    name: "GBP",
    longName: "British Pound",
    flag: UKFlag,
  },
  {
    name: "CHF",
    longName: "Swiss Franc",
    flag: SWFlag,
  },
  {
    name: "KWD",
    longName: "Kuwaiti Dinar",
    flag: KWFlag,
  },
];

export default currencies;
