import { Location } from '../types';

const VERIFIED_DATA: Location[] = [
  // --- GOVERNMENT VETERINARY CLINICS ---
  { id: 1, name: 'Directorate of Animal Husbandry Kashmir', lat: 34.073921, lng: 74.810912, category: 'govt_vet', address: 'Red Cross Road, Gaw Kadal', isGovernment: true },
  { id: 2, name: 'Govt Veterinary Hospital Nowhata', lat: 34.097745, lng: 74.818423, category: 'govt_vet', address: 'Hawal, Near Islamia College', isGovernment: true },
  { id: 3, name: 'Govt Veterinary Centre Noor Bagh', lat: 34.111923, lng: 74.799412, category: 'govt_vet', address: 'Baghwanpora, Noor Bagh', isGovernment: true },
  { id: 4, name: 'Veterinary Hospital Barzulla', lat: 34.055812, lng: 74.794934, category: 'govt_vet', address: 'Barzulla, Ram Bagh', isGovernment: true },
  { id: 5, name: 'Veterinary Hospital Batapora', lat: 34.135623, lng: 74.846212, category: 'govt_vet', address: 'Batapora, Hazratbal', isGovernment: true },
  { id: 6, name: 'SKUAST Veterinary Clinical Complex', lat: 34.149312, lng: 74.878245, category: 'govt_vet', address: 'SKUAST Shuhama', isGovernment: true },

  // --- PRIVATE VETERINARY CLINICS ---
  { id: 7, name: 'Supreme Veterinary Clinic', lat: 34.072612, lng: 74.793543, category: 'private_vet', address: 'Batamaloo', isGovernment: false },
  { id: 8, name: 'MODERN VET AND PET CARE', lat: 34.039745, lng: 74.905212, category: 'private_vet', address: 'Pantha Chowk', isGovernment: false },
  { id: 9, name: 'RJ PET CARE & CLINIC', lat: 34.063523, lng: 74.826745, category: 'private_vet', address: 'Rajbagh', isGovernment: false },
  { id: 10, name: 'Pets Paw Clinic', lat: 34.096412, lng: 74.829523, category: 'private_vet', address: 'Haft Chinar', isGovernment: false },
  { id: 11, name: 'Pet 1st Vet Clinic', lat: 34.142012, lng: 74.828034, category: 'private_vet', address: 'Soura', isGovernment: false },
  { id: 12, name: 'Lark Pet Clinic', lat: 34.076845, lng: 74.775612, category: 'private_vet', address: 'Bemina', isGovernment: false },
  { id: 13, name: 'Scottish Pet Care Clinic', lat: 34.060312, lng: 74.838745, category: 'private_vet', address: 'Jawahar Nagar', isGovernment: false },
  { id: 14, name: 'Vet Clinic Pazwalpora', lat: 34.138423, lng: 74.827612, category: 'private_vet', address: 'Pazwalpora', isGovernment: false },
  { id: 15, name: 'Alpha Pet Life Clinic', lat: 34.074012, lng: 74.811545, category: 'private_vet', address: 'Kothi Bagh', isGovernment: false },
  { id: 16, name: 'The Pets Luxury', lat: 34.101823, lng: 74.822812, category: 'private_vet', address: 'Hawal', isGovernment: false },
  { id: 17, name: 'City Vet Clinic', lat: 34.127612, lng: 74.744845, category: 'private_vet', address: 'HMT Zainakote', isGovernment: false },
  { id: 18, name: 'Pet Arena', lat: 34.077245, lng: 74.799812, category: 'private_vet', address: 'Karan Nagar', isGovernment: false },
  { id: 19, name: 'PetAmor', lat: 34.119012, lng: 74.836845, category: 'private_vet', address: 'Lal Bazar', isGovernment: false },
  { id: 20, name: 'Pets Srinagar Vet Clinic', lat: 34.100423, lng: 74.786512, category: 'private_vet', address: 'Nowshera', isGovernment: false },
  { id: 21, name: 'Myakat Veterinary Clinic', lat: 34.048412, lng: 74.786245, category: 'private_vet', address: 'Nowgam', isGovernment: false },

  // --- PET STORES ---
  { id: 22, name: 'Pet Paradise', lat: 34.132545, lng: 74.831512, category: 'pet_store', address: 'Dargah Road, Hafiz Bagh', isGovernment: false },
  { id: 23, name: 'Aquatic Kart', lat: 34.131012, lng: 74.805045, category: 'pet_store', address: 'Illahi Bagh Chowk', isGovernment: false },
  { id: 24, name: 'Pets Villa Srinagar', lat: 34.152245, lng: 74.811512, category: 'pet_store', address: 'Ahmad Nagar', isGovernment: false },
  { id: 25, name: 'Cat Print Cafe Pet Store', lat: 34.161012, lng: 74.825545, category: 'pet_store', address: 'Bank Colony, Zakura', isGovernment: false },
  { id: 26, name: 'Petin Soura', lat: 34.128512, lng: 74.801545, category: 'pet_store', address: 'Soura, 90 Feet Road', isGovernment: false },
  { id: 27, name: 'Pets Hub Lal Bazar', lat: 34.115512, lng: 74.814523, category: 'pet_store', address: 'Aram Pora, Butakadal', isGovernment: false },
  { id: 28, name: 'Whiskers And Paws', lat: 34.081512, lng: 74.801012, category: 'pet_store', address: 'Chotta Bazar, Karan Nagar', isGovernment: false },
  { id: 29, name: 'Pet Zone Kashmir', lat: 34.129012, lng: 74.841023, category: 'pet_store', address: 'Hazratbal', isGovernment: false },
  { id: 30, name: 'Fluffy Claws', lat: 34.041012, lng: 74.787012, category: 'pet_store', address: 'Hyderpora Bypass', isGovernment: false },
  { id: 31, name: 'Kitty City Pet Shop', lat: 34.158512, lng: 74.824045, category: 'pet_store', address: 'Zakura, Hazratbal Road', isGovernment: false },
  { id: 32, name: 'PetAmor Pet Store', lat: 34.141512, lng: 74.832512, category: 'pet_store', address: 'Salfia Stop, Hazratbal Road', isGovernment: false },
  { id: 33, name: 'PET PALACE SOURA', lat: 34.135512, lng: 74.804523, category: 'pet_store', address: 'Soura Area', isGovernment: false },
  { id: 34, name: 'Cute Creatures Pet Store', lat: 34.138512, lng: 74.834012, category: 'pet_store', address: 'Bhat Complex, Hazratbal Road', isGovernment: false },
  { id: 35, name: 'Breeders Hub Hyderpora', lat: 34.045512, lng: 74.789023, category: 'pet_store', address: 'Opposite Jamia Masjid, Hyderpora', isGovernment: false },
  { id: 36, name: 'Breeders Hub Chattabal', lat: 34.091012, lng: 74.792512, category: 'pet_store', address: 'Zampa Kadal Bridge, Chattabal', isGovernment: false },
  { id: 37, name: 'Cat Print Café Shalimar', lat: 34.145512, lng: 74.871012, category: 'pet_store', address: 'Chinar Chowk, Shalimar', isGovernment: false }
];

export const fetchSrinagarLocations = async (): Promise<Location[]> => {
  return VERIFIED_DATA;
};