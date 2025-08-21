// Re-export hooks for easier importing
export {
  usePanelInfo,
  useUserInfo,
  useOrganizationInfo,
  useNotificationCounts,
  PanelInfoProvider,
} from '@/app/panel-info-context';

// Additional utility hooks
import { usePanelInfo } from '@/app/panel-info-context';

// Hook to check if panel info is loaded
export function usePanelInfoLoaded() {
  const { panelInfo, loading } = usePanelInfo();
  return !loading && panelInfo !== null;
}

// Hook to get loading state
export function usePanelInfoLoading() {
  const { loading } = usePanelInfo();
  return loading;
}

// Hook to get error state
export function usePanelInfoError() {
  const { error } = usePanelInfo();
  return error;
}
