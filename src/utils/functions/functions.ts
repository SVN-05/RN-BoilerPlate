import {Dimensions} from 'react-native';
import {extractErrorMessage} from '../../store/store';
import {isTablet} from '../../constants/constants';

export const fontSizeCalculator = (fontSize: number, percentage = 20) => {
  const calculatedSize = isTablet
    ? Math.round((fontSize / 100) * percentage) + fontSize
    : fontSize;
  return calculatedSize;
};

export const extractErrKeyValuePairs = (error: any[] | null) => {
  const messages: {key: any; message: any}[] = [];

  const addErrorMessage = (key: string, value: any) => {
    const message = extractErrorMessage(value);
    if (message) {
      messages.push({key, message});
    }
  };

  if (typeof error === 'string') {
    return [{key: 'error', message: error}];
  }

  if (Array.isArray(error)) {
    error.forEach((item, index) => {
      addErrorMessage(`item_${index}`, item);
    });
  } else if (typeof error === 'object' && error !== null) {
    for (const key of Object.keys(error)) {
      addErrorMessage(key, error[key]);
    }
  }

  return messages.length > 0
    ? messages
    : [{key: 'unknown', message: 'An unknown error occurred'}];
};

export const convertUtcToIst = (utcDate: string | number | Date) => {
  const date = new Date(utcDate);

  // Add 5 hours and 30 minutes to the UTC time
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);

  return date;
};

export function convertToWebSocketUrl(url: string) {
  // Check if the URL starts with 'https' or 'http'
  if (url?.startsWith('https://')) {
    // Replace 'https' with 'wss' for secure WebSocket
    return url?.replace('https://', 'wss://');
  } else if (url?.startsWith('http://')) {
    // Replace 'http' with 'ws' for non-secure WebSocket
    return url?.replace('http://', 'ws://');
  } else {
    throw new Error('Invalid URL. Must start with http:// or https://');
  }
}

export function getGreetingMessage(first_name: any, last_name: any) {
  const notAvailable = !first_name && !last_name;
  const userName = notAvailable ? ',' : ` ${first_name} ${last_name},`;
  const hour = new Date().getHours();

  if (hour < 12) return `Good Morning${userName}`;
  if (hour < 17) return `Good Afternoon${userName}`;
  if (hour < 21) return `Good Evening${userName}`;
  return `Good Night ${userName},`;
}

export const calculateSpacingForLineChart = (numItems: number) => {
  // Get the device's screen width
  const {width} = Dimensions.get('window');

  // Item width is assumed to be 1 by default
  const itemWidth = 0.1;

  // Calculate the total width taken by the items (each item has width 1)
  const totalItemWidth = itemWidth * numItems;

  if (numItems === 1) {
    return width / 2;
  }

  // Calculate remaining space for the gaps
  const remainingSpace = width - totalItemWidth;

  // Calculate space between each item
  // The number of gaps is `numItems - 1`
  const spaceBetweenItems = remainingSpace / (numItems - 1);

  return spaceBetweenItems;
};

export const shouldForceUpdate = (
  currentAppVersion: string,
  latestAppVersion: string,
) => {
  if (
    typeof currentAppVersion === 'string' &&
    typeof latestAppVersion === 'string' &&
    currentAppVersion?.length > 0 &&
    latestAppVersion?.length > 0
  ) {
    const currentParts = currentAppVersion.split('.').map(Number);
    const latestParts = latestAppVersion.split('.').map(Number);

    const maxLength = Math.max(currentParts.length, latestParts.length);

    for (let i = 0; i < maxLength; i++) {
      const currentPart = currentParts[i] || 0;
      const latestPart = latestParts[i] || 0;

      if (currentPart < latestPart) {
        return true; // Latest version is greater, force update required
      } else if (currentPart > latestPart) {
        return false; // Current version is greater, no force update
      }
    }

    return false; // Versions are equal, no force update
  }
  return false;
};

export function parseUTMParams(url: string) {
  const parsedUrl = new URL(url);
  const utmParams: Record<string, string> = {};

  ['source', 'medium', 'campaign', 'term', 'content'].forEach(param => {
    const value = parsedUrl.searchParams.get(`utm_${param}`);
    if (value) {
      utmParams[`utm_${param}`] = value;
    }
  });

  return utmParams;
}
