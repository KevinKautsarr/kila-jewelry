export type ProductCategory = "kalung" | "cincin" | "anting" | "gelang";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
}

export const products: Product[] = [
  {
    id: "kalung-lumen",
    name: "Lumen Necklace",
    price: 2450000,
    description: "Kalung rantai perak dengan liontin bulat halus, memantulkan cahaya lembut.",
    category: "kalung",
  },
  {
    id: "kalung-aria",
    name: "Aria Pendant",
    price: 3150000,
    description: "Liontin minimalis berlapis rhodium dengan aksen batu zirkon tunggal.",
    category: "kalung",
  },
  {
    id: "cincin-solstice",
    name: "Solstice Ring",
    price: 1890000,
    description: "Cincin perak sterling dengan lekuk asimetris terinspirasi cahaya bulan.",
    category: "cincin",
  },
  {
    id: "cincin-vera",
    name: "Vera Band",
    price: 2200000,
    description: "Cincin polos bertekstur satin, dirancang untuk dipakai sehari-hari.",
    category: "cincin",
  },
  {
    id: "anting-nova",
    name: "Nova Studs",
    price: 1650000,
    description: "Anting stud kecil dengan kilau berlian sintetis, ringan dan versatile.",
    category: "anting",
  },
  {
    id: "anting-selene",
    name: "Selene Drops",
    price: 2750000,
    description: "Anting gantung berbentuk bulan sabit dengan finishing silver matte.",
    category: "anting",
  },
  {
    id: "gelang-lumina",
    name: "Lumina Bracelet",
    price: 2980000,
    description: "Gelang rantai halus dengan bandul kecil, elegan untuk tampilan berlapis.",
    category: "gelang",
  },
  {
    id: "gelang-orin",
    name: "Orin Cuff",
    price: 3400000,
    description: "Gelang cuff terbuka dengan permukaan mengkilap, statement piece minimalis.",
    category: "gelang",
  },
];
