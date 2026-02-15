// Delivery rate per km (KES)
const RATE_PER_KM = 450;

// Known delivery locations with approximate distances from Kigango quarry (km)
export const DELIVERY_LOCATIONS = [
  { name: 'Kigango / Nyeri (Local)', distance: 0 },
  { name: 'Karatina', distance: 15 },
  { name: 'Nanyuki', distance: 60 },
  { name: 'Embu', distance: 100 },
  { name: 'Meru', distance: 120 },
  { name: 'Nairobi / Thika', distance: 150 },
  { name: 'Nakuru', distance: 200 },
  { name: 'Eldoret', distance: 300 },
  { name: 'Kisumu', distance: 400 },
  { name: 'Mombasa', distance: 500 },
  { name: 'Other (enter distance)', distance: -1 },
];

// Calculate delivery cost from distance in km
export function calculateDeliveryCost(distanceKm) {
  if (!distanceKm || distanceKm <= 0) return 0;
  return Math.round(distanceKm * RATE_PER_KM);
}

// Truck capacities
export const TRUCK_SIZES = [
  { label: '5T Truck', tons: 5 },
  { label: '10T Truck', tons: 10 },
  { label: '30T Truck', tons: 30 },
];

// Material density for calculator (tons per cubic meter)
export const MATERIAL_DENSITIES = {
  '3/4 Crushed Stone': 1.6,
  '3/8 Crushed Stone': 1.6,
  'Ballast': 1.5,
  'Hardcore': 1.8,
  'Quarry Dust': 1.8,
};

export function calculateRequiredTons(lengthM, widthM, depthM, materialType = '3/4 Crushed Stone') {
  const volumeM3 = lengthM * widthM * depthM;
  const density = MATERIAL_DENSITIES[materialType] || 1.6;
  const tons = volumeM3 * density;
  return Math.round(tons * 100) / 100;
}
