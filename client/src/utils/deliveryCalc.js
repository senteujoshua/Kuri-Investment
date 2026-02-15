// Quarry location - Kigango, Nyeri, Kenya
const QUARRY_LAT = -0.4167;
const QUARRY_LNG = 36.9500;

// Delivery rate per km (KES)
const RATE_PER_KM = 150;
const BASE_DELIVERY_FEE = 2000;
const MAX_FREE_DISTANCE = 10; // km - free delivery within Nyeri

// Calculate distance between two points using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

export function calculateDeliveryCost(deliveryLat, deliveryLng) {
  if (!deliveryLat || !deliveryLng) return 0;

  const distance = haversineDistance(QUARRY_LAT, QUARRY_LNG, deliveryLat, deliveryLng);

  if (distance <= MAX_FREE_DISTANCE) {
    return 0; // Free delivery within 10km (Nyeri area)
  }

  const cost = BASE_DELIVERY_FEE + (distance - MAX_FREE_DISTANCE) * RATE_PER_KM;
  return Math.round(cost);
}

export function getDistanceFromQuarry(lat, lng) {
  if (!lat || !lng) return 0;
  return Math.round(haversineDistance(QUARRY_LAT, QUARRY_LNG, lat, lng) * 10) / 10;
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
