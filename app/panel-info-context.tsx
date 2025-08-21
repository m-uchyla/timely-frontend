"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PanelInfo } from '@/lib/types';
import { fetchPanelInfo, ApiError } from '@/lib/api';

interface PanelInfoContextType {
  panelInfo: PanelInfo | null;
  loading: boolean;
  error: string | null;
  refreshPanelInfo: () => Promise<void>;
  updatePanelInfo: (newInfo: Partial<PanelInfo>) => void;
}

const PanelInfoContext = createContext<PanelInfoContextType | undefined>(undefined);

interface PanelInfoProviderProps {
  children: ReactNode;
}

export function PanelInfoProvider({ children }: PanelInfoProviderProps) {
  const [panelInfo, setPanelInfo] = useState<PanelInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPanelInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const info = await fetchPanelInfo();
      setPanelInfo(info);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Failed to load panel info: ${err.message}`);
      } else {
        setError('Failed to load panel info. Please try again.');
      }
      console.error('Error loading panel info:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPanelInfo = async () => {
    await loadPanelInfo();
  };

  const updatePanelInfo = (newInfo: Partial<PanelInfo>) => {
    if (panelInfo) {
      setPanelInfo({ ...panelInfo, ...newInfo });
    }
  };

  // Load panel info on mount
  useEffect(() => {
    loadPanelInfo();
  }, []);

  const value: PanelInfoContextType = {
    panelInfo,
    loading,
    error,
    refreshPanelInfo,
    updatePanelInfo,
  };

  return (
    <PanelInfoContext.Provider value={value}>
      {children}
    </PanelInfoContext.Provider>
  );
}

// Custom hook to use panel info
export function usePanelInfo() {
  const context = useContext(PanelInfoContext);
  if (context === undefined) {
    throw new Error('usePanelInfo must be used within a PanelInfoProvider');
  }
  return context;
}

// Custom hooks for specific data
export function useUserInfo() {
  const { panelInfo } = usePanelInfo();
  if (!panelInfo) return null;
  
  return {
    id: panelInfo.userID,
    firstName: panelInfo.firstName,
    lastName: panelInfo.lastName,
    fullName: `${panelInfo.firstName} ${panelInfo.lastName}`,
  };
}

export function useOrganizationInfo() {
  const { panelInfo } = usePanelInfo();
  if (!panelInfo) return null;
  
  return {
    id: panelInfo.organizationID,
    name: panelInfo.organizationName,
  };
}

export function useNotificationCounts() {
  const { panelInfo } = usePanelInfo();
  if (!panelInfo) return { notifications: 0, pending: 0 };
  
  return {
    notifications: panelInfo.notificationsNumber,
    pending: panelInfo.pendingNumber,
    hasNotifications: panelInfo.notificationsNumber > 0,
    hasPending: panelInfo.pendingNumber > 0,
  };
}
