import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Scene from "./homeCharacter/Isometric_bedroom";


const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500 text-center">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-gray-600 text-center mt-2">
          Feel free to reach out. I usually reply within a few hours.
        </p>

        {/* --- Replaced GRID with FLEX --- */}
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-12 md:mt-16 items-center">

          {/* Left Form */}
          <div className="w-full xl:w-5/12">
            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6 text-black"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition resize-y"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="bg-black text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full xl:w-7/12">
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] shadow-sm shadow-gray-600 rounded-2xl sm:rounded-3xl hover:scale-[1.01] transition cursor-grab">
              <Scene></Scene>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;