// http://localhost:5173/
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Shield, ChevronRight } from "lucide-react";
import solakairLogo from "./solakair_logo.png";

function DroneModel() {
  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.28}>
      <group rotation={[0.12, -0.6, 0]} position={[0, -0.1, 0]}>
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
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl">
      <Canvas camera={{ position: [4.6, 2.4, 5.6], fov: 38 }} shadows>
        <Suspense fallback={null}>
          <color attach="background" args={["#050816"]} />
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
          <OrbitControls enablePan={false} minDistance={4.5} maxDistance={8.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-white/70">{text}</p>
    </div>
  );
}

const team = [
  {
    name: "Ava Morgan",
    role: "Chief Executive Officer",
    bio: "Leads company strategy, partnerships, and mission delivery.",
  },
  {
    name: "Daniel Chen",
    role: "Head of Systems Engineering",
    bio: "Oversees airframe integration, testing, and platform reliability.",
  },
  {
    name: "Maya Patel",
    role: "Director of Operations",
    bio: "Coordinates deployment readiness, client support, and execution.",
  },
];

export default function App() {
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
              <p className="text-lg font-semibold tracking-[0.2em]">SOLAKAIR</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Advanced Aerial Systems</p>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm text-white/75 md:flex">
            <a href="#product" className="transition hover:text-white">Product</a>
            <a href="#team" className="transition hover:text-white">Team</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75">
              <Shield className="h-4 w-4" />
              Built for controlled mission environments
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Secure aerial capability, presented with restraint.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Solakair develops next-generation drone platforms for specialized operations. This local demo site highlights the company, team, and contact details while intentionally limiting sensitive product information.
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
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Contact Team
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl"
          >
            <ModelViewer />
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
              <span>Interactive 3D drone model</span>
              <span>Click + drag to rotate</span>
            </div>
          </motion.div>
        </section>

        <section id="product" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <SectionTitle
              eyebrow="Flagship Platform"
              title="A mission-ready product page without exposing sensitive specifications."
              text="This section is intentionally concise. It gives visitors a high-level understanding of the platform while avoiding detailed technical, performance, or operational disclosures."
            />

            <div className="grid gap-4">
              {[
                "Modular airframe architecture",
                "Operator-focused deployment workflow",
                "Designed for reliability and maintainability",
                "Secure integration path for authorized clients",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-base font-medium text-white">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    High-level messaging only, suitable for public-facing viewing.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
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
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-white/70">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <SectionTitle
              eyebrow="Contact"
              title="Connect with Solakair"
              text="Use this section for general business inquiries, partnerships, and authorized product discussions. Replace the placeholder details with your real company information later."
            />

            <div className="grid gap-4">
              {[
                { icon: Mail, label: "Email", value: "contact@solakair.local" },
                { icon: Phone, label: "Phone", value: "+1 (555) 010-2048" },
                { icon: MapPin, label: "Location", value: "Sunnyvale, California" },
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
    </div>
  );
}
