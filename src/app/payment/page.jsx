"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/Components/CheckoutForm/CheckoutForm";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading/Loading";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function PaymentPage() {
  const session = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentPage;
