/**
 * Parse duration string (HH:mm:ss) to total minutes
 */
export const parseDuration = (duration: string): number => {
    if (!duration) return 0;
    
    const parts = duration.split(':');
    if (parts.length !== 3) return 0;
    
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    
    return hours * 60 + minutes + Math.ceil(seconds / 60);
  };
  
  /**
   * Format duration string to readable format
   */
  export const formatDuration = (duration: string | number): string => {
    let totalMinutes: number;
    
    if (typeof duration === 'string') {
      totalMinutes = parseDuration(duration);
    } else {
      totalMinutes = duration;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    
    return `${hours}h ${minutes}m`;
  };
  
  /**
   * Format time string to readable format
   */
  export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  /**
   * Format date string to readable format
   */
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };