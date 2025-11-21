"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  specialRequest: string;
};

type BookingErrors = Partial<Record<keyof BookingFormData, string>>;

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    specialRequest: "",
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [loading, setLoading] = useState(false);

  // === Local Validation ===
  const validate = () => {
    const err: BookingErrors = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.includes("@")) err.email = "Invalid email address";

    if (!/^[0-9]{10}$/.test(form.phone)) {
      err.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.roomType) err.roomType = "Select a room type";

    if (!form.checkIn) err.checkIn = "Check-in date required";
    if (!form.checkOut) err.checkOut = "Check-out date required";

    if (form.checkIn && form.checkOut) {
      if (new Date(form.checkOut) <= new Date(form.checkIn)) {
        err.checkOut = "Check-out must be after check-in";
      }
    }

    if (form.guests < 1) err.guests = "At least one guest is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // === Handle Input ===
  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === Submit Form ===
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Fix the highlighted errors");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (res.ok) {
        toast.success("Booking successful!");

        setForm({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: 1,
          roomType: "",
          specialRequest: "",
        });

        setErrors({});
        return;
      }

      // Backend validation errors
      if (json.errors) {
        Object.values(json.errors).forEach((msg) =>
          toast.error(String(msg))
        );
        return;
      }

      toast.error(json.message || "Booking failed");
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      id="booking"
      className="py-20 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="flex justify-center px-6">
        <div className="backdrop-blur-xl bg-white/20 shadow-xl border border-white/30 p-10 rounded-3xl max-w-3xl w-full">
          <h2 className="text-4xl font-bold text-[#2f2f2f] mb-8 text-center drop-shadow">
            Book Your Stay
          </h2>

          <form
            onSubmit={submit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Phone Number
              </label>
              <input
                name="phone"
                maxLength={10}
                value={form.phone}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.phone && (
                <p className="text-red-300 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Room Type */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Room Type
              </label>
              <select
                name="roomType"
                value={form.roomType}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              >
                <option value="">Select Room Type</option>
                <option value="Standard">Standard Room</option>
                <option value="Deluxe">Deluxe Room</option>
                <option value="Suite">Suite</option>
              </select>
              {errors.roomType && (
                <p className="text-red-300 text-sm">{errors.roomType}</p>
              )}
            </div>

            {/* Check-In */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Check-In
              </label>
              <input
                name="checkIn"
                type="date"
                min={today}
                value={form.checkIn}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.checkIn && (
                <p className="text-red-300 text-sm">{errors.checkIn}</p>
              )}
            </div>

            {/* Check-Out */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Check-Out
              </label>
              <input
                name="checkOut"
                type="date"
                min={form.checkIn || today}
                value={form.checkOut}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.checkOut && (
                <p className="text-red-300 text-sm">{errors.checkOut}</p>
              )}
            </div>

            {/* Guests */}
            <div>
              <label className="block mb-1 font-medium text-[#4a5568]">
                Guests
              </label>
              <input
                name="guests"
                type="number"
                min={1}
                value={form.guests}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-[#1a1a1a]"
              />
              {errors.guests && (
                <p className="text-red-300 text-sm">{errors.guests}</p>
              )}
            </div>

            {/* Special Request */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-[#4a5568]">
                Special Request
              </label>
              <textarea
                name="specialRequest"
                value={form.specialRequest}
                onChange={handle}
                className="w-full p-3 rounded-lg bg-white/30 border border-white/40 h-24 text-[#1a1a1a]"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
