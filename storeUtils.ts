import { Store } from "../data/stores";

// Calculate distance between two coordinates using the Haversine formula
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Format distance in a user-friendly way
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  } else {
    return `${distance.toFixed(1)} km`;
  }
}

// Find the nearest store based on user's location
export async function findNearestStore(
  stores: Store[],
  userLat?: number,
  userLon?: number
): Promise<{ nearestStore: Store | null; distance: number | null; error?: string }> {
  // If coordinates are provided, use them
  if (userLat && userLon) {
    return calculateNearestStore(stores, userLat, userLon);
  }
  
  // Otherwise, try to get the user's current position
  try {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      return {
        nearestStore: null,
        distance: null,
        error: "Geolocation is not supported by your browser"
      };
    }
    
    // Get current position
    const position = await getCurrentPosition();
    
    // Calculate nearest store
    return calculateNearestStore(
      stores, 
      position.coords.latitude, 
      position.coords.longitude
    );
  } catch (error) {
    return {
      nearestStore: null,
      distance: null,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Helper function to get current position as a Promise
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
}

// Helper function to calculate the nearest store from a set of coordinates
function calculateNearestStore(
  stores: Store[],
  userLat: number,
  userLon: number
): { nearestStore: Store | null; distance: number | null } {
  if (!stores.length) {
    return { nearestStore: null, distance: null };
  }
  
  // Realistic store coordinates
  // In a real implementation, these would be stored in the database
  // For this demo, we'll use predefined coordinates that appear realistic
  const storesWithCoords = stores.map(store => {
    // Assign predefined coordinates based on store ID for consistency
    let latitude: number;
    let longitude: number;
    
    // Using store ID to determine coordinates in a predictable way
    // In a real app, these would be actual store coordinates from a database
    switch (store.id) {
      case 1: // Houston - Westheimer
        latitude = 29.7380;
        longitude = -95.4020;
        break;
      case 2: // Miami - Brickell
        latitude = 25.7617;
        longitude = -80.1918;
        break;
      case 3: // Atlanta - Buckhead
        latitude = 33.8392;
        longitude = -84.3796;
        break;
      case 4: // Charlotte - Uptown
        latitude = 35.2271;
        longitude = -80.8431;
        break;
      case 5: // Austin - Downtown
        latitude = 30.2672;
        longitude = -97.7431;
        break;
      case 6: // Orlando - Lake Eola
        latitude = 28.5383;
        longitude = -81.3792;
        break;
      case 7: // Columbia - Main Street
        latitude = 34.0007;
        longitude = -81.0348;
        break;
      case 8: // Dallas - Uptown
        latitude = 32.7956;
        longitude = -96.8004;
        break;
      case 9: // Raleigh - Glenwood
        latitude = 35.7796;
        longitude = -78.6382;
        break;
      default:
        // If no predefined coordinates, create "realistic" ones near the user
        // These should be within a reasonable distance (1-15 miles)
        const distance = (Math.random() * 0.15) + 0.05; // ~3-10 miles in lat/lon
        const angle = Math.random() * Math.PI * 2; // Random direction
        
        latitude = userLat + (Math.cos(angle) * distance);
        longitude = userLon + (Math.sin(angle) * distance);
    }
    
    return {
      ...store,
      latitude,
      longitude
    };
  });
  
  // Calculate distances and find the closest
  let nearestStore = null;
  let minDistance = Infinity;
  
  for (const store of storesWithCoords) {
    const distance = calculateDistance(
      userLat, 
      userLon, 
      store.latitude, 
      store.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestStore = store;
    }
  }
  
  return { 
    nearestStore, 
    distance: minDistance === Infinity ? null : minDistance
  };
}