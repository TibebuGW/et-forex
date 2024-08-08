import { USFlag, EUFlag, UKFlag, SWFlag, KWFlag, CAFlag, AUFlag, JPFlag } from "@/public/assets/flags";
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
  {
    name: "AUD",
    longName: "Australian Dollar",
    flag: AUFlag,
  },
  {
    name: "JPY",
    longName: "Japanese Yen",
    flag: JPFlag,
  },
  {
    name: "CAD",
    longName: "Canadian Dollar",
    flag: CAFlag,
  },
];

export default currencies;
