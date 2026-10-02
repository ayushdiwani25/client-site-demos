import { useState } from "react";
import { Check, Phone } from "lucide-react";
import { WHATSAPP, shootPackages, addOns } from "../data";

const inner = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

// Interactive Shoot Planner & WhatsApp Instant Quote Estimator
export default function ShootPlannerAndBooking() {
  const [selectedPackage, setSelectedPackage] = useState(shootPackages[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [clientName, setClientName] = useState("");
  const [preferredMonth, setPreferredMonth] = useState("Next Month");
  const [locationPreference, setLocationPreference] = useState(
    "Gujarat (Ahmedabad/Baroda/Kutch)",
  );
  const [notes, setNotes] = useState("");

  // Calculate live estimate in INR
  const basePriceNum = parseInt(
    selectedPackage.price.replace(/[^\d]/g, ""),
    10,
  );
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const item = addOns.find((a) => a.id === addonId);
    return acc + (item ? parseInt(item.price.replace(/[^\d]/g, ""), 10) : 0);
  }, 0);
  const totalEstimate = basePriceNum + addonsTotal;

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((x) => x !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const addonNames = selectedAddons
      .map((id) => addOns.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const message = `Hello Ayush! I would like to book a shoot with you.
• Name: ${clientName || "Inquirer"}
• Package: ${selectedPackage.name} (${selectedPackage.price})
• Preferred Location: ${locationPreference}
• Timeline: ${preferredMonth}
${addonNames ? `• Add-ons Selected: ${addonNames}\n` : ""}• Total Estimated Investment: ₹${totalEstimate.toLocaleString()}
${notes ? `• Brief/Notes: ${notes}\n` : ""}
Could you please confirm your calendar availability?`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <section
      id="pricing"
      className="bg-charcoal py-24 text-silver border-t border-white/10"
    >
      <div className={inner}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
            Investment & Commission
          </p>
          <h2 className="mt-2 font-frame text-4xl sm:text-5xl font-black text-white">
            Curate Your Shoot Experience.
          </h2>
          <p className="mt-3 text-sm text-silver/70">
            Select a base tier and add optional analog celluloid film or drone
            aerials. Get a real-time instant estimate and connect directly on
            WhatsApp.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {shootPackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative rounded-2xl border p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-vermilion bg-obsidian shadow-xl shadow-vermilion/10 ring-2 ring-vermilion/50"
                    : "border-white/10 bg-card-dark hover:border-white/20"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-vermilion px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-obsidian shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-frame text-xl font-bold text-white">
                      {pkg.name}
                    </h3>
                    <span className="font-mono text-xs text-silver/50">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-frame text-3xl font-black text-vermilion">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-silver/50 font-mono">
                      / {pkg.usdPrice}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-silver/70 leading-relaxed">
                    {pkg.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-silver/80">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPackage(pkg);
                  }}
                  className={`mt-8 w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? "bg-vermilion text-obsidian shadow-md"
                      : "bg-white/10 text-silver hover:bg-white/15"
                  }`}
                >
                  {isSelected ? "✓ Selected Tier" : "Select Tier"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Shoot Builder Form */}
        <div
          id="book"
          className="mt-16 rounded-2xl border border-white/10 bg-obsidian p-6 sm:p-10 shadow-2xl"
        >
          <div className="border-b border-white/10 pb-6">
            <h3 className="font-frame text-2xl font-bold text-white">
              Customize & Confirm Details
            </h3>
            <p className="text-xs text-silver/60 mt-1">
              Review add-on celluloid options and formulate your WhatsApp
              inquiry.
            </p>
          </div>

          <form
            onSubmit={handleWhatsAppSend}
            className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Options */}
            <div className="lg:col-span-7 space-y-6">
              {/* Client Name */}
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-xs font-bold uppercase tracking-wider text-silver/90 mb-2"
                >
                  Your Full Name
                </label>
                <input
                  required
                  id="client-name"
                  name="clientName"
                  type="text"
                  placeholder="e.g. Priyanshi & Aarav"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-charcoal px-4 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none"
                />
              </div>

              {/* Location & Month */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="shoot-location"
                    className="block text-xs font-bold uppercase tracking-wider text-silver/90 mb-2"
                  >
                    Location
                  </label>
                  <select
                    id="shoot-location"
                    name="locationPreference"
                    aria-label="Shoot Location"
                    value={locationPreference}
                    onChange={(e) => setLocationPreference(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-charcoal px-3 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none cursor-pointer"
                  >
                    <option>Ahmedabad & Old City</option>
                    <option>Udaipur / Rajasthan Haveli</option>
                    <option>White Desert, Kutch</option>
                    <option>Mumbai / Goa</option>
                    <option>International Destination</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferred-month"
                    className="block text-xs font-bold uppercase tracking-wider text-silver/90 mb-2"
                  >
                    Ideal Date / Month
                  </label>
                  <input
                    id="preferred-month"
                    name="preferredMonth"
                    type="text"
                    placeholder="e.g. Mid November 2026"
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-charcoal px-4 py-2.5 text-sm text-silver focus:border-vermilion focus:outline-none"
                  />
                </div>
              </div>

              {/* Addons Checklist */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-silver/90 mb-3">
                  A La Carte Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        role="checkbox"
                        aria-checked={checked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleAddon(addon.id);
                          }
                        }}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer select-none transition-all focus:outline-none focus:ring-2 focus:ring-vermilion ${
                          checked
                            ? "border-vermilion bg-vermilion/10 text-white"
                            : "border-white/15 bg-charcoal text-silver/85 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? "border-vermilion bg-vermilion text-obsidian" : "border-white/30"}`}
                          >
                            {checked && <Check className="w-3 h-3 stroke-3" />}
                          </div>
                          <span className="text-xs font-medium">
                            {addon.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-vermilion">
                          {addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="shoot-notes"
                  className="block text-xs font-bold uppercase tracking-wider text-silver/90 mb-2"
                >
                  Special Vision / Wardrobe Details (Optional)
                </label>
                <textarea
                  id="shoot-notes"
                  name="notes"
                  rows={2}
                  placeholder="Tell me a bit about the occasion, vibe, or preferred timing..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-charcoal p-3 text-xs text-silver focus:border-vermilion focus:outline-none"
                />
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-vermilion/30 bg-charcoal/90 p-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-vermilion font-bold">
                  Live Estimate Summary
                </span>
                <h3 className="font-frame text-xl font-bold text-white mt-1">
                  {selectedPackage.name}
                </h3>
                <p className="text-xs text-silver/85 mt-1">
                  {selectedPackage.duration}
                </p>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between text-silver/70">
                    <span>Base Tier:</span>
                    <span className="font-mono text-white">
                      {selectedPackage.price}
                    </span>
                  </div>
                  {selectedAddons.map((id) => {
                    const item = addOns.find((a) => a.id === id);
                    return (
                      <div
                        key={id}
                        className="flex justify-between text-silver/70"
                      >
                        <span className="truncate pr-2">+ {item?.name}:</span>
                        <span className="font-mono text-vermilion">
                          {item?.price}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-white">
                    Estimated Investment:
                  </span>
                  <span className="font-frame text-2xl font-black text-vermilion">
                    ₹{totalEstimate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="submit"
                  className="btn-cta w-full rounded-xl bg-vermilion py-3.5 text-xs font-bold uppercase tracking-wider text-obsidian shadow-lg shadow-vermilion/30 hover:bg-vermilion-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Proposal via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-silver/50">
                  Direct encrypted line · Usually replies within 2–4 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
