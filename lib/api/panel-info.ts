import { PanelInfo } from '../types/panel-info'
import { API_BASE_URL, API_TOKEN, ApiError } from '.'
import { isValidPanelInfo } from '../validation/panel-info'

// Fetch panel info for the current user
export async function fetchPanelInfo(): Promise<PanelInfo> {
  const response = await fetch(`${API_BASE_URL}/panel/info`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const panelInfoData = await response.json()
  
  // Validate the panel info data
  if (!isValidPanelInfo(panelInfoData)) {
    throw new ApiError('Invalid panel info data received from server', 422)
  }

  return panelInfoData
}

// Refresh panel info (alias for fetchPanelInfo for clarity)
export async function refreshPanelInfo(): Promise<PanelInfo> {
  return fetchPanelInfo()
}
