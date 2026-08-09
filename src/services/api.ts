import { Location } from '../types';

const VERIFIED_DATA: Location[] = [
  // --- GOVERNMENT VETERINARY CLINICS ---
  { id: 1, name: 'Directorate of Animal Husbandry Kashmir (Central Veterinary Hospital)', lat: 34.0739, lng: 74.8109, category: 'govt_vet', address: 'Red Cross Road, Gaw Kadal, Kothi Bagh', isGovernment: true },
  { id: 2, name: 'Government Veterinary Hospital Nowhata', lat: 34.0977, lng: 74.8184, category: 'govt_vet', address: 'Hawal, Near Islamia College', isGovernment: true },
  { id: 3, name: 'Government Veterinary Centre Noor Bagh', lat: 34.1119, lng: 74.7994, category: 'govt_vet', address: 'Baghwanpora, Noor Bagh', isGovernment: true },
  { id: 4, name: 'Veterinary Hospital Barzulla', lat: 34.0558, lng: 74.7949, category: 'govt_vet', address: 'Barzulla, Ram Bagh', isGovernment: true },
  { id: 5, name: 'Veterinary Hospital Batapora', lat: 34.1356, lng: 74.8462, category: 'govt_vet', address: 'Batapora, Hazratbal', isGovernment: true },
  { id: 6, name: 'SKUAST Veterinary Clinical Complex', lat: 34.1493, lng: 74.8782, category: 'govt_vet', address: 'SKUAST Shuhama', isGovernment: true },
  { id: 7, name: 'Govt Veterinary Clinic Hyderpora', lat: 34.0418, lng: 74.7885, category: 'govt_vet', address: 'Hyderpora Bypass', isGovernment: true },

  // --- PRIVATE VETERINARY CLINICS ---
  { id: 8, name: 'Supreme Veterinary Clinic', lat: 34.0726, lng: 74.7935, category: 'private_vet', address: 'Batamaloo', isGovernment: false },
  { id: 9, name: 'MODERN VET AND PET CARE', lat: 34.0397, lng: 74.9052, category: 'private_vet', address: 'Pantha Chowk', isGovernment: false },
  { id: 10, name: 'RJ PET CARE & CLINIC', lat: 34.0635, lng: 74.8267, category: 'private_vet', address: 'Rajbagh', isGovernment: false },
  { id: 11, name: 'Pets Paw Clinic', lat: 34.0964, lng: 74.8295, category: 'private_vet', address: 'Haft Chinar', isGovernment: false },
  { id: 12, name: 'Pet 1st Vet Clinic', lat: 34.1420, lng: 74.8280, category: 'private_vet', address: 'Soura', isGovernment: false },
  { id: 13, name: 'Lark Pet Clinic', lat: 34.0768, lng: 74.7756, category: 'private_vet', address: 'Bemina', isGovernment: false },
  { id: 14, name: 'Scottish Pet Care Clinic', lat: 34.0603, lng: 74.8387, category: 'private_vet', address: 'Jawahar Nagar', isGovernment: false },
  { id: 15, name: 'Vet Clinic Pazwalpora', lat: 34.1384, lng: 74.8276, category: 'private_vet', address: 'Pazwalpora', isGovernment: false },
  { id: 16, name: 'Alpha Pet Life Clinic', lat: 34.0740, lng: 74.8115, category: 'private_vet', address: 'Kothi Bagh', isGovernment: false },
  { id: 17, name: 'The Pets Luxury', lat: 34.1018, lng: 74.8228, category: 'private_vet', address: 'Hawal', isGovernment: false },
  { id: 18, name: 'City Vet Clinic', lat: 34.1276, lng: 74.7448, category: 'private_vet', address: 'HMT Zainakote', isGovernment: false },
  { id: 19, name: 'Pet Arena', lat: 34.0772, lng: 74.7998, category: 'private_vet', address: 'Karan Nagar', isGovernment: false },
  { id: 20, name: 'PetAmor', lat: 34.1190, lng: 74.8368, category: 'private_vet', address: 'Lal Bazar', isGovernment: false },
  { id: 21, name: 'Pets Srinagar Vet Clinic', lat: 34.1004, lng: 74.7865, category: 'private_vet', address: 'Nowshera', isGovernment: false },
  { id: 22, name: 'Myakat Veterinary Clinic', lat: 34.0484, lng: 74.7862, category: 'private_vet', address: 'Nowgam', isGovernment: false },

  // --- PET STORES ---
  { id: 23, name: 'Pet Paradise', lat: 34.1325, lng: 74.8315, category: 'pet_store', address: 'Dargah Road, Hafiz Bagh', isGovernment: false },
  { id: 24, name: 'Aquatic Kart', lat: 34.1310, lng: 74.8050, category: 'pet_store', address: 'Shop No. 11, J.N. Complex, 90 Feet Road, Illahi Bagh', isGovernment: false },
  { id: 25, name: 'Pets Villa Srinagar', lat: 34.1522, lng: 74.8115, category: 'pet_store', address: 'Near Khan Glass House, Ahmad Nagar', isGovernment: false },
  { id: 26, name: 'The Cat Print Cafe Pet Store & Clinic', lat: 34.1610, lng: 74.8255, category: 'private_vet', address: '1st Floor, Sofi Complex, Bank Colony, Zakura', isGovernment: false },
  { id: 27, name: 'Petin Soura | Best Pet Shop', lat: 34.1285, lng: 74.8015, category: 'pet_store', address: '90 Feet Road, Opposite Boys Higher Secondary School, Soura', isGovernment: false },
  { id: 28, name: 'Pets Hub Butakadal', lat: 34.1155, lng: 74.8145, category: 'pet_store', address: 'Lal Bazar, Near Police Station, Aram Pora', isGovernment: false },
  { id: 29, name: 'Whiskers And Paws', lat: 34.0815, lng: 74.8010, category: 'pet_store', address: 'Chotta Bazar, Karan Nagar, Srinagar', isGovernment: false },
  { id: 30, name: 'Pet Zone Kashmir', lat: 34.1290, lng: 74.8410, category: 'pet_store', address: 'Hazratbal, Srinagar', isGovernment: false },
  { id: 31, name: 'Fluffy Claws', lat: 34.0410, lng: 74.7870, category: 'pet_store', address: 'Hyderpora Bypass Road, Srinagar', isGovernment: false },
  { id: 32, name: 'Kitty City Pet Shop', lat: 34.1585, lng: 74.8240, category: 'pet_store', address: 'Zakura, Hazratbal Road, Srinagar', isGovernment: false },
  { id: 33, name: 'PetAmor – Pet Store | Pet Grooming', lat: 34.1415, lng: 74.8325, category: 'pet_store', address: 'Salfia Stop, Opposite J&K Bank, Hazratbal Road', isGovernment: false },
  { id: 34, name: 'PET PALACE', lat: 34.1355, lng: 74.8045, category: 'pet_store', address: 'Near RP School Girls, Back Gate, Soura', isGovernment: false },
  { id: 35, name: 'Cute Creatures Pet Store', lat: 34.1385, lng: 74.8340, category: 'pet_store', address: 'Bhat Complex, Hazratbal Road, Srinagar', isGovernment: false },
  { id: 36, name: 'Breeders Hub (Hyderpora)', lat: 34.0455, lng: 74.7890, category: 'pet_store', address: 'M.A. Mall, Opposite Jamia Masjid, Hyderpora', isGovernment: false },
  { id: 37, name: 'Breeders Hub (Chattabal)', lat: 34.0910, lng: 74.7925, category: 'pet_store', address: 'Zampa Kadal Bridge, near Darul Uloom Muhammadiya, Chattabal', isGovernment: false },
  { id: 38, name: 'The Cat Print Café Shalimar', lat: 34.1455, lng: 74.8710, category: 'pet_store', address: 'Chinar Chowk, Shalimar, Srinagar', isGovernment: false }
];

export const fetchSrinagarLocations = async (): Promise<Location[]> => {
  return VERIFIED_DATA;
};