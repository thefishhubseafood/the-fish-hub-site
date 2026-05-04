"use client";

import Image from "next/image";
import { useState } from "react";

const seafoodItems = [
  { english: "Thora", sinhala: "තෝරා" },
  { english: "Savara", sinhala: "සවරා" },
  { english: "Parawa", sinhala: "පරව්වා" },
  { english: "Jumbo Prawns", sinhala: "ජම්බෝ ඉස්සෝ" },
  { english: "Peeli Dalla", sinhala: "පීලි දැල්ලෝ" },
  { english: "Gemba Dalla", sinhala: "ගෙම්බා දැල්ලෝ" },
  { english: "Garuba (Kossa)", sinhala: "ගරුබා (කොස්සා)" },
  { english: "Rice Prawns", sinhala: "රයිස් ඉස්සෝ" },
  { english: "Small Prawns", sinhala: "කුඩා ඉස්සෝ" },
  { english: "Medium Prawns", sinhala: "මධ්‍යම ඉස්සෝ" },
  { english: "Mullet", sinhala: "මලට්" },
  { english: "Lagoon Crabs", sinhala: "කලපු කකුළුවෝ" },
  { english: "Sea Crab", sinhala: "මුහුදු කකුළුවෝ" },
  { english: "Dalla", sinhala: "දැල්ලෝ" },
  { english: "Handello", sinhala: "හැන්දැල්ලෝ" },
  { english: "Tuna", sinhala: "ටූනා" },
  { english: "Linna", sinhala: "ලින්නා" },
  { english: "Balaya", sinhala: "බලයා" },
  { english: "Kelawalla", sinhala: "කෙලවල්ලා" },
];

const gallery = [
  { src: "/images/tuna-body.jpeg", alt: "Fresh tuna selection", title: "Fresh daily catch" },
  { src: "/images/prawns.jpeg", alt: "Fresh prawns on ice", title: "Prawns & shellfish" },
  { src: "/images/crab.jpeg", alt: "Fresh sea crab", title: "Quality crab supply" },
  { src: "/images/tuna-cut.jpeg", alt: "Cut tuna section", title: "Bulk order ready" },
  { src: "/images/long-fish.jpeg", alt: "Fresh fish display", title: "Reliable market sourcing" },
];

const buyerTypes = [
  "Restaurants",
  "Hotels",
  "Supermarkets",
  "Caterers",
  "Seafood Retailers",
];

