export interface LostPet {
  id: string;
  type: 'Lost' | 'Found';
  petType: string;
  breed: string;
  area: string;
  description: string;
  contact: string;
  date: string;
}

// Keep your other types (Location, UserProfile, AnimalReport) below...export type Category = 'govt_vet' | 'private_vet' | 'pet_store' | 'rescue' | 'wildlife';

export interface UserProfile {
  name: string;
  joinedDate: string;
}

export interface AnimalReport {
  id: string;
  userName: string;
  type: string;
  details: string;
  location: string;
  timestamp: string;
  status: 'Pending' | 'Verified' | 'Resolved';
}

export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: Category;
  address: string;
  isGovernment: boolean;
}