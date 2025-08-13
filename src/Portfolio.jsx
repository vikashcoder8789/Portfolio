import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file React portfolio component (Tailwind CSS required in host project)
// Usage: drop this file into a React app (Vite, Create React App).
// Dependencies: framer-motion. No extra packages required.

const projects = [
  {
    title: "Fake Job Post Detection",
    desc: "Built an ML model to detect fraudulent job postings. Tuned features and pipeline; reached 92% accuracy.",
    tags: ["ML Classification", "Python", "Scikit-learn"],
    link: "https://github.com/vikashcoder8789/JobShield-Intelligent-Fraudulent-Job-Listing-Detector"
  },
  {
    title: "Distracted Driver Detection",
    desc: "CNN-based classifier for 10 driver-behavior classes using transfer learning (ResNet50). F1: 0.87.",
    tags: ["Computer Vision", "TensorFlow", "CNN"],
    link: "https://www.kaggle.com/code/crazycoder8789/distracted-driver-detection"
  },
  {
    title: "Twitter Sentiment Analysis",
    desc: "Real-time sentiment classification with TF-IDF + Logistic Regression, deployed with Streamlit.",
    tags: ["NLP", "Logistic Regression", "NLTK"],
    link: "#"
  }
];

const skills = [
  { name: "Python", level: 92 },
  { name: "TensorFlow / Keras", level: 84 },
  { name: "NLP", level: 80 },
  { name: "Convolutional Neural Network", level: 86 },
  { name: "SQL / MySQL", level: 75 },
  { name: "Tableau", level: 75 }
];

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const sectionsRef = useRef({});

  useEffect(() => {
    // Scroll hide/show nav
    const onScroll = () => {
      const current = window.scrollY;
      setNavVisible(current < lastScrollY.current || current < 80);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver to set active link
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Floating Navbar */}
      <motion.header
        animate={{ y: navVisible ? 0 : -80, opacity: navVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">VK</div>
            <div>
              <div className="text-sm font-medium">Vikash Kumar</div>
              <div className="text-xs text-slate-600">Data Science & AI</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-slate-700">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["projects", "Projects"],
              ["skills", "Skills"],
              ["contact", "Contact"]
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-2 py-1 rounded-md hover:text-slate-900 ${active === id ? 'text-indigo-600 font-semibold' : ''}`}
              >
                {label}
                {active === id && <motion.span layoutId="line" className="absolute -bottom-3 left-0 right-0 h-1 bg-indigo-600 rounded-full" />}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/uc?export=download&id=1bz0E-1oyoDnhgfrqlmWJFlvGDvzCe3dN"
              target="_blank"
              className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:scale-105 transform-gpu transition"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <button className="md:hidden p-2 rounded-md bg-white/60 border" onClick={() => scrollTo('contact')}>Contact</button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-28">
        {/* Hero / Home */}
        <section id="home" className="grid md:grid-cols-2 gap-8 items-center mt-6">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Hi, I'm <span className="text-indigo-600">Vikash Kumar</span>.</h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 max-w-xl"
            >
              I build production-ready machine learning systems — from data pipelines to deep-learning models. I focus on applied research in computer vision and NLP to solve real-world problems.
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:shadow-md transition" href="#projects">View projects</a>
              <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:scale-105 transition" href="#contact">Contact me</a>
            </div>

            <div className="mt-6 flex gap-3 text-slate-500 text-sm">
              <div>📍 India</div>
              <div>•</div>
              <div>Open to opportunities</div>
            </div>
          </motion.div>

          <motion.div
            className="w-full flex justify-center"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-tr from-indigo-100 to-pink-50 flex items-center justify-center shadow-2xl overflow-hidden relative">
              {/* Subtle animated gradient ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.06), transparent)" }}
              />

              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" alt="profile" className="w-56 h-56 object-cover rounded-xl relative z-10" />
            </div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-semibold">About me</h3>
          <p className="mt-4 text-slate-600">I am passionate about solving real-world problems using data science and AI. My expertise includes Python, CNN, NLP, TensorFlow, Scikit-learn, Hyperparameter Tuning, MySQL, Tableau, OOP, Web Scraping, Data Visualization, and Deep Learning. I enjoy end-to-end ML system building and reproducible research.</p>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-10">
          <h3 className="text-2xl font-semibold">Selected projects</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <TiltCard key={i} project={p} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-semibold">Skills</h3>
          <div className="mt-6 space-y-4">
            {skills.map((s, i) => (
              <SkillBar key={i} name={s.name} level={s.level} />
            ))}
          </div>
        </section>

        {/* Contact / Let's Connect */}
        <section id="contact" className="mt-12 p-8 rounded-2xl">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">Let’s Connect!</h3>
           
            <div className="mt-6 flex flex-wrap gap-3">
              <GlowButton href={"mailto:vikash8298020427@gmail.com"} value={"Email me"}></GlowButton>
              <GlowButton href={"https://www.linkedin.com/in/vikash-kumar-061a4a2a2"} value={"LinkedIn"}></GlowButton>
              <GlowButton href={"https://github.com/vikashcoder8789"} value={"Github"}></GlowButton>
            </div>

            <div className="mt-6 text-sm text-slate-500">Or send me a message — I typically reply within a few business days.</div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between gap-3">
          <div>© {new Date().getFullYear()} Vikash Kumar</div>
          <div className="flex items-center gap-4">
            <div>Made with <span className="text-red-500">❤</span></div>
            <div className="text-xs text-slate-400">Tailwind + React + Framer Motion</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function GlowButton({href, value }) {
  return (
    <a
      href={href}
      target="_blank"
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-lg transform-gpu transition hover:scale-105"
      style={{
        boxShadow: "0 6px 18px rgba(99,102,241,0.18), inset 0 -4px 12px rgba(0,0,0,0.04)"
      }}
      rel="noopener noreferrer"
    >
      <span className="absolute -inset-px rounded-lg opacity-0 hover:opacity-100 transition duration-300" style={{ boxShadow: "0 14px 30px rgba(99,102,241,0.16)" }} ></span>
      {value}
 
    </a>
  );
}

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(true);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">{name}</div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
        />
      </div>
    </div>
  );
}

function TiltCard({ project }) {


  return (
    <motion.a
      href={project.link}
       target="_blank"
      className="block bg-white rounded-2xl p-6 shadow-lg transition-transform hover:-translate-y-2 duration-300 transition-shadow will-change-transform"
    >
      <h4 className="font-semibold">{project.title}</h4>
      <p className="mt-2 text-sm text-slate-600">{project.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t, j) => (
          <span key={j} className="text-xs px-2 py-1 rounded bg-slate-100">{t}</span>
        ))}
      </div>
    </motion.a>
  );
}
