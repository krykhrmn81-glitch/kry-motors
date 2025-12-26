export type Vehicle = {
  id: string;                 // UUID → string
  name: string;
  price: number;
  slug: string;
  images: string[];
  type: "car" | "motorcycle"; // sen belirledin
};
