// App configuration
export const APP_CONFIG = {
  name: "RUN APP",
  version: "1.0.0",
  description: "Track your running progress and analyze your performance"
};

// Chart configuration
export const CHART_COLORS = {
  primary: "rgba(59, 130, 246, 0.6)",
  primaryBorder: "rgba(59, 130, 246, 1)",
  secondary: "rgba(16, 185, 129, 0.6)",
  secondaryBorder: "rgba(16, 185, 129, 1)"
};

// Data formatting
export const DATE_FORMATS = {
  short: { month: 'short', day: 'numeric' },
  full: { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }
};

// API configuration (for future use)
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000
};

// UI constants
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};