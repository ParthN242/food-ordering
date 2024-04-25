"use client";
import { useContext } from "react";
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "@/Provider/AppContext";
import { useRouter } from "next/navigation";

function CheckoutForm() {
  const router = useRouter();
  const { profile, cart, clearCart } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();

  const orderInfo = JSON.parse(
    typeof window !== "undefined" ? localStorage.getItem("orderInfo") : null
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount: Math.round(orderInfo.total * 100),
    };

    const order = {
      userEmail: profile.email,
      phone: orderInfo.shippingInfo.phone,
      address: orderInfo.shippingInfo.address,
      postalCode: orderInfo.shippingInfo.postalCode,
      city: orderInfo.shippingInfo.city,
      country: orderInfo.shippingInfo.country,
      cartProducts: cart,
    };

    try {
      const { data } = await axios.get(
        `/api/checkout?amount=${paymentData.amount}`
      );

      const client_secret = data.client_secret;
      console.log("client_secret: ", client_secret);

      if (!stripe || !elements) return;

      const paymentPromise = new Promise(async (resolve, reject) => {
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: profile.name,
              email: profile.email,
              address: {
                line1: order.address,
                city: order.city,
                postal_code: order.postalCode,
                country: "US",
              },
            },
          },
        });

        console.log("result: ", result);
        if (result.error) {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          toast.error(result.error.message);
          reject();
        } else {
          if (result.paymentIntent.status === "succeeded") {
            const { data } = await axios.post("/api/order", {
              orderInfo: order,
            });
            clearCart();
            localStorage.removeItem("orderInfo");
            resolve();
            router.push("/orders");
          } else {
            reject();
          }
        }
      });
      toast.promise(paymentPromise, {
        pending: "Payment is processing",
        success: "Payment success",
        error: "There's some issue while processing payment ",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
        <h1 className="text-center font-semibold text-3xl text-primary">
          Payment
        </h1>
        <div>
          <label htmlFor="">Card Number</label>
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <label htmlFor="">Expiry Date</label>

          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <label htmlFor="">CVV</label>
          <CardCvcElement className="paymentInput" />
        </div>

        <button className="button">Pay - ${orderInfo?.total} </button>
      </form>
    </section>
  );
}

export default CheckoutForm;
