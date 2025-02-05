import { createContext, useContext } from "react";

import {
  createPaymentBasicPlanRequest,
  createPaymentPremiumPlanRequest,
  createPaymentProPlanRequest,
} from "../api/payment";

interface PaymentContextType {
  createPaymentBasicPlan: () => Promise<void>;
  createPaymentPremiumPlan: () => Promise<void>;
  createPaymentProPlan: () => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const createPaymentBasicPlan = async () => {
    try {
      const res = await createPaymentBasicPlanRequest();
      if (res) {
        const url = res.data.session.url;
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createPaymentPremiumPlan = async () => {
    try {
      const res = await createPaymentPremiumPlanRequest();
      if (res) {
        const url = res.data.session.url;
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createPaymentProPlan = async () => {
    try {
      const res = await createPaymentProPlanRequest();
      if (res) {
        const url = res.data.session.url;
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PaymentContext.Provider
      value={{
        createPaymentBasicPlan,
        createPaymentPremiumPlan,
        createPaymentProPlan,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
