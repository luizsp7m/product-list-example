import { PRODUCT_CATEGORIES } from "@/constants/product-categories";
import { Product } from "@/types/product";

export const products: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/xtw8RHpH/61p-HAEJ4-NML-AC-UX679.jpg",
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/sJsgKKvX/71z3kp-MAYs-L-AC-UY879.jpg",
  },
  {
    name: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/RGF7DkW1/51-Y5-NI-I5j-L-AC-UX679.jpg",
  },
  {
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/cB0PPmq/71-YXze-Ousl-L-AC-UY879.jpg",
  },
  {
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/YF8qGptf/71-YAIFU48-IL-AC-UL640-QL65-ML3.jpg",
  },
  {
    name: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/YBN1Y6rW/61-U7-T1ko-Qq-L-AC-SX679.jpg",
  },
  {
    name: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/Q3fBLCSz/81f-PKd-2-AYL-AC-SL1500-1.jpg",
  },
  {
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: PRODUCT_CATEGORIES.FASHION_AND_ACCESSORIES,
    imageUrl: "https://i.ibb.co/gMdk1Wh8/71li-ujtl-UL-AC-UX679.jpg",
  },
  {
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    imageUrl: "https://i.ibb.co/Q3fBLCSz/81f-PKd-2-AYL-AC-SL1500-1.jpg",
  },
  {
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    imageUrl: "https://i.ibb.co/C3WGTrth/61mt-L65-D4c-L-AC-SX679.jpg",
  },
];
