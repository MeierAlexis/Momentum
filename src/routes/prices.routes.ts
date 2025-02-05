import { Router } from "express";
import {
  createPaymentBasicPlan,
  createPaymentPremiumPlan,
  createPaymentProPlan,
} from "../controllers/prices.controllers.ts";

const router = Router();

router.post("/create-payment-pro-plan", createPaymentProPlan);
router.post(
  "/create-payment-premium-plan",

  createPaymentPremiumPlan
);
router.post("/create-payment-basic-plan", createPaymentBasicPlan);

export default router;