export default function Page() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      businessName: String(formData.get("businessName") || ""),
      contactPerson: String(formData.get("contactPerson") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      seafoodItem: String(formData.get("seafoodItem") || ""),
      quantity: String(formData.get("quantity") || ""),
      requiredDate: String(formData.get("requiredDate") || ""),
      deliveryLocation: String(formData.get("deliveryLocation") || ""),
      notes: String(formData.get("notes") || ""),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("Quote request sent successfully. We will get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send the request.");
    }
  }

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand">
            <Image src="/images/logo.png" alt="The Fish Hub logo" width={74} height={74} className="brand-logo" />
            <div>
              <div className="brand-title">The Fish Hub</div>
              <div className="brand-tagline">Fresh Catch. Trusted Supply.</div>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#range">Seafood</a>
            <a href="#buyers">Who We Serve</a>
            <a href="#quote">Request Quote</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <div className="pill">Reliable seafood supply across the Western Province</div>

            <h1 className="hero-title-small">
              Premium seafood supply for restaurants, hotels, supermarkets and bulk buyers.
            </h1>

            <p className="hero-copy">
              The Fish Hub delivers dependable sourcing, strong daily pricing and quality seafood backed by a reliable
              supplier with more than 70 years of market experience.
            </p>

            <div className="hero-actions">
              <a href="#quote" className="button button-primary">Request a Quote</a>
              <a href="#range" className="button button-secondary">View Seafood Range</a>
            </div>

            <div className="hero-badges">
              <span>Daily Price on Request</span>
              <span>Bulk Orders Accepted</span>
              <span>Hotel & Restaurant Supply</span>
              <span>Reliable Delivery</span>
            </div>
          </div>

          <div className="hero-card-grid">
            <article className="info-card">
              <h3>Fresh Daily Catch</h3>
              <p>Seafood selected for freshness, quality and dependable trade supply.</p>
            </article>
            <article className="info-card">
              <h3>Best Price, Best Quality</h3>
              <p>Competitive daily pricing with a strong focus on product value and consistency.</p>
            </article>
            <article className="info-card">
              <h3>Trusted Supply Chain</h3>
              <p>Built around a reliable supplier with over 70 years in the seafood market.</p>
            </article>
            <article className="info-card">
              <h3>Young, Honest Service</h3>
              <p>Driven by two hardworking entrepreneurs focused on trust, speed and long-term relationships.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container logo-strip">
          <div className="logo-panel">
            <Image src="/images/logo.png" alt="The Fish Hub logo" width={260} height={260} />
          </div>
          <div className="text-panel">
            <p className="eyebrow">About The Fish Hub</p>
            <h2>Fresh seafood supplied with trust, quality and professionalism.</h2>
            <p>
              Based in Mount Road, Moratuwa, The Fish Hub is a growing seafood business built on honest service,
              strong sourcing and a professional approach to trade supply.
            </p>
            <p>
              Led by two young, hardworking entrepreneurs, The Fish Hub is focused on giving buyers the best possible
              balance of freshness, value and reliable service.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="about">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">Why buyers choose us</p>
            <h2>Built for serious seafood buyers.</h2>
          </div>
          <div className="feature-list">
            <div className="feature-item">Fresh daily catch</div>
            <div className="feature-item">Best price and best quality focus</div>
            <div className="feature-item">Bulk orders accepted</div>
            <div className="feature-item">Reliable delivery within the Western Province</div>
            <div className="feature-item">Hotel, restaurant and retail supply</div>
            <div className="feature-item">Fast response by phone, WhatsApp and email</div>
          </div>
        </div>
      </section>

      <section className="section" id="range">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Seafood Range</p>
              <h2>Our available seafood selection</h2>
            </div>
            <p className="muted">Pricing is shared based on daily market availability.</p>
          </div>

          <div className="catalog-grid">
            {seafoodItems.map((item) => (
              <div className="catalog-card" key={item.english}>
                <div className="catalog-name">{item.english}</div>
                <div className="catalog-sinhala">{item.sinhala}</div>
                <div className="catalog-meta">Daily price on request</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head section-head-dark">
            <div>
              <p className="eyebrow eyebrow-dark">Fresh from the market</p>
              <h2>Real product visuals from your seafood supply</h2>
            </div>
          </div>

          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure className="gallery-card" key={item.src}>
                <div className="gallery-image-wrap">
                  <Image src={item.src} alt={item.alt} fill className="gallery-image" />
                </div>
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="buyers">
        <div className="container buyers-panel">
          <div>
            <p className="eyebrow">Who We Serve</p>
            <h2>Designed for business buyers who need consistency and speed.</h2>
            <p>
              We supply seafood for day-to-day purchasing and repeat orders, with direct communication and fast quote handling.
            </p>
          </div>
          <div className="buyers-grid">
            {buyerTypes.map((type) => (
              <div className="buyer-card" key={type}>{type}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="quote">
        <div className="container quote-grid">
          <div>
            <p className="eyebrow">Request a Quote</p>
            <h2>Send your seafood inquiry directly from the website.</h2>
            <p>
              Since seafood prices depend on daily supply and market conditions, submit your order details and we will
              confirm availability, pricing and delivery.
            </p>

            <div className="contact-box">
              <strong>Quick contact</strong>
              <span>Phone: 0776386355 / 0718807707</span>
              <span>WhatsApp: 0776386355 / 0718807707</span>
              <span>Email: thefishhubseafood@gmail.com</span>
            </div>
          </div>

          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Business Name
                <input name="businessName" required placeholder="Ocean Pearl Restaurant" />
              </label>
              <label>
                Contact Person
                <input name="contactPerson" required placeholder="John Silva" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="buyer@business.com" />
              </label>
              <label>
                Phone
                <input name="phone" required placeholder="+94 77 123 4567" />
              </label>
            </div>

            <label>
              Seafood Item
              <select name="seafoodItem" required defaultValue="">
                <option value="" disabled>Select a seafood item</option>
                {seafoodItems.map((item) => (
                  <option key={item.english} value={`${item.english} - ${item.sinhala}`}>
                    {item.english} - {item.sinhala}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-grid">
              <label>
                Quantity
                <input name="quantity" required placeholder="25 kg" />
              </label>
              <label>
                Required Date
                <input name="requiredDate" type="date" />
              </label>
            </div>

            <label>
              Delivery Location
              <input name="deliveryLocation" required placeholder="Western Province" />
            </label>

            <label>
              Order Notes
              <textarea
                name="notes"
                rows={5}
                placeholder="Mention preferred size, cleaning requirement, delivery details or any special instructions."
              />
            </label>

            <button className="button button-primary full-width" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit Quote Request"}
            </button>

            {message ? (
              <p className={status === "success" ? "form-message success" : "form-message error"}>{message}</p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Location</p>
            <h3>The Fish Hub</h3>
            <p>Mount Road, Moratuwa</p>
            <p>Delivery area: Western Province</p>
          </div>
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h3>Phone & WhatsApp</h3>
            <p>0776386355</p>
            <p>0718807707</p>
          </div>
          <div className="contact-card">
            <p className="eyebrow">Orders</p>
            <h3>Email</h3>
            <p>thefishhubseafood@gmail.com</p>
            <p>Daily price on request</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>© 2026 The Fish Hub. All rights reserved.</div>
          <div>thefishhub.lk</div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/94776386355"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}