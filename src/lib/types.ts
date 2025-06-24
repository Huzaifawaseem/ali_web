export interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  imageUrl: string;
  imagePublicId?: string;
}

export interface ContactInfo {
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  address?: string;
  mapLat?: string;
  mapLng?: string;
  siteName?: string;
  logoUrl?: string;
  logoPublicId?: string;
  heroImageUrl?: string;
  heroImagePublicId?: string;
}

export interface Room {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId?: string;
}
