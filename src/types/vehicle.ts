export interface Vehicle {
  id: string;
  type: "CAR" | "MOTORCYCLE";
  brand: string;
  model: string;
  year: number;
  price?: number | null;
  mileage?: number | null;
  fuelType?: string | null;
  transmission?: string | null;
  color?: string | null;
  images: string | null;                
  slug: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
}
