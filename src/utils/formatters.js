/**
 * Format pace from decimal minutes to MM:SS format
 * @param {number} pace - Pace in decimal minutes per km
 * @returns {string} Formatted pace string (e.g., "5:30")
 */
export const formatPace = (pace) => {
  if (!pace || pace <= 0) return "0:00";
  
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace % 1) * 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Format distance with appropriate decimal places
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (!distance) return "0";
  
  // Show 2 decimal places for distances less than 10km
  if (distance < 10) {
    return Number(distance).toFixed(2);
  }
  
  // Show 1 decimal place for distances 10km and above
  return Number(distance).toFixed(1);
};

/**
 * Format time duration to human readable format
 * @param {string} timeString - Time in HH:MM:SS or MM:SS format
 * @returns {string} Formatted time string
 */
export const formatTime = (timeString) => {
  if (!timeString) return "0:00";
  
  const parts = timeString.split(':');
  
  if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts;
    return `${hours}:${minutes}:${seconds}`;
  } else if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts;
    return `${minutes}:${seconds}`;
  }
  
  return timeString;
};

/**
 * Convert time string to total minutes
 * @param {string} timeString - Time in HH:MM:SS or MM:SS format
 * @returns {number} Total minutes
 */
export const timeToMinutes = (timeString) => {
  if (!timeString) return 0;
  
  const parts = timeString.split(':').map(Number);
  
  if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts;
    return hours * 60 + minutes + seconds / 60;
  } else if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts;
    return minutes + seconds / 60;
  }
  
  return 0;
};

/**
 * Calculate pace from distance and time
 * @param {number} distance - Distance in kilometers
 * @param {string} timeString - Time in HH:MM:SS or MM:SS format
 * @returns {number} Pace in minutes per kilometer
 */
export const calculatePace = (distance, timeString) => {
  if (!distance || !timeString || distance <= 0) return 0;
  
  const totalMinutes = timeToMinutes(timeString);
  return totalMinutes / distance;
};

/**
 * Format date for display
 * @param {Date} date - Date object
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = { month: 'short', day: 'numeric' }) => {
  if (!date) return "";
  
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};