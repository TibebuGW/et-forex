import {
  Abay,
  Abyssinia,
  Ahadu,
  Amhara,
  Awash,
  Berhan,
  CBE,
  COOP,
  Dashen,
  Enat,
  Gadaa,
  Global,
  Hibret,
  Hijra,
  Nib,
  Oromia,
  Sinqee,
  Tsedey,
  Tsehay,
  Wegagen,
  Zemen,
} from "@/public/assets/bank-images";

export interface IBank {
  name: string;
  image: any;
}

const banks: IBank[] = [
  {
    name: "Abay Bank",
    image: Abay,
  },
  {
    name: "Abyssinia Bank",
    image: Abyssinia,
  },
  {
    name: "Ahadu Bank",
    image: Ahadu,
  },
  {
    name: "Amhara Bank",
    image: Amhara,
  },
  {
    name: "Awash Bank",
    image: Awash,
  },
  {
    name: "Berhan Bank",
    image: Berhan,
  },
  {
    name: "CBE",
    image: CBE,
  },
  {
    name: "COOP Bank",
    image: COOP,
  },
  {
    name: "Dashen Bank",
    image: Dashen,
  },
  {
    name: "Enat Bank",
    image: Enat,
  },
  {
    name: "Gadaa Bank",
    image: Gadaa,
  },
  {
    name: "Global Bank",
    image: Global,
  },
  {
    name: "Hibret Bank",
    image: Hibret,
  },
  {
    name: "Hijra Bank",
    image: Hijra,
  },
  {
    name: "NIB Bank",
    image: Nib,
  },
  {
    name: "Oromia Bank",
    image: Oromia,
  },
  {
    name: "Sinqe Bank",
    image: Sinqee,
  },
  {
    name: "Tsedey Bank",
    image: Tsedey,
  },
  {
    name: "Tsehay Bank",
    image: Tsehay,
  },
  {
    name: "Wegagen Bank",
    image: Wegagen,
  },
  {
    name: "Zemen Bank",
    image: Zemen,
  },
];

export default banks;