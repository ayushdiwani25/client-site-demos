import { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Clock3,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { cars, extras, locations } from "./data";
import "./styles.css";



function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [loc.pathname]);
  return (
    <div className="app">
      <header className="nav">
        <Link to="/car-rental" className="logo">
          VEYRA<span>®</span>
        </Link>
        <nav className={open ? "nav-links mobile-open" : "nav-links"}>
          <Link
            className={loc.pathname === "/car-rental" ? "active" : ""}
            to="/car-rental"
          >
            Home
          </Link>
          <Link
            className={loc.pathname === "/car-rental/fleet" ? "active" : ""}
            to="/car-rental/fleet"
          >
            Fleet
          </Link>
          <Link to="/car-rental/offers">Offers</Link>
          <Link to="/car-rental/locations">Locations</Link>
          <Link to="/car-rental/about">About</Link>
          <Link to="/car-rental/contact">Contact</Link>
        </nav>
        <Link to="/car-rental/fleet" className="nav-cta">
          Find a car <ArrowUpRight size={16} />
        </Link>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {children}
      <footer className="footer">
        <div>
          <div className="logo">
            VEYRA<span>®</span>
          </div>
          <p>Premium mobility, thoughtfully delivered.</p>
        </div>
        <div className="footer-links">
          <div>
            <b>Explore</b>
            <Link to="/car-rental/fleet">Our fleet</Link>
            <Link to="/car-rental/offers">Offers</Link>
            <Link to="/car-rental/locations">Locations</Link>
          </div>
          <div>
            <b>Company</b>
            <Link to="/car-rental/about">About</Link>
            <Link to="/car-rental/contact">Contact</Link>
            <span>Privacy</span>
          </div>
        </div>
        <div className="copyright">
          © 2026 Veyra Mobility. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={"section-title " + (center ? "center" : "")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
function CarCard({ car, favs, setFavs }) {
  const liked = favs.includes(car.id);
  return (
    <article className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <span className="tag">{car.tag}</span>
        <button
          className={"heart " + (liked ? "liked" : "")}
          onClick={() =>
            setFavs(
              liked ? favs.filter((x) => x !== car.id) : [...favs, car.id],
            )
          }
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="car-info">
        <div className="car-top">
          <div>
            <span className="muted">{car.type}</span>
            <h3>{car.name}</h3>
          </div>
          <div className="price">
            <b>${car.price}</b>
            <span>/day</span>
          </div>
        </div>
        <div className="specs">
          <span>
            <Users size={15} />
            {car.seats} seats
          </span>
          <span>
            <Gauge size={15} />
            {car.transmission}
          </span>
          <span>
            <Fuel size={15} />
            {car.fuel}
          </span>
        </div>
        <Link to={"/car-rental/cars/" + car.id} className="text-link">
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
function Home() {
  const [favs, setFavs] = useLocalState("veyra-favorites", []);
  const [location, setLocation] = useState("Mumbai");
  const navigate = useNavigate();
  return (
    <Shell>
      <main>
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="eyebrow light">PREMIUM CAR RENTAL</span>
            <h1>
              Drive beyond
              <br />
              <i>expectations.</i>
            </h1>
            <p>
              Exceptional cars. Effortless booking. Wherever the road takes you.
            </p>
            <div className="booking-box">
              <div className="field">
                <MapPin size={18} />
                <label>
                  Pick-up location
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {locations.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="field">
                <Clock3 size={18} />
                <label>
                  Pick-up date
                  <input type="date" defaultValue="2026-10-04" />
                </label>
              </div>
              <div className="field">
                <Clock3 size={18} />
                <label>
                  Return date
                  <input type="date" defaultValue="2026-10-08" />
                </label>
              </div>
              <button
                onClick={() =>
                  navigate("/car-rental/fleet?location=" + location)
                }
                className="search-btn"
              >
                Search cars <ArrowRight />
              </button>
            </div>
          </div>
          <div className="hero-bottom">
            <span>01 — 04</span>
            <span>Scroll to explore ↓</span>
          </div>
        </section>
        <section className="trust-strip">
          <span>Trusted by discerning travelers</span>
          <b>
            12K+ <small>Happy journeys</small>
          </b>
          <b>
            180+ <small>Premium vehicles</small>
          </b>
          <b>
            18 <small>City locations</small>
          </b>
          <b>
            4.9/5 <small>Guest rating</small>
          </b>
        </section>
        <section className="section">
          <SectionTitle
            eyebrow="THE COLLECTION"
            title="Your next drive is waiting."
            text="From effortless city cruising to unforgettable weekend escapes, choose a vehicle that fits the moment."
          />
          <div className="car-grid">
            {cars.slice(0, 4).map((c) => (
              <CarCard key={c.id} car={c} favs={favs} setFavs={setFavs} />
            ))}
          </div>
          <Link to="/car-rental/fleet" className="outline-btn">
            Explore entire fleet <ArrowRight size={17} />
          </Link>
        </section>
        <section className="dark-section split">
          <div>
            <span className="eyebrow light">THE VEYRA STANDARD</span>
            <h2>
              More than a rental.
              <br />
              <i>A better way to move.</i>
            </h2>
            <p>
              Every Veyra journey is built around one idea: premium should feel
              effortless. Carefully selected vehicles, transparent pricing and
              service that anticipates what you need.
            </p>
            <Link to="/car-rental/about" className="light-btn">
              Discover Veyra <ArrowRight />
            </Link>
          </div>
          <div className="feature-stack">
            <Feature
              icon={<ShieldCheck />}
              title="Confidence included"
              text="Every vehicle is inspected before every journey."
            />
            <Feature
              icon={<Sparkles />}
              title="Immaculate, always"
              text="Professionally prepared and ready when you are."
            />
            <Feature
              icon={<Navigation />}
              title="Wherever you need"
              text="Convenient pickup across our growing city network."
            />
          </div>
        </section>
        <section className="section">
          <SectionTitle
            eyebrow="HOW IT WORKS"
            title="Three steps. Zero friction."
            center
          />
          <div className="steps">
            <Step
              n="01"
              title="Choose your car"
              text="Browse our collection and find the perfect match for your trip."
            />
            <Step
              n="02"
              title="Set your journey"
              text="Pick your dates, location and optional extras in seconds."
            />
            <Step
              n="03"
              title="Hit the road"
              text="Collect your car and enjoy the drive. It's that simple."
            />
          </div>
        </section>
        <section className="quote">
          <span className="eyebrow">WHAT OUR GUESTS SAY</span>
          <blockquote>
            “The easiest premium rental experience I've ever had. The car was
            immaculate and the whole process felt incredibly considered.”
          </blockquote>
          <div>
            <span className="avatar">AK</span>
            <b>Arjun Kapoor</b>
            <span> • Mumbai</span>
          </div>
        </section>
        <section className="cta">
          <div>
            <span className="eyebrow light">READY WHEN YOU ARE</span>
            <h2>
              Find your next
              <br />
              <i>great drive.</i>
            </h2>
          </div>
          <Link to="/car-rental/fleet" className="circle-btn">
            <ArrowUpRight />
          </Link>
        </section>
      </main>
    </Shell>
  );
}
function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="icon-box">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
function Step({ n, title, text }) {
  return (
    <div className="step">
      <span>{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Fleet() {
  const [favs, setFavs] = useLocalState("veyra-favorites", []);
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Featured");
  const filtered = useMemo(
    () =>
      cars
        .filter(
          (c) =>
            (type === "All" || c.type.includes(type)) &&
            c.name.toLowerCase().includes(q.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "Price: Low"
            ? a.price - b.price
            : sort === "Price: High"
              ? b.price - a.price
              : 0,
        ),
    [q, type, sort],
  );
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <span className="eyebrow">THE COLLECTION</span>
          <h1>
            Find your <i>perfect drive.</i>
          </h1>
          <p>
            A considered collection of premium vehicles for every kind of
            journey.
          </p>
        </section>
        <section className="fleet-section">
          <div className="toolbar">
            <div className="search-field">
              <Search size={18} />
              <input
                placeholder="Search vehicles..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="filters">
              <button
                className={type === "All" ? "selected" : ""}
                onClick={() => setType("All")}
              >
                All
              </button>
              {["Sedan", "SUV", "Sports"].map((x) => (
                <button
                  key={x}
                  className={type === x ? "selected" : ""}
                  onClick={() => setType(x)}
                >
                  {x}
                </button>
              ))}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Featured</option>
                <option>Price: Low</option>
                <option>Price: High</option>
              </select>
            </div>
          </div>
          <div className="results-head">
            <span>{filtered.length} vehicles available</span>
            <span>
              <SlidersHorizontal size={15} /> Refine your search
            </span>
          </div>
          <div className="car-grid">
            {filtered.map((c) => (
              <CarCard key={c.id} car={c} favs={favs} setFavs={setFavs} />
            ))}
          </div>
          {!filtered.length && (
            <div className="empty">
              <Search size={30} />
              <h3>No vehicles found</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </section>
      </main>
    </Shell>
  );
}
function Details() {
  const { id } = useParams();
  const car = cars.find((x) => x.id === Number(id)) || cars[0];
  const [extra, setExtra] = useState([]);
  const [days, setDays] = useState(3);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const total = car.price * days + extra.reduce((s, x) => s + x[1] * days, 0);
  return (
    <Shell>
      <main>
        <div className="detail">
          <Link to="/car-rental/fleet" className="back">
            <ChevronLeft /> Back to fleet
          </Link>
          <div className="detail-grid">
            <div>
              <div className="detail-image">
                <img src={car.image} alt={car.name} />
                <span className="tag">{car.tag}</span>
              </div>
              <div className="thumbs">
                <img src={car.image} />
                <img src={car.image} />
                <img src={car.image} />
              </div>
            </div>
            <div className="detail-copy">
              <span className="eyebrow">{car.type}</span>
              <h1>{car.name}</h1>
              <p className="detail-intro">
                A refined driving experience combining comfort, confidence and
                effortless performance.
              </p>
              <div className="detail-specs">
                <b>
                  <Users /> {car.seats} Seats
                </b>
                <b>
                  <Gauge /> {car.transmission}
                </b>
                <b>
                  <Fuel /> {car.fuel}
                </b>
                <b>
                  <Navigation /> {car.location}
                </b>
              </div>
              <hr />
              <div className="rental-options">
                <label>
                  Rental duration
                  <select
                    value={days}
                    onChange={(e) => setDays(+e.target.value)}
                  >
                    {[2, 3, 4, 5, 7, 14].map((x) => (
                      <option key={x} value={x}>
                        {x} days
                      </option>
                    ))}
                  </select>
                </label>
                <h3>Add extras</h3>
                {extras.map((x) => (
                  <button
                    key={x[0]}
                    className={extra.includes(x) ? "extra active" : "extra"}
                    onClick={() =>
                      setExtra(
                        extra.includes(x)
                          ? extra.filter((y) => y !== x)
                          : [...extra, x],
                      )
                    }
                  >
                    <span>
                      <span className="check">
                        {extra.includes(x) ? <Check size={14} /> : null}
                      </span>
                      <b>{x[0]}</b>
                      <small>{x[2]}</small>
                    </span>
                    <strong>+${x[1]}/day</strong>
                  </button>
                ))}
              </div>
              <div className="price-box">
                <div>
                  <span>Estimated total</span>
                  <b>${total}</b>
                </div>
                <small>
                  Includes vehicle rental and selected extras. Taxes calculated
                  at checkout.
                </small>
              </div>
              <button className="primary-btn" onClick={() => setOpen(true)}>
                Continue to booking <ArrowRight />
              </button>
            </div>
          </div>
        </div>
        {open && (
          <BookingModal
            car={car}
            total={total}
            onClose={() => setOpen(false)}
            onDone={() => navigate("/car-rental/confirmation")}
          />
        )}
      </main>
    </Shell>
  );
}
function BookingModal({ car, total, onClose, onDone }) {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="modal-wrap">
        <div className="modal success">
          <div className="success-icon">
            <Check />
          </div>
          <span className="eyebrow">REQUEST RECEIVED</span>
          <h2>Your drive is almost ready.</h2>
          <p>
            We've saved your reservation request for the {car.name}. This demo
            booking is stored locally on your device.
          </p>
          <button className="primary-btn" onClick={onDone}>
            View confirmation <ArrowRight />
          </button>
        </div>
      </div>
    );
  return (
    <div className="modal-wrap">
      <div className="modal">
        <button className="close" onClick={onClose}>
          <X />
        </button>
        <span className="eyebrow">RESERVATION</span>
        <h2>Complete your details.</h2>
        <p>
          Reserve the <b>{car.name}</b> for an effortless Veyra journey.
        </p>
        <div className="form-grid">
          <label>
            Full name
            <input placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Pickup date
            <input type="date" />
          </label>
          <label>
            Return date
            <input type="date" />
          </label>
        </div>
        <div className="modal-total">
          <span>Estimated total</span>
          <b>${total}</b>
        </div>
        <button className="primary-btn" onClick={() => setDone(true)}>
          Confirm reservation <ArrowRight />
        </button>
      </div>
    </div>
  );
}
function SimplePage({ kind }) {
  const data = {
    offers: [
      "PRIVATE OFFERS",
      "Make more of the journey.",
      "Thoughtful rates and extras for weekends, longer stays and business travel.",
    ],
    locations: [
      "OUR LOCATIONS",
      "Close to where life happens.",
      "Pick up your Veyra from convenient city locations designed around your schedule.",
    ],
    about: [
      "THE VEYRA STORY",
      "Premium mobility, without the ceremony.",
      "We believe renting a car should feel less like paperwork and more like the beginning of something good.",
    ],
    contact: [
      "GET IN TOUCH",
      "Let's plan your next drive.",
      "Questions about a vehicle, booking or a corporate partnership? Our team is here to help.",
    ],
  }[kind];
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <span className="eyebrow">{data[0]}</span>
          <h1>{data[1]}</h1>
          <p>{data[2]}</p>
        </section>
        {kind === "offers" ? (
          <Offers />
        ) : kind === "locations" ? (
          <Locations />
        ) : kind === "about" ? (
          <About />
        ) : (
          <Contact />
        )}
      </main>
    </Shell>
  );
}
function Offers() {
  return (
    <section className="section">
      <div className="offer-grid">
        <Offer
          title="Weekend Escape"
          text="Take 15% off 3-day rentals from Friday to Monday."
          code="WEEKEND15"
        />
        <Offer
          title="Longer, Better"
          text="Save up to 25% when your journey is 14 days or longer."
          code="LONGDRIVE"
        />
        <Offer
          title="Business Class"
          text="Priority pickup, flexible changes and premium vehicles for work trips."
          code="BUSINESS"
        />
      </div>
    </section>
  );
}
function Offer({ title, text, code }) {
  return (
    <article className="offer">
      <span className="eyebrow">LIMITED OFFER</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <div>
        <b>{code}</b>
        <Link to="/car-rental/fleet">
          Use offer <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
function Locations() {
  return (
    <section className="section">
      <div className="location-grid">
        {locations.map((x, i) => (
          <article className="location-card" key={x}>
            <div className="loc-num">0{i + 1}</div>
            <MapPin />
            <h3>{x}</h3>
            <p>
              Premium pickup lounge
              <br />
              Daily · 06:00 — 23:00
            </p>
            <Link to="/car-rental/fleet">
              Browse cars <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
function About() {
  return (
    <>
      <section className="about-image">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85" />
      </section>
      <section className="section about-copy">
        <div>
          <span className="eyebrow">OUR PHILOSOPHY</span>
          <h2>Beautiful cars. Thoughtful service. Nothing unnecessary.</h2>
        </div>
        <div>
          <p>
            Veyra was created for people who care about how they move through
            the world. Our collection brings together distinctive vehicles,
            transparent rental and a service experience that respects your time.
          </p>
          <p>
            Whether you're landing for a meeting, leaving for the coast or
            simply want something special for the weekend, we make the road feel
            a little better.
          </p>
        </div>
      </section>
    </>
  );
}
function Contact() {
  return (
    <section className="section contact-layout">
      <div className="contact-info">
        <h2>We'd love to hear from you.</h2>
        <p>
          Our team is available every day to help with reservations and vehicle
          questions.
        </p>
        <div>
          <Phone /> +91 1800 123 4567
        </div>
        <div>
          <span className="icon-mail">@</span> hello@veyra.rent
        </div>
        <div>
          <MapPin /> Mumbai · Delhi · Bengaluru
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks — your message has been received.");
        }}
      >
        <label>
          Name
          <input required placeholder="Your name" />
        </label>
        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>
        <label>
          How can we help?
          <textarea
            required
            rows="5"
            placeholder="Tell us what you need..."
          ></textarea>
        </label>
        <button className="primary-btn">
          Send message <ArrowRight />
        </button>
      </form>
    </section>
  );
}
function Confirmation() {
  return (
    <Shell>
      <main className="confirm-page">
        <div className="success-icon">
          <Check />
        </div>
        <span className="eyebrow">VEYRA RESERVATION</span>
        <h1>
          You're ready
          <br />
          <i>for the road.</i>
        </h1>
        <p>
          Your reservation request has been saved locally. This portfolio demo
          does not process real payments or bookings.
        </p>
        <Link to="/car-rental/fleet" className="primary-btn">
          Browse more cars <ArrowRight />
        </Link>
      </main>
    </Shell>
  );
}
function CarRental() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/cars/:id" element={<Details />} />
        <Route path="/offers" element={<SimplePage kind="offers" />} />
        <Route path="/locations" element={<SimplePage kind="locations" />} />
        <Route path="/about" element={<SimplePage kind="about" />} />
        <Route path="/contact" element={<SimplePage kind="contact" />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </AnimatePresence>
  );
}
export default CarRental;
