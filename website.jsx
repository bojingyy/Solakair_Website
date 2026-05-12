import { Suspense, useEffect, useRef, useState } from "react";
// 3D viewer temporarily disabled — keep imports commented for future re-enable
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
//icons
import { Mail, MapPin, Radar, Target, Menu, X } from "lucide-react";
//crosshair icon for product description card (Engage)
import { PiCrosshairBold } from "react-icons/pi";
//airplane icon for product description card (Identify)
import { BsAirplaneEngines } from "react-icons/bs";
import solakairLogo from "./images/solakair_logo.png";

//homepage title background image
import heroBackground from "./images/solace_title_background.png";

//team member images
import teamImageAndrew from "./team_images/Andrew.png";
import teamImageYalin from "./team_images/Yalin.png";
import teamImageMilo from "./team_images/Milo.png";
import teamImageBojing from "./team_images/Bojing.jpg";
import teamImageJoyce from "./team_images/Joyce.jpg";
import teamImageVishesh from "./team_images/Vishesh.jpeg";

//homepage drone image (will be replaced by interactive 3D model in the future))
import homepageDroneImage from "./images/homepage_silver.png";

//investor page drone image (top-view)
import topviewDroneImage from "./images/investor_silver.png";
//partners page image
import partnerImage from "./images/partner_silver.png";
//homepage product ground control image
import controlImage from "./images/controll_image.png";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjb5P-ZJ-dt8f9pNTUsydP3cVeVhNJ_I7q2SvXqOgzF0-wo1yYQWtwwyFepN-54Ldg/exec";
const API_SECRET = "200205241582";

async function postToAppsScript(payload) {
  try {
    const formData = new URLSearchParams({ ...payload, secret: API_SECRET });
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    // no-cors responses are opaque; treat completion as success
    return { ok: true };
  } catch (err) {
    return { error: "network_error", detail: String(err) };
  }
}

/* Interactive 3D model temporarily commented out.
   Keep the code below for future re-enable.

function DroneModel() {
  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.28}>
      <group rotation={[0.12, -0.6, 0]} position={[0, -0.1, 0]} scale={1.14}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.24, 1.9, 24]} />
          <meshStandardMaterial color="#d8dee8" metalness={0.45} roughness={0.28} />
        </mesh>

        <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.17, 0.45, 20]} />
          <meshStandardMaterial color="#f5f7fb" metalness={0.28} roughness={0.2} />
        </mesh>

        <mesh position={[0, -0.05, -0.1]} castShadow>
          <boxGeometry args={[2.9, 0.08, 0.18]} />
          <meshStandardMaterial color="#232c39" metalness={0.4} roughness={0.36} />
        </mesh>

        <mesh position={[0, 0.05, 0.15]} castShadow>
          <boxGeometry args={[0.55, 0.18, 0.55]} />
          <meshStandardMaterial color="#334155" metalness={0.35} roughness={0.5} />
        </mesh>

        <mesh position={[0, -0.23, -0.02]} castShadow>
          <boxGeometry args={[0.12, 0.36, 0.12]} />
          <meshStandardMaterial color="#4b5563" metalness={0.3} roughness={0.55} />
        </mesh>

        {[
          [-1.28, 0.02, -0.08],
          [1.28, 0.02, -0.08],
          [0, 0.02, 1.02],
        ].map((position, index) => (
          <group key={index} position={position}>
            <mesh castShadow position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.38} roughness={0.32} />
            </mesh>
            <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.24, 0.028, 10, 28]} />
              <meshStandardMaterial color="#111827" metalness={0.08} roughness={0.7} />
            </mesh>
          </group>
        ))}

        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, -0.48, -0.1]} rotation={[0.12, 0, x * 0.4]} castShadow>
            <capsuleGeometry args={[0.028, 0.56, 4, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.28} roughness={0.46} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ModelViewer() {
  return (
    <div className="h-[420px] w-full overflow-hidden bg-transparent">
      <Canvas camera={{ position: [4.1, 2.15, 5], fov: 36 }} shadows gl={{ alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={["#050816", 6, 12]} />
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[4, 5, 3]}
            intensity={2.3}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight position={[-3, 4, 5]} intensity={1.1} angle={0.5} penumbra={0.8} color="#7dd3fc" />
          <pointLight position={[0, 1.5, 1.5]} intensity={0.6} color="#93c5fd" />
          <Environment preset="sunset" />
          <DroneModel />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
            <circleGeometry args={[8, 64]} />
            <shadowMaterial opacity={0.25} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.14, 0]}>
            <circleGeometry args={[3.4, 64]} />
            <meshBasicMaterial color="#1e293b" transparent opacity={0.22} />
          </mesh>
          <OrbitControls enablePan={false} minDistance={4} maxDistance={8} />
        </Suspense>
      </Canvas>
    </div>
  );
}

*/

