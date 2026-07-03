"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  User,
  Send,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import { useSubmitContactMutation } from "@/store/api/apiSlice";
import { checkoutFormSchema } from "@/lib/validation";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [submitContact] = useSubmitContactMutation();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Zod validation
    const validation = checkoutFormSchema.safeParse({
      name,
      email,
      phone,
      address,
      notes,
    });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSubmitting(true);

    try {
      const itemsList = cartItems
        .map((item) => `${item.name} (${item.weight}) x ${item.quantity}`)
        .join(", ");
      // Post to contact leads as a pre-order inquiry
      await submitContact({
        name,
        email,
        phone,
        subject: `Pre-Order Inquiry [Total: ₹${cartTotal}]`,
        message: `Order Items: ${itemsList}. \nShipping Address: ${address}. \nNotes: ${notes}`,
        type: "order",
      }).unwrap();

      const randomId = "INQ-" + Math.floor(1000 + Math.random() * 9000);
      setOrderId(randomId);
      setCompleted(true);
      dispatch(clearCart());
      toast.success("Your order inquiry has been received! 🌿");
    } catch (error) {
      toast.error(
        "Something went wrong. Please check your network connection.",
      );
    }
    setSubmitting(false);
  };

  const deliveryCharges = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + deliveryCharges;

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        <div className="container-luxury section-padding">
          {!completed ? (
            <>
              {/* Back to cart */}
              <div className="mb-6">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-xs font-button font-semibold text-text-muted hover:text-primary-DEFAULT transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to Shop
                </Link>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Form: Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-border-DEFAULT rounded-3xl p-6 md:p-8 shadow-luxury">
                    <h2 className="font-heading text-lg md:text-xl font-bold text-primary-DEFAULT mb-6 flex items-center gap-2">
                      <Send size={18} className="text-accent-DEFAULT" />
                      Inquiry / Delivery Details
                    </h2>

                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="form-floating">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" "
                            required
                            id="checkout-name"
                          />
                          <label htmlFor="checkout-name">Full Name *</label>
                          <User
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                          />
                        </div>
                        <div className="form-floating">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder=" "
                            required
                            id="checkout-phone"
                          />
                          <label htmlFor="checkout-phone">Phone Number *</label>
                          <Phone
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                          />
                        </div>
                      </div>

                      <div className="form-floating">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder=" "
                          required
                          id="checkout-email"
                        />
                        <label htmlFor="checkout-email">Email Address *</label>
                        <Mail
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                        />
                      </div>

                      <div className="form-floating">
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder=" "
                          required
                          rows={3}
                          id="checkout-address"
                          className="!py-3"
                        />
                        <label htmlFor="checkout-address">
                          Full Delivery Address *
                        </label>
                        <MapPin
                          size={16}
                          className="absolute right-4 top-5 text-text-muted"
                        />
                      </div>

                      <div className="form-floating">
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder=" "
                          rows={2}
                          id="checkout-notes"
                          className="!py-3"
                        />
                        <label htmlFor="checkout-notes">
                          Notes / Special Instructions (Optional)
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting || cartItems.length === 0}
                        className="btn-primary-luxury w-full justify-center py-3.5 mt-2 text-sm"
                      >
                        <span>
                          {submitting
                            ? "Processing Inquiry..."
                            : `Submit Pre-Order Inquiry (₹${grandTotal.toLocaleString()})`}
                        </span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-1 bg-white border border-border-DEFAULT rounded-3xl p-6 shadow-luxury space-y-6">
                  <h3 className="font-heading text-lg font-bold text-primary-DEFAULT border-b border-border-light pb-3">
                    Order Summary
                  </h3>

                  <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border-light bg-background flex-shrink-0">
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-xs font-bold text-primary-DEFAULT truncate">
                            {item.name}
                          </h4>
                          <p className="text-xxs text-text-muted font-body mt-0.5">
                            {item.weight} x {item.quantity}
                          </p>
                        </div>
                        <span className="font-heading text-xs font-bold text-primary-DEFAULT">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {cartItems.length === 0 && (
                      <p className="text-xs text-text-muted font-body py-4 text-center">
                        No items in cart
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border-light pt-4 space-y-2">
                    <div className="flex justify-between text-xs font-body text-text-muted">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-primary-DEFAULT">
                        ₹{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-body text-text-muted">
                      <span>Delivery Charges</span>
                      <span className="font-semibold text-green-600">
                        {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                      </span>
                    </div>
                    <div className="h-px bg-border-light my-2" />
                    <div className="flex justify-between text-sm font-heading font-bold text-primary-DEFAULT">
                      <span>Grand Total</span>
                      <span>₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-primary-50 border border-primary-DEFAULT/10 text-xxs text-text-muted font-body leading-normal">
                    <ShieldCheck
                      size={16}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <span>
                      Submission sends a Pre-Order Inquiry to our team. We will
                      contact you immediately on WhatsApp/Phone to finalize
                      payment and shipping.
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Thank you page */
            <div className="max-w-xl mx-auto text-center py-16 bg-white border border-border-DEFAULT rounded-3xl p-8 md:p-12 shadow-luxury space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <CheckCircle2 size={44} className="text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-DEFAULT">
                  Inquiry Received! 🎉
                </h1>
                <p className="text-xs font-button font-semibold text-accent-DEFAULT uppercase tracking-wider">
                  Reference: {orderId}
                </p>
                <p className="text-text-muted font-body text-sm px-4">
                  Thank you,{" "}
                  <strong className="text-primary-DEFAULT">{name}</strong>. Your
                  pre-order request has been logged. Our sales support desk will
                  contact you shortly to finalize details.
                </p>
              </div>

              <div className="pt-6 border-t border-border-light flex flex-wrap justify-center gap-4">
                <Link href="/" className="btn-primary-luxury">
                  <span>Back to Homepage</span>
                </Link>
                <Link
                  href="/products"
                  className="btn-outline-luxury"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
