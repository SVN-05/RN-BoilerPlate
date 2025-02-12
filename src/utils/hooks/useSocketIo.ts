import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

interface SocketIoHook {
  messageData: any;
  isConnected: boolean;
  sendMessage: (messageKey: string, message: any) => void;
  error: string | null;
}

export const useSocketIo = (
  url: string,
  reconnectInterval: number = 3000,
): SocketIoHook => {
  const [messageData, setMessageData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const socket = io(url, {
    reconnectionDelay: reconnectInterval,
  });

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on('message', (data: string) => {
      setMessageData(JSON.parse(data));
    });

    socket.on('error', (err: any) => {
      setError(`Socket error: ${err}`);
      console.error('Socket error:', err);
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (messageKey: string, message: any) => {
    if (isConnected) {
      socket.emit(messageKey, message);
    }
  };

  return {messageData, isConnected, sendMessage, error};
};
