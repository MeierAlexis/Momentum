import Stripe from "stripe";
import dotenv from "dotenv/config";

// Verifica que la clave de Stripe esté definida
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "La clave secreta de Stripe no está definida en las variables de entorno"
  );
} else {
}

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentBasicPlan = async (req, res) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 1000, // 30.00 USD
            product_data: {
              name: "Basic Plan",
              description:
                "With this plan, you’ll have full access to basic features to organize your life and boost your productivity. You can integrate the app with popular tools like Google Calendar, ensuring everything stays synchronized and well-planned. Additionally, you'll have a daily habit tracking system to help you stay consistent with your routines. And if you need assistance, our standard support team will be available to help you at any time.",
            },
            recurring: { interval: "month" }, // Suscripción mensual
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173",
    });

    return res.status(200).json({
      success: true,
      message: "Payment created",
      session,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating payment",
    });
  }
};

export const createPaymentPremiumPlan = async (req, res) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 7000, // 70.00 USD
            product_data: {
              name: "Premium Plan",
              description:
                "This plan gives you full access to all features, allowing you to make the most of every tool available. You'll benefit from advanced tools like progress analysis and detailed monthly reports to track your growth effectively. Additionally, you'll receive priority support whenever you need assistance. For an even more personalized experience, you'll have exclusive support with a weekly call from a mentor to help guide you on your journey.",
            },
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173",
    });

    return res.status(200).json({
      success: true,
      message: "Payment created",
      session,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating payment",
    });
  }
};

export const createPaymentProPlan = async (req, res) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 3000, // 10.00 USD
            product_data: {
              name: "Pro Plan",
              description:
                "This plan offers limited access, allowing users to set up to 3 active goals at a time. It includes weekly habit tracking to help maintain progress but does not provide priority support. Ideal for those looking to get started with goal setting and habit tracking.",
            },
            recurring: { interval: "month" }, // Suscripción mensual
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173",
    });

    return res.status(200).json({
      success: true,
      message: "Payment created",
      session,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating payment",
    });
  }
};
