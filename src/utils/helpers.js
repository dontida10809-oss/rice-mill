// src/utils/helpers.js

/**
 * Format number to Thai locale with commas
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number string
 */
export const formatNumber = (num, decimals = 2) => {
  return parseFloat(num).toLocaleString('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format date to Thai format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short Thai format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('th-TH');
};

/**
 * Calculate total weight from array of items
 * @param {Array} items - Array of items with weight property
 * @returns {number} Total weight
 */
export const calculateTotalWeight = (items) => {
  return items.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
};

/**
 * Calculate total cost from array of items
 * @param {Array} items - Array of items with weight and price properties
 * @returns {number} Total cost
 */
export const calculateTotalCost = (items) => {
  return items.reduce((sum, item) => {
    return sum + (parseFloat(item.weight || 0) * parseFloat(item.price || 0));
  }, 0);
};

/**
 * Filter items by search term
 * @param {Array} items - Array of items to filter
 * @param {string} searchTerm - Search term
 * @param {Array} searchFields - Fields to search in
 * @returns {Array} Filtered items
 */
export const filterBySearchTerm = (items, searchTerm, searchFields = []) => {
  if (!searchTerm) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowerSearchTerm);
    });
  });
};

/**
 * Generate unique ID based on timestamp
 * @returns {number} Unique ID
 */
export const generateId = () => {
  return Date.now();
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {boolean} True if all required fields are filled
 */
export const validateRequiredFields = (data, requiredFields) => {
  return requiredFields.every(field => {
    const value = data[field];
    return value !== null && value !== undefined && value !== '';
  });
};

/**
 * Export data to JSON file
 * @param {Object} data - Data to export
 * @param {string} filename - Filename for download
 */
export const exportToJSON = (data, filename = 'rice-mill-data.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Calculate profit margin percentage
 * @param {number} cost - Total cost
 * @param {number} revenue - Total revenue
 * @returns {number} Profit margin percentage
 */
export const calculateProfitMargin = (cost, revenue) => {
  if (revenue === 0) return 0;
  return ((revenue - cost) / revenue) * 100;
};

/**
 * Group items by a specific field
 * @param {Array} items - Array of items
 * @param {string} field - Field name to group by
 * @returns {Object} Grouped items
 */
export const groupBy = (items, field) => {
  return items.reduce((acc, item) => {
    const key = item[field];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};