function SectionTitle({ eyebrow, title, text, titleClassName = "", className = "max-w-2xl" }) {
  return (
    <div className={className}>
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60">{eyebrow}</p>
      <h2 className={`text-4xl font-semibold tracking-tight text-white md:text-5xl ${titleClassName}`.trim()}>{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-white/70">{text}</p> : null}
    </div>
  );
}

const team = [
  {
    name: "Yalin Solak",
    role: "Founder and CEO",
    bio: "Redefining counter-drone technology by directing the development of autonomous fixed-wing UAS.",
    image: teamImageYalin,
  },
  {
    name: "Vishesh Brahmbhatt",
    role: "Autonomous Systems Engineer",
    bio: "Builds high-precision autonomous UAS systems using real-time vision and sensor fusion.",
    image: teamImageVishesh,
  },
  {
    name: "Joyce Berdkan",
    role: "Systems Engineer",
    bio: "Develops reliable embedded and control systems for real-time UAS performance.",
    image: teamImageJoyce,
  },
  {
    name: "Andrew Lao",
    role: "Software Engineer",
    bio: "Develops the real-time flight monitoring ground control software to achieve mission success.",
    image: teamImageAndrew,
  },
  {
    name: "Bojing Yu",
    role: "Software Engineer",
    bio: "Builds scalable full-stack platforms and APIs for data-driven applications.",
    image: teamImageBojing,
  },
  {
    name: "Milo Richard",
    role: "Mechanical Engineer",
    bio: "Engineers the hardware that makes a fixed-wing aircraft take off and land like a helicopter.",
    image: teamImageMilo,
  },
];

const validPages = new Set(["home", "investors", "partners", "tactical-sim"]);

function getCurrentRoute() {
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("page");
  const page = validPages.has(requestedPage) ? requestedPage : "home";
  const section = page === "home" ? window.location.hash.replace("#", "") : "";

  return { page, section };
}

function HomePage() {
  const [productView, setProductView] = useState("model");

  return (
    <main className="relative">
      <section className="hero-section relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="hero-sky absolute inset-0"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
        </div>
        <div className="hero-content mx-auto flex max-w-7xl flex-col justify-center px-6 py-16 lg:h-full lg:px-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <h1 className="hero-title text-6xl font-semibold tracking-tight text-white md:text-7xl">
              Achieve 
              <br />
              Drone
              <br />
              Air Superiority​
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-xl font-semibold leading-8 text-white md:text-2xl">
              Neutralize hostile drones and UAS
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-5 py-3 font-medium text-slate-950 shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition hover:scale-[1.02]"
              >
                View Product
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-5 py-3 font-medium text-slate-950 shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition hover:scale-[1.02]"
              >
                Contact Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="product" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_1.1fr] lg:items-center lg:gap-6 lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Flagship Platform"
              title={
                <>
                  <span className="text-9xl md:text-[10rem]">Solace</span>
                  <br />
                  <span className="whitespace-nowrap text-2xl md:text-3xl font-normal block mt-3">Air Superiority Drone (ASD)</span>
                  <span className="text-base md:text-lg font-normal block mt-4 leading-7 text-white/60">Reusable VTOL drones with 150 km coverage for air defense, strike, ISR, and contested-environment operations including force protection, target acquisition, overwatch, and communications relay. AI-enabled and networked for scalable air superiority.</span>
                </>
              }
              text=""
            />

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: "Detect",
                  icon: Radar,
                  description:
                    "Scan the surrounding airspace to detect objects and maintain situational awareness.",
                },
                {
                  title: "Identify",
                  icon: BsAirplaneEngines,
                  description:
                    "Classify the detected object and confirm whether it is a drone or other potential threat.",
                },
                {
                  title: "Target",
                  icon: Target,
                  description:
                    "Track the object in real time and select the most effective response option.",
                },
                {
                  title: "Engage",
                  icon: PiCrosshairBold,
                  description:
                    "Deploy interceptors with precision to neutralize the target while minimizing collateral risk.",
                },
              ].map((item) => (
                <div key={item.title} className="product-step-card rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="grid grid-cols-[9rem_1fr] gap-x-0.3 items-center">
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
                      <p className="text-xl font-medium text-white md:text-2xl">{item.title}</p>
                    </div>
                    <p className="text-base leading-7 text-white/60 md:text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="product-frame relative self-center overflow-hidden bg-slate-900/70 p-1 shadow-2xl lg:translate-y-12 lg:p-1"
          >
            <div className="product-frame-overlay pointer-events-none absolute inset-0" />
            <div className="relative z-10 overflow-hidden border border-white/10 bg-white/5">
              <div className="flex items-center justify-center border-b border-white/10 bg-black/35 px-3 py-3 sm:px-4">
                <div className="inline-flex rounded-xl border border-white/15 bg-slate-900/80 p-1">
                  <button
                    type="button"
                    onClick={() => setProductView("model")}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      productView === "model"
                        ? "bg-white text-slate-900"
                        : "text-white/70 hover:bg-white/10"
                    }`}
                    aria-pressed={productView === "model"}
                  >
                    Fixed-Wing Model
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductView("terminal")}
                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                      productView === "terminal"
                        ? "bg-white text-slate-900"
                        : "text-white/70 hover:bg-white/10"
                    }`}
                    aria-pressed={productView === "terminal"}
                  >
                    Ground Control
                  </button>
                </div>
              </div>

              {productView === "model" ? (
                <div className="flex h-[380px] w-full items-center justify-center bg-slate-950/80 p-2">
                  <img
                    src={homepageDroneImage}
                    alt="Drone static preview"
                    className="h-full w-full scale-[1.03] object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-[380px] w-full items-center justify-center bg-slate-950/80 p-2">
                  <img
                    src={controlImage}
                    alt="Product terminal window"
                    className="h-full w-full scale-[1.03] object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                <span>{productView === "model" ? "Drone Model" : "Product In Use"}</span>
                <span>{productView === "model" ? "Static preview" : "Control panel preview"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="team"
        className="relative isolate overflow-hidden bg-white/[0.03]"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionTitle
            eyebrow="Leadership"
            title="Meet the team"
            titleClassName="text-5xl md:text-6xl"
            text="A focused team page helps present credibility without oversharing internal program details."
            className="max-w-4xl"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="team-member-card rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-4 text-center shadow-xl"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto mb-5 h-64 w-64 rounded-2xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <h3 className="mt-2 text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-white/50">{member.role}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <SectionTitle
            eyebrow="Contact"
            title="Connect with Solakair"
            text="Are you interested in our Counter Drone Solution? Or have questions?"
          />

          <div className="grid gap-4">
            {[
              { label: "Email", value: "alex@solakair.com", icon: Mail },
              { label: "Location", value: "Fremont, California, USA", icon: MapPin },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">{label}</p>
                  <p className="mt-2 text-base text-white/85">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InvestorsPage() {
  const [investorEmail, setInvestorEmail] = useState("");
  const [invLoading, setInvLoading] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  async function handleAddInvestor() {
    if (!investorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(investorEmail)) {
      alert("Please enter a valid email.");
      return;
    }
    setInvLoading(true);
    await postToAppsScript({ action: "investor", email: investorEmail });
    setInvLoading(false);
    setInvestorEmail("");
    alert("You've been added to the investor list!");
  }

  async function handleSendMessage() {
    if (!senderEmail || !message) {
      alert("Please provide sender email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      alert("Please enter a valid sender email.");
      return;
    }
    setMsgLoading(true);
    await postToAppsScript({ action: "contact", senderEmail, message });
    setMsgLoading(false);
    setSenderEmail("");
    setMessage("");
    alert("Your message has been sent!");
  }

  return (
    <main className="relative">
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-6 pb-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:pt-8">
          <div>
            <SectionTitle
              eyebrow="Investors"
              title="Invest in Solakair"
              text="We may seek seed investment. Get investor updates from Solakair.  Add your email to the investor list."
            />

            <div className="mt-8">
              <form className="flex flex-col items-start gap-3">
                <label className="text-sm uppercase tracking-[0.12em] text-white/60">Add email to investor list</label>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    name="investorEmail"
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="min-w-[220px] rounded-lg bg-slate-800 border border-white/20 px-4 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddInvestor}
                    disabled={invLoading}
                    className="rounded-lg bg-white px-4 py-2 text-slate-900 disabled:opacity-60"
                  >
                    {invLoading ? "Adding..." : "Add Email"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="mb-4 text-lg font-semibold">Send message to Solakair</p>
              <div className="grid gap-3">
                <div>
                  <label className="block text-sm text-white/60">Sender Email</label>
                  <input
                    type="text"
                    name="senderEmail"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    maxLength={40}
                    placeholder="your@email.com"
                    tabIndex={0}
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60">Send message to alex@solakair.com</label>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    rows={6}
                    placeholder="Your message..."
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={msgLoading}
                    className="rounded-lg bg-white px-4 py-2 text-slate-900 disabled:opacity-60"
                  >
                    {msgLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="inline-block rounded-[1.1rem] border border-white/70 p-[1.5px]">
              <img
                src={topviewDroneImage}
                alt="Investor drone"
                className="block h-auto max-h-[460px] w-auto max-w-full rounded-[1rem] border border-white/10 bg-slate-950/80 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PartnersPage() {
  const [partnerEmail, setPartnerEmail] = useState("");
  const [pInvLoading, setPInvLoading] = useState(false);
  const [pSenderEmail, setPSenderEmail] = useState("");
  const [pMessage, setPMessage] = useState("");
  const [pMsgLoading, setPMsgLoading] = useState(false);

  async function handleAddPartner() {
    if (!partnerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerEmail)) {
      alert("Please enter a valid email.");
      return;
    }
    setPInvLoading(true);
    await postToAppsScript({ action: "partner", email: partnerEmail });
    setPInvLoading(false);
    setPartnerEmail("");
    alert("You've been added to the partner list!");
  }

  async function handleSendPartnership() {
    if (!pSenderEmail || !pMessage) {
      alert("Please provide sender email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pSenderEmail)) {
      alert("Please enter a valid sender email.");
      return;
    }
    setPMsgLoading(true);
    await postToAppsScript({ action: "contact", senderEmail: pSenderEmail, message: pMessage });
    setPMsgLoading(false);
    setPSenderEmail("");
    setPMessage("");
    alert("Your message has been sent!");
  }

  return (
    <main className="relative">
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-6 pb-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:pt-8">
          <div>
            <SectionTitle
              eyebrow="Partners"
              title="Partner with Solakair"
              text="We seek partnerships with U.S. and allied defense companies. If you develop quad-copters, micro-missies, air-born radars, RF communication? Anything that can integrate with a drone-mothership, we want to hear from you. "
            />

            <div className="mt-8">
              <form className="flex flex-col items-start gap-3">
                <label className="text-sm uppercase tracking-[0.12em] text-white/60">Add email to partner list</label>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    name="partnerEmail"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="company-contact@example.com"
                    className="min-w-[220px] rounded-lg bg-slate-800 border border-white/20 px-4 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPartner}
                    disabled={pInvLoading}
                    className="rounded-lg bg-white px-4 py-2 text-slate-900 disabled:opacity-60"
                  >
                    {pInvLoading ? "Adding..." : "Add Email"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="mb-4 text-lg font-semibold">Send partnership inquiry</p>
              <div className="grid gap-3">
                <div>
                  <label className="block text-sm text-white/60">Sender Email</label>
                  <input
                    type="text"
                    name="senderEmail"
                    value={pSenderEmail}
                    onChange={(e) => setPSenderEmail(e.target.value)}
                    maxLength={40}
                    placeholder="your@company.com"
                    tabIndex={0}
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60">Send message to alex@solakair.com</label>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={pMessage}
                    onChange={(e) => setPMessage(e.target.value)}
                    maxLength={500}
                    rows={6}
                    placeholder="Describe your capabilities and interest..."
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSendPartnership}
                    disabled={pMsgLoading}
                    className="rounded-lg bg-white px-4 py-2 text-slate-900 disabled:opacity-60"
                  >
                    {pMsgLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="inline-block rounded-[1.1rem] border border-white/70 p-[1.5px]">
              <img
                src={partnerImage}
                alt="Partner drone"
                className="block h-auto max-h-[460px] w-auto max-w-full rounded-[1rem] border border-white/10 bg-slate-950/80 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TacticalSimPage() {
  return (
    <main className="relative">
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-8 lg:px-8 lg:pt-8">
          <SectionTitle
            eyebrow="Interactive Solace tactical map simulation."
            title="Tactical Sim"
            text=""
          />

          <div className="mt-8 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl">
            <iframe
              src={`${import.meta.env.BASE_URL}SO-14-tactical-map_v2.html`}
              title="Tactical Map"
              className="block h-[60vh] min-h-[420px] w-full rounded-2xl border border-white/10 bg-slate-950 md:h-[70vh]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function BlankPage() {
  return <main className="relative min-h-[70vh]" />;
}

export default function App() {
  const [route, setRoute] = useState(() => getCurrentRoute());
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState(route.section || "");
  const homeMenuRef = useRef(null);
  const closeMenuTimerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function syncRoute() {
      const nextRoute = getCurrentRoute();
      setRoute(nextRoute);
      setPendingSection(nextRoute.section || "");
      setIsHomeMenuOpen(false);
    }

    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(event) {
      if (homeMenuRef.current && !homeMenuRef.current.contains(event.target)) {
        setIsHomeMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    function handleMobileOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMobileOutside);
    return () => document.removeEventListener("mousedown", handleMobileOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (closeMenuTimerRef.current) {
        window.clearTimeout(closeMenuTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (route.page !== "home" || !pendingSection) {
      return;
    }

    const section = document.getElementById(pendingSection);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingSection("");
    }
  }, [route.page, pendingSection]);

  function updateRoute(page, section = "") {
    const url = new URL(window.location.href);

    if (page === "home") {
      url.searchParams.delete("page");
      url.hash = section ? `#${section}` : "";
    } else {
      url.searchParams.set("page", page);
      url.hash = "";
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setRoute({ page, section: page === "home" ? section : "" });
    setPendingSection(page === "home" ? section : "");
  }

  function navigateToPage(page) {
    updateRoute(page);
    setIsHomeMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateToSection(section) {
    updateRoute("home", section);
    setIsHomeMenuOpen(false);
  }

  function openHomeMenu() {
    if (closeMenuTimerRef.current) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }

    setIsHomeMenuOpen(true);
  }

  function closeHomeMenu() {
    if (closeMenuTimerRef.current) {
      window.clearTimeout(closeMenuTimerRef.current);
    }

    closeMenuTimerRef.current = window.setTimeout(() => {
      setIsHomeMenuOpen(false);
      closeMenuTimerRef.current = null;
    }, 180);
  }

  const homeActive = route.page === "home" && (!route.section || route.section === "");
  const productActive = route.page === "home" && route.section === "product";
  const teamActive = route.page === "home" && route.section === "team";
  const contactActive = route.page === "home" && route.section === "contact";
  const navItemClass = "rounded-full px-4 py-2 transition";
  const activeNavItemClass = "bg-white text-slate-950";
  const inactiveNavItemClass = "text-white/75 hover:bg-white/10 hover:text-white";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={solakairLogo} alt="Solakair logo" className="h-16 w-16 object-contain" />
            <div>
              <p className="text-4xl font-semibold tracking-[0.1em]">Solakair</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm lg:gap-3 lg:text-base">
            {/* Desktop nav (hidden on small screens) */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center rounded-full border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={() => navigateToPage("home")}
                  className={`${navItemClass} ${homeActive ? activeNavItemClass : inactiveNavItemClass}`}
                >
                  Home
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigateToSection("product")}
                className={`${navItemClass} ${productActive ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => navigateToPage("tactical-sim")}
                className={`${navItemClass} ${route.page === "tactical-sim" ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Tactical Sim
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("team")}
                className={`${navItemClass} ${teamActive ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Team
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("contact")}
                className={`${navItemClass} ${contactActive ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Contact
              </button>

              <button
                type="button"
                onClick={() => navigateToPage("investors")}
                className={`${navItemClass} ${route.page === "investors" ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Investors
              </button>
              <button
                type="button"
                onClick={() => navigateToPage("partners")}
                className={`${navItemClass} ${route.page === "partners" ? activeNavItemClass : inactiveNavItemClass}`}
              >
                Partners
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden relative">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="rounded-full p-2 border border-white/10 bg-white/5 text-white/90"
                aria-expanded={mobileMenuOpen}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {mobileMenuOpen && (
                <div ref={mobileMenuRef} className="absolute right-0 mt-2 w-56 rounded-lg bg-slate-950/95 border border-white/10 shadow-lg p-2 z-50">
                  <button
                    type="button"
                    onClick={() => { navigateToPage("home"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${homeActive ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToSection("product"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${productActive ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Product
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToPage("tactical-sim"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${route.page === "tactical-sim" ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Tactical Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToSection("team"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${teamActive ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Team
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToSection("contact"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${contactActive ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Contact
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToPage("investors"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${route.page === "investors" ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Investors
                  </button>
                  <button
                    type="button"
                    onClick={() => { navigateToPage("partners"); setMobileMenuOpen(false); }}
                    className={`w-full text-left rounded px-3 py-2 ${route.page === "partners" ? activeNavItemClass : 'text-white/80 hover:bg-white/5'}`}
                  >
                    Partners
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div className="pt-24 md:pt-28">
        {route.page === "home" ? (
          <HomePage />
        ) : route.page === "investors" ? (
          <InvestorsPage />
        ) : route.page === "partners" ? (
          <PartnersPage />
        ) : route.page === "tactical-sim" ? (
          <TacticalSimPage />
        ) : (
          <BlankPage />
        )}
      </div>
    </div>
  );
}
