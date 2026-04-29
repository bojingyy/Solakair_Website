// http://localhost:5173/
import { Suspense, useEffect, useRef, useState } from "react";
// 3D viewer temporarily disabled — keep imports commented for future re-enable
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Mail, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import solakairLogo from "./solakair_logo.png";
import heroBackground from "./solace_title_background.png";
import controlImage from "./controll_image.png";
import teamImageBojing from "./team_images/Bojing.jpg";
import teamImageJoyce from "./team_images/Joyce.jpg";
import teamImageVishesh from "./team_images/Vishesh.jpeg";
import droneImage1 from "./drone_image_1.png";
import droneImage2 from "./drone_image_2.png";

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

function SectionTitle({ eyebrow, title, text, titleClassName = "" }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60">{eyebrow}</p>
      <h2 className={`text-4xl font-semibold tracking-tight text-white md:text-5xl ${titleClassName}`.trim()}>{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-white/70">{text}</p> : null}
    </div>
  );
}

const team = [
  {
    name: "Bojing Yu",
    role: "Software Engineer",
    bio: "Leads company strategy, partnerships, and mission delivery.",
    image: teamImageBojing,
  },
  {
    name: "Joyce Berdkand",
    role: "Head of Systems Engineering",
    bio: "Oversees airframe integration, testing, and platform reliability.",
    image: teamImageJoyce,
  },
  {
    name: "Vishesh Brahmbhatt",
    role: "Director of Operations",
    bio: "Coordinates deployment readiness, client support, and execution.",
    image: teamImageVishesh,
  },
];

const validPages = new Set(["home", "investors", "partners"]);

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
            <h1 className="hero-title text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Achieve Drone Air Superiority​
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-xl font-semibold leading-8 text-white md:text-2xl">
              Neutralize hostile drones and UAS
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                View Product
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                Contact Team
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="product" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Flagship Platform"
              title={
                <>
                  Solace - 
                  <br />
                  <span className="whitespace-nowrap">Air Superiority Drone (ASD)</span>
                </>
              }
              text=""
            />

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: "Detect",
                  description:
                    "Scan the surrounding airspace to detect objects early and maintain situational awareness.",
                },
                {
                  title: "Identify",
                  description:
                    "Classify the detected object and confirm whether it is a drone or other potential threat.",
                },
                {
                  title: "Target",
                  description:
                    "Track the object in real time and select the most effective response option.",
                },
                {
                  title: "Engage",
                  description:
                    "Deploy interceptors with precision to neutralize the target while minimizing collateral risk.",
                },
              ].map((item) => (
                <div key={item.title} className="product-step-card rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-xl font-medium text-white md:text-2xl">{item.title}</p>
                  <p className="mt-2 text-base leading-7 text-white/60 md:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="product-frame relative self-center overflow-hidden bg-slate-900/70 p-3 shadow-2xl lg:translate-y-12 lg:p-4"
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
                    Ground Picture
                  </button>
                </div>
              </div>

              {productView === "model" ? (
                <div className="flex h-[420px] w-full items-center justify-center bg-slate-950/80 p-2">
                  <img
                    src={droneImage1}
                    alt="Drone static preview"
                    className="h-full w-full scale-[1.03] object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center bg-slate-950/80 p-2">
                  <img
                    src={controlImage}
                    alt="Product terminal window"
                    className="h-full w-full scale-[1.03] object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                <span>{productView === "model" ? "Drone image (static preview)" : "Product terminal window"}</span>
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
            text="A focused team page helps present credibility without oversharing internal program details."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="team-member-card rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center shadow-xl"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto mb-5 h-36 w-36 rounded-2xl border border-white/10 object-cover"
                  />
                ) : (
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-white/70">{member.bio}</p>
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
              { icon: Mail, label: "Email", value: "alex@solakair.com" },
              { icon: MapPin, label: "Location", value: "Fremont, California, USA" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Icon className="h-5 w-5" />
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
  return (
    <main className="relative">
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Investors"
              title="Invest in Solakair"
              text="Get investor updates from Solakair. Add your email to the investor list."
            />

            <div className="mt-8">
              <form className="flex flex-col items-start gap-3">
                <label className="text-sm uppercase tracking-[0.12em] text-white/60">Add email to investor list</label>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    name="investorEmail"
                    placeholder="you@example.com"
                    className="min-w-[220px] rounded-lg bg-slate-800 border border-white/20 px-4 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="button" className="rounded-lg bg-white px-4 py-2 text-slate-900">Add Email</button>
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
                    maxLength={500}
                    rows={6}
                    placeholder="Your message..."
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <button type="button" className="rounded-lg bg-white px-4 py-2 text-slate-900">Send</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={droneImage1}
              alt="Investor drone"
              className="h-80 w-full rounded-2xl border border-white/10 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function PartnersPage() {
  return (
    <main className="relative">
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Partners"
              title="Partner with Solakair"
              text="We seek partnerships with U.S. and allied defense companies."
            />

            <div className="mt-8">
              <form className="flex flex-col items-start gap-3">
                <label className="text-sm uppercase tracking-[0.12em] text-white/60">Add email to partner list</label>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    name="partnerEmail"
                    placeholder="company-contact@example.com"
                    className="min-w-[220px] rounded-lg bg-slate-800 border border-white/20 px-4 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="button" className="rounded-lg bg-white px-4 py-2 text-slate-900">Add Email</button>
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
                    maxLength={500}
                    rows={6}
                    placeholder="Describe your capabilities and interest..."
                    className="mt-2 w-full rounded-md bg-slate-800 border border-white/20 px-3 py-2 text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <button type="button" className="rounded-lg bg-white px-4 py-2 text-slate-900">Send</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={droneImage2}
              alt="Partner drone"
              className="h-80 w-full rounded-2xl border border-white/10 object-cover"
              loading="lazy"
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

  const homeActive = route.page === "home";
  const productActive = route.page === "home" && route.section === "product";
  const teamActive = route.page === "home" && route.section === "team";
  const contactActive = route.page === "home" && route.section === "contact";
  const navItemClass = "rounded-full px-4 py-2 transition";
  const activeNavItemClass = "bg-white text-slate-950";
  const inactiveNavItemClass = "text-white/75 hover:bg-white/10 hover:text-white";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={solakairLogo} alt="Solakair logo" className="h-16 w-16 object-contain" />
            <div>
              <p className="text-4xl font-semibold tracking-[0.1em]">Solakair</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm md:gap-3 md:text-base">
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
          </nav>
        </div>
      </header>

      {route.page === "home" ? (
        <HomePage />
      ) : route.page === "investors" ? (
        <InvestorsPage />
      ) : route.page === "partners" ? (
        <PartnersPage />
      ) : (
        <BlankPage />
      )}
    </div>
  );
}
