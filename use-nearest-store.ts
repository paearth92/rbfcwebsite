import { useState, useCallback, useEffect } from 'react';
import { Store } from '../data/stores';
import { findNearestStore, formatDistance } from '../lib/storeUtils';

interface NearestStoreResult {
  loading: boolean;
  error: string | null;
  nearestStore: Store | null;
  distance: number | null;
  formattedDistance: string | null;
  findNearest: () => Promise<Store | null>;
  navigateToNearest: () => void;
  callStore: () => void;
}

export function useNearestStore(stores: Store[]): NearestStoreResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearestStore, setNearestStore] = useState<Store | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  
  // Check for previously stored nearest store in localStorage
  useEffect(() => {
    try {
      const savedStoreData = localStorage.getItem('nearestStore');
      if (savedStoreData) {
        const { store, storeDistance, timestamp } = JSON.parse(savedStoreData);
        
        // Check if the stored data is less than 24 hours old
        const now = new Date().getTime();
        const storedTime = parseInt(timestamp);
        const hoursSinceStored = (now - storedTime) / (1000 * 60 * 60);
        
        if (hoursSinceStored < 24 && store) {
          setNearestStore(store);
          setDistance(storeDistance);
        } else {
          // Clear outdated store data
          localStorage.removeItem('nearestStore');
        }
      }
    } catch (err) {
      // If there's an error parsing the stored data, clear it
      localStorage.removeItem('nearestStore');
    }
  }, []);
  
  // Find the nearest store based on user's location
  const findNearest = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await findNearestStore(stores);
      
      if (result.error) {
        setError(result.error);
        setNearestStore(null);
        setDistance(null);
        return null;
      } else {
        setNearestStore(result.nearestStore);
        setDistance(result.distance);
        
        // Save to localStorage for future use
        if (result.nearestStore) {
          const storeData = {
            store: result.nearestStore,
            storeDistance: result.distance,
            timestamp: new Date().getTime().toString()
          };
          localStorage.setItem('nearestStore', JSON.stringify(storeData));
        }
        
        return result.nearestStore;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setNearestStore(null);
      setDistance(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [stores]);
  
  // Open navigation to the nearest store
  const navigateToNearest = useCallback(() => {
    if (!nearestStore) {
      setError('No nearest store found');
      return;
    }
    
    const address = `${nearestStore.address}, ${nearestStore.city}, ${nearestStore.state} ${nearestStore.zip}`;
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    
    // Check if the device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, try to open in the native maps app first
      // For iOS, use Apple Maps
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `maps://maps.apple.com/?q=${encodeURIComponent(nearestStore.name)}&address=${encodeURIComponent(address)}`;
      } 
      // For Android, use Google Maps
      else if (/Android/i.test(navigator.userAgent)) {
        window.location.href = `geo:0,0?q=${encodeURIComponent(address)}`;
      }
      // Fallback to web Google Maps for both
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    } else {
      // For desktop, just open Google Maps in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [nearestStore]);
  
  // Call the store
  const callStore = useCallback(() => {
    if (!nearestStore) {
      setError('No nearest store found');
      return;
    }
    
    // Clean the phone number to only include digits
    const phoneNumber = nearestStore.phone.replace(/[^0-9]/g, '');
    
    // Create a tel: link and navigate to it
    window.location.href = `tel:${phoneNumber}`;
  }, [nearestStore]);
  
  return {
    loading,
    error,
    nearestStore,
    distance,
    formattedDistance: distance ? formatDistance(distance) : null,
    findNearest,
    navigateToNearest,
    callStore
  };
}