import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * Custom hook for managing WebSocket connection and returning messages.
 * Supports auto-reconnection and handling different types of messages.
 * @param {string} url - The WebSocket server URL.
 * @param {number} reconnectInterval - Time (in ms) between automatic reconnect attempts.
 * @returns {object} An object with the following properties:
 *   - `data`: The most recent message received from the WebSocket server.
 *   - `isConnected`: Whether the WebSocket is connected.
 *   - `error`: Error message if any error occurs.
 *   - `sendMessage`: Function to send a message to the WebSocket server.
 */
interface WebSocketMessage {
  [key: string]: any;
}

interface UseWebSocketReturn {
  data: WebSocketMessage;
  isConnected: boolean;
  error: string | null;
  sendMessage: (msg: string) => void;
}

const useWebSocket = (
  url: string,
  reconnectInterval: number = 5000,
): UseWebSocketReturn => {
  const [data, setData] = useState<WebSocketMessage>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log('WebSocket connected');
    };

    socketRef.current.onerror = (err: Event) => {
      setError(`Connection error: ${err}`);
      console.error('WebSocket connection error:', err);

      setTimeout(connectWebSocket, reconnectInterval);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');

      if (error) {
        setTimeout(connectWebSocket, reconnectInterval);
      }
    };

    socketRef.current.onmessage = event => {
      setData(event?.data ? JSON.parse(event?.data) : {});
      const err = event?.data?.error;
      if (err) {
        setError(err);
        setTimeout(connectWebSocket, reconnectInterval);
      }
    };
  }, [url, reconnectInterval, error]);

  const sendMessage = (msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.error('WebSocket is not connected. Cannot send message.');
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [connectWebSocket]);

  return {data, isConnected, error, sendMessage};
};

export default useWebSocket;
