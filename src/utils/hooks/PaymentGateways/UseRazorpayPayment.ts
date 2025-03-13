import {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';

export interface RazorpayData {
  razorpay_key: string;
  razorpay_order_id: string;
  description?: string;
  email?: string;
  name?: string;
  phone_number?: string;
  currency: string;
  amount: number;
}

export type VerifyPaymentFunction = (
  orderId: string,
  paymentId: string,
  signature: string,
) => void;

export const useRazorpayPayment = (
  razorPayData: RazorpayData,
  verifyPayment: VerifyPaymentFunction,
  primaryColor: string,
) => {
  const [verifyTriggered, setVerifyTriggered] = useState<boolean>(false);
  const [isUnknownError, setIsUnknownError] = useState<boolean>(false);

  const initiatePayment = (): void => {
    const options = {
      key: razorPayData.razorpay_key,
      order_id: razorPayData.razorpay_order_id,
      description: razorPayData.description,
      // image: 'https://i.imgur.com/3g7nmJC.png', // optional
      prefill: {
        email: razorPayData.email,
        name: razorPayData.name,
        contact: razorPayData.phone_number,
      },
      currency: razorPayData.currency,
      amount: razorPayData.amount,
      name: 'Truliv',
      theme: {color: primaryColor},
    };

    if (!verifyTriggered && !isUnknownError) {
      RazorpayCheckout.open(options)
        .then(
          (data: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            setVerifyTriggered(true);
            verifyPayment(
              data.razorpay_order_id,
              data.razorpay_payment_id,
              data.razorpay_signature,
            );
          },
        )
        .catch((error: any) => {
          console.log('Payment error:', error);
          const checkReason = [
            error?.details?.error?.reason,
            error?.error?.reason,
          ]?.includes('payment_cancelled');
          const checkSource = [
            error?.details?.error?.source,
            error?.error?.source,
          ]?.includes('customer');

          if (checkReason && checkSource) {
            Toast.show({text2: 'Cancelled By User!!!', type: 'error'});
          } else {
            setIsUnknownError(true);
          }
        });
    }
  };

  return {initiatePayment, verifyTriggered, isUnknownError};
};

export default useRazorpayPayment;
