/**
 * Get color for transport mode
 */
export const getTransportModeColor = (mode: string): string => {
    const colors: Record<string, string> = {
      Bus: '#FF6B35',
      Metro: '#004E89',
      Train: '#22C55E',
      Tram: '#8B5CF6',
      Ferry: '#06B6D4',
      Walk: '#6B7280',
    };
    return colors[mode] || '#3B82F6';
  };
  
  /**
   * Get icon for transport mode
   */
  export const getTransportModeIcon = (mode: string): string => {
    const icons: Record<string, string> = {
      Bus: '🚌',
      Metro: '🚇',
      Train: '🚆',
      Tram: '🚋',
      Ferry: '⛴️',
      Walk: '🚶',
    };
    return icons[mode] || '🚌';
  };