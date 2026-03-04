import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Shield, Activity, Cpu, Network,
    Database, Lock, ChevronRight, Zap, Globe, BarChart3,
    Calendar, MapPin, Users, Trophy, Code, Bot, Gamepad2,
    BookOpen, Layers, Heart, Download, LayoutDashboard, QrCode, Bell
} from 'lucide-react';
import ImageSequence from './components/ImageSequence';
import CursorGlow from './components/CursorGlow';
import './index.css';

/* ─── Scroll reveal ───────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 20 }) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

/* ─── Section label ───────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
    <p className="font-mono text-[10px] tracking-[0.35em] text-[#3effa0]/75 uppercase mb-5 flex items-center gap-3">
        <span className="w-4 h-px bg-[#3effa0]/30 flex-shrink-0" />
        {children}
    </p>
);

/* ─── Nav Link ────────────────────────────────────────────────────── */
const NavLink = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        className={`nav-link ${active ? 'text-white bg-white/5' : ''}`}
    >
        {children}
    </button>
);

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [videoEnded, setVideoEnded] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Reset scroll when changing views
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentView]);

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
            heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                setShowVideo(false);
                window.scrollTo(0, 0);
            }, 1000);
        }, 400);
    };

    return (
        <div className="relative w-full bg-[#060c0a] text-white overflow-x-hidden selection:bg-[#3effa0]/30 selection:text-white min-h-screen">
            <CursorGlow />
            <ImageSequence />

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 inset-x-0 z-50"
            >
                <div className="navbar-inner">
                    <button onClick={() => setCurrentView('home')} className="flex items-center flex-shrink-0">
                        <img
                            src="/prism-logo.png" alt="PRISM"
                            className="h-10 w-auto object-contain opacity-95"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(62,255,160,0.3))' }}
                        />
                    </button>

                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink active={currentView === 'home'} onClick={() => setCurrentView('home')}>Home</NavLink>
                        <NavLink active={currentView === 'events'} onClick={() => setCurrentView('events')}>Events</NavLink>
                        <NavLink active={currentView === 'itinerary'} onClick={() => setCurrentView('itinerary')}>Schedule</NavLink>
                        <NavLink active={currentView === 'sponsors'} onClick={() => setCurrentView('sponsors')}>Sponsors</NavLink>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentView('dashboard')}
                            className={`btn-ghost-sm gap-2 ${currentView === 'dashboard' ? 'bg-white/10' : ''}`}
                        >
                            <LayoutDashboard className="w-3 h-3" />
                            Dashboard
                        </button>
                        <button className="btn-primary-sm">
                            Register Now <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </motion.header>

            <main className="relative z-10 w-full pt-[2.75rem]">
                <AnimatePresence mode="wait">
                    {currentView === 'home' && (
                        <HomeView
                            key="home"
                            showVideo={showVideo}
                            videoEnded={videoEnded}
                            handleVideoEnd={handleVideoEnd}
                            heroRef={heroRef}
                            setView={setCurrentView}
                        />
                    )}
                    {currentView === 'events' && <EventsCatalogView key="events" setView={setCurrentView} />}
                    {currentView === 'event-detail' && <EventDetailView key="detail" setView={setCurrentView} />}
                    {currentView === 'itinerary' && <ItineraryView key="itinerary" />}
                    {currentView === 'sponsors' && <SponsorsView key="sponsors" />}
                    {currentView === 'dashboard' && <DashboardView key="dashboard" />}
                </AnimatePresence>
            </main>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <footer className="border-t border-white/[0.04] bg-[#060c0a] pt-20 pb-10 px-6 md:px-10 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-white/[0.04]">
                        <div className="md:col-span-2 max-w-xs">
                            <img src="/prism-logo.png" alt="PRISM" className="h-11 w-auto object-contain mb-8 opacity-90" />
                            <p className="text-[12px] text-white/55 leading-relaxed font-light mb-8">
                                Faculty of Engineering and Technology, University of Lucknow presents PRISM 2.0 — the biggest annual technical festival.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3effa0]" />
                                <span className="font-mono text-[9px] tracking-widest text-white/55">FOET CAMPUS, LUCKNOW</span>
                            </div>
                        </div>
                        {[
                            { heading: 'Fest', links: ['Events', 'Schedule', 'Sponsors', 'Register'] },
                            { heading: 'Support', links: ['Rules', 'FAQ', 'Contact', 'Coordinators'] },
                            { heading: 'Social', links: ['Instagram', 'LinkedIn', 'Twitter', 'YouTube'] },
                        ].map(col => (
                            <div key={col.heading}>
                                <p className="text-[11px] font-semibold text-white/85 mb-5 tracking-wide">{col.heading}</p>
                                <ul className="space-y-3.5 text-[12px] text-white/75 font-light">
                                    {col.links.map(l => <li key={l} className="hover:text-white/80 cursor-pointer transition-colors">{l}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 flex justify-between items-center text-[11px] text-white/65">
                        <p>© 2025 FoET, University of Lucknow. All rights reserved.</p>
                        <p className="font-mono tracking-widest">PRISM 2.0 · ENGINEER THE FUTURE</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────────── */
/* ─── VIEWS ──────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────────────── */

const HomeView = ({ showVideo, videoEnded, handleVideoEnd, heroRef, setView }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {showVideo && (
            <motion.section exit={{ opacity: 0, scale: 0.98 }} className="relative w-full pb-10 px-6 md:px-10">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="video-frame relative w-full overflow-hidden" style={{ borderRadius: 20, aspectRatio: '16 / 9' }}>
                            <video autoPlay muted playsInline className="w-full h-full object-contain bg-black video-clarity" src="/bg_video.mp4" onEnded={handleVideoEnd} />

                            {/* Visual processing overlays to mask low-res blocks */}
                            <div className="video-overlay-fx" />
                            <div className="video-noise" />

                            {/* Subtle edge fade at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
                        </div>
                    </Reveal>
                    <div className="mt-3 flex items-center justify-between px-1">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${videoEnded ? 'bg-white/20' : 'bg-[#3effa0] shadow-[0_0_8px_rgba(62,255,160,0.9)]'}`} />
                            <span className="font-mono text-[10px] tracking-[0.25em] text-white/75 italic">
                                {videoEnded ? 'PRISM 2.0 INTRO COMPLETE' : 'STREAMING PRISM 2.0 INCEPTION'}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.section>
        )}

        <section ref={heroRef} className="relative w-full pt-[4.5rem] pb-20 px-6 md:px-10 dot-grid">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl">
                    <Reveal>
                        <div className="badge mb-6">
                            <div className="status-dot" />
                            FoET, University of Lucknow presents
                        </div>
                    </Reveal>
                    <Reveal delay={0.07}>
                        <h1 className="hero-headline text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.04em] leading-[1.0] mb-5">
                            PRISM 2.0:<br />
                            <span className="text-gradient font-light italic">Engineer</span> the Future.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.13}>
                        <p className="text-[16px] text-white/90 leading-[1.8] max-w-xl mb-10 font-light">
                            The biggest annual technical festival of FoET is back. 3 Days. 30+ Events. Infinite Possibilities. Are you ready to code, build, and conquer?
                        </p>
                    </Reveal>
                    <Reveal delay={0.19}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                            <button className="btn-primary">Register Now <ArrowRight className="w-4 h-4" /></button>
                            <button onClick={() => setView('events')} className="btn-ghost">Explore Events</button>
                            <div className="flex items-center gap-2 text-[13px] text-white/80 font-mono pl-2">
                                <Calendar className="w-4 h-4" />
                                <span>March 14 - 16, 2025</span>
                                <span className="mx-2 opacity-30">|</span>
                                <MapPin className="w-4 h-4" />
                                <span>FoET Campus, Lucknow</span>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <div className="mt-12 pt-10 border-t border-white/[0.05] grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: '5000+', label: 'Footfall expect' },
                            { value: '30+', label: 'Tech Events', accent: true },
                            { value: '₹X Lakhs+', label: 'Prize Pool' },
                            { value: '10+', label: 'Workshops', accent: true },
                        ].map((s, i) => (
                            <div key={i}>
                                <p className={`text-4xl font-semibold tracking-tighter ${s.accent ? 'text-[#3effa0]' : 'text-white'}`}>{s.value}</p>
                                <p className="text-[12px] text-white/80 font-light mt-1 uppercase tracking-widest">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>

        <section className="w-full py-32 px-6 md:px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <Reveal>
                    <SectionLabel>What is PRISM?</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 leading-tight">
                        An emotion for<br />tech enthusiasts.
                    </h2>
                    <p className="text-[15px] text-white/90 leading-[1.9] font-light mb-10">
                        PRISM isn’t just a fest; hosted by the brightest minds at FoET, PRISM 2.0 brings together developers, creators, gamers, and innovators to solve real-world problems and push the boundaries of technology.
                    </p>
                    <button onClick={() => setView('events')} className="btn-ghost gap-2">
                        Browse the arena <ChevronRight className="w-4 h-4" />
                    </button>
                </Reveal>
                <div className="relative aspect-video glass rounded-[32px] overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 dot-grid opacity-30" />
                    <img src="/prism-crystal.png" className="w-40 h-auto animate-float-slow" style={{ filter: 'drop-shadow(0 0 30px rgba(62,255,160,0.4))' }} alt="" />
                </div>
            </div>
        </section>
    </motion.div>
);

const EventsCatalogView = ({ setView }) => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Coding', 'Robotics', 'Gaming', 'Non-Tech', 'Workshops'];
    const events = [
        { title: 'BugThug 2.0', tag: 'Coding', snippet: 'Think your code is flawless? Prove it. Find the bugs, fix the logic, and beat the clock.', detail: true },
        { title: 'RoboWars', tag: 'Robotics', snippet: 'Build. Battle. Destroy. Enter your custom-built bots into the arena and fight for the title.' },
        { title: 'HackTheFuture', tag: 'Coding', snippet: '24 hours to build a solution that matters. Grab your coffee and code your way to the grand prize.' },
        { title: 'Pixel Perfect', tag: 'Non-Tech', snippet: 'Showcase your UI/UX skills in this designer showdown. Craft pixel-perfect interfaces.' },
        { title: 'Vanguard Cup', tag: 'Gaming', snippet: 'The FPS battle of the year. Bring your squad and dominate the tactical arena.' }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-24 px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <SectionLabel>The Arena</SectionLabel>
                    <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-4">PRISM 2025 Events</h2>
                    <p className="text-white/85 text-[15px] max-w-lg mb-12">From intense hackathons to epic bot battles. Find your arena and claim your glory.</p>
                </Reveal>

                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map(c => (
                        <button
                            key={c} onClick={() => setFilter(c)}
                            className={`px-6 py-2 rounded-full text-[12px] font-mono tracking-wider transition-all border ${filter === c ? 'bg-[#3effa0] text-black border-[#3effa0]' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.filter(e => filter === 'All' || e.tag === filter).map((e, i) => (
                        <Reveal key={i} delay={i * 0.05}>
                            <div className="feature-card group p-8 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="icon-box-sm"><Code className="w-3.5 h-3.5 text-[#3effa0]" /></div>
                                    <span className="text-[10px] font-mono text-[#3effa0]/60 border border-[#3effa0]/20 px-2 py-0.5 rounded uppercase">{e.tag}</span>
                                </div>
                                <h3 className="text-xl font-medium mb-3 group-hover:text-[#3effa0] transition-colors">{e.title}</h3>
                                <p className="text-[13px] text-white/85 leading-relaxed mb-8 flex-1">{e.snippet}</p>
                                <button
                                    onClick={() => e.detail && setView('event-detail')}
                                    className="btn-ghost-sm w-full justify-center group-hover:border-[#3effa0]/40 transition-all font-mono py-3"
                                >
                                    {e.detail ? 'View Details' : 'Coming Soon'}
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const EventDetailView = ({ setView }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
            <Reveal>
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setView('events')} className="text-white/75 hover:text-white flex items-center gap-2 text-[13px]">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Arena
                    </button>
                </div>
                <div className="badge mb-6">CODING / DEBUGGING CHALLENGE</div>
                <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">BugThug 2.0</h1>
                <div className="flex flex-wrap gap-8 items-center py-6 border-y border-white/5 mb-12">
                    <div className="flex flex-col"><span className="text-[10px] uppercase tracking-widest text-white/55 font-mono">Prize Pool</span><span className="text-xl text-[#3effa0] font-semibold">₹[Amount]</span></div>
                    <div className="flex flex-col"><span className="text-[10px] uppercase tracking-widest text-white/55 font-mono">Entry Fee</span><span className="text-xl">₹[Amount]*</span></div>
                    <div className="text-[11px] text-white/65 italic">*Free for FoET students</div>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <Reveal delay={0.1}>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-3"><BookOpen className="w-5 h-5 text-[#3effa0]" /> Overview</h3>
                        <p className="text-white/90 leading-relaxed font-light">
                            Welcome to BugThug 2.0! This event will test your command over logic, syntax, and patience. Participants will be given broken code snippets across various languages (C++, Python, Java). Your task? Make it run before the timer runs out.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-3"><Shield className="w-5 h-5 text-[#3effa0]" /> Rules & Guidelines</h3>
                        <ul className="space-y-3 text-white/80 text-[14px] font-light list-disc pl-5">
                            <li>Individual participation only.</li>
                            <li>Internet access is strictly prohibited during Round 1.</li>
                            <li>Ties will be broken based on submission time.</li>
                        </ul>
                    </Reveal>
                </div>
                <div className="space-y-12">
                    <Reveal delay={0.2}>
                        <div className="core-panel p-8 rounded-2xl space-y-8">
                            <div>
                                <h4 className="text-[11px] font-mono tracking-widest text-white/65 uppercase mb-4">Timeline</h4>
                                <div className="space-y-6">
                                    <div className="relative pl-5 border-l border-white/10 py-1">
                                        <div className="absolute top-2 -left-1 w-2 h-2 rounded-full bg-[#3effa0]" />
                                        <p className="text-[13px] font-medium leading-none mb-1">Round 1 (MCQ & Syntax)</p>
                                        <p className="text-[11px] text-white/70">Mar 14, 10:00 AM | Lab 1</p>
                                    </div>
                                    <div className="relative pl-5 border-l border-white/10 py-1">
                                        <div className="absolute top-2 -left-1 w-2 h-2 rounded-full bg-white/20" />
                                        <p className="text-[13px] font-medium leading-none mb-1">Round 2 (Live Debugging)</p>
                                        <p className="text-[11px] text-white/70">Mar 15, 11:30 AM | Seminar Hall</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/5 text-center">
                                <button className="btn-primary w-full justify-center">Register Now</button>
                            </div>
                            <div className="text-[11px] text-white/55 space-y-2">
                                <p>Coordinators:</p>
                                <p>Jatin Singh: +91 99XXXXXXX</p>
                                <p>Sneha Rai: +91 88XXXXXXX</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </motion.div>
);

const ItineraryView = () => {
    const [day, setDay] = useState(1);
    const schedule = {
        1: {
            title: 'The Inception', events: [
                { time: '09:00 AM', label: 'Inauguration Ceremony', loc: 'Main Auditorium' },
                { time: '10:30 AM', label: 'HackTheFuture: Kickoff', loc: 'Lab Block' },
                { time: '12:00 PM', label: 'Guest Lecture: AI in 2025', loc: 'Seminar Hall' },
                { time: '03:00 PM', label: 'BGMI Tournament - Qualifiers', loc: 'E-Sports Arena' }
            ]
        },
        2: {
            title: 'The Expansion', events: [
                { time: '10:00 AM', label: 'BugThug: Final Round', loc: 'Comp Lab 1' },
                { time: '01:00 PM', label: 'RoboWars: Heat 1', loc: 'Arena Block' },
                { time: '04:00 PM', label: 'Tech Quiz Bash', loc: 'Seminar Hall' }
            ]
        },
        3: {
            title: 'The Finale', events: [
                { time: '11:00 AM', label: 'HackTheFuture: Demo Day', loc: 'Main Hall' },
                { time: '03:00 PM', label: 'Prize Distribution', loc: 'Auditorium' },
                { time: '06:00 PM', label: 'Culturals & Afterparty', loc: 'FoET Ground' }
            ]
        }
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-6 md:px-10 max-w-4xl mx-auto">
            <Reveal>
                <SectionLabel>Itinerary</SectionLabel>
                <h2 className="text-5xl font-semibold mb-3 tracking-tighter">Plan your PRISM 2.0</h2>
                <p className="text-white/80 mb-12">Experience Lucknow's premier tech fest hour by hour.</p>
            </Reveal>
            <div className="flex gap-4 mb-16 overflow-x-auto pb-4 border-b border-white/5">
                {[1, 2, 3].map(d => (
                    <button key={d} onClick={() => setDay(d)} className={`flex-1 min-w-[120px] p-6 rounded-2xl border text-left transition-all ${day === d ? 'border-[#3effa0]/40 bg-[#3effa0]/5' : 'border-white/5 hover:border-white/10'}`}>
                        <span className="text-[11px] font-mono text-white/65 uppercase mb-2 block">Day 0{d}</span>
                        <span className={`text-[15px] font-medium block ${day === d ? 'text-white' : 'text-white/75'}`}>{schedule[d].title}</span>
                    </button>
                ))}
            </div>
            <div className="space-y-6">
                {schedule[day].events.map((ev, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                        <div className="glass p-6 rounded-2xl flex items-center gap-8 group hover:border-white/20 transition-all">
                            <span className="font-mono text-[14px] text-[#3effa0] w-20 flex-shrink-0">{ev.time}</span>
                            <div className="flex-1">
                                <h4 className="text-lg font-medium text-white/90 group-hover:text-white">{ev.label}</h4>
                                <p className="text-[12px] text-white/65 flex items-center gap-2 mt-1"><MapPin className="w-3 h-3" /> {ev.loc}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-[#3effa0]" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </motion.div>
    );
};

const SponsorsView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <Reveal>
            <SectionLabel>Partners</SectionLabel>
            <h2 className="text-5xl font-semibold mb-3 tracking-tighter text-center">Our Partners in Innovation</h2>
            <p className="text-white/85 text-center mb-24">PRISM 2.0 is made possible by the generous support of our sponsors.</p>
        </Reveal>

        <div className="space-y-32">
            <Reveal>
                <div className="text-center">
                    <p className="text-[10px] font-mono tracking-[0.4em] text-white/55 mb-10 uppercase">Title Sponsor</p>
                    <div className="h-48 glass rounded-[32px] border-dashed border-[#3effa0]/20 flex items-center justify-center p-12 mx-auto max-w-md grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                        <span className="text-2xl font-bold tracking-tighter text-white/20">PARTNER LOGO</span>
                    </div>
                </div>
            </Reveal>
            <Reveal>
                <div className="text-center">
                    <p className="text-[10px] font-mono tracking-[0.4em] text-white/55 mb-10 uppercase">Powered By</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[1, 2].map(i => (
                            <div key={i} className="h-28 w-64 glass rounded-2xl flex items-center justify-center grayscale opacity-30 hover:opacity-80 transition-all">
                                <span className="font-bold text-white/20">SPONSOR</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
            <Reveal>
                <div className="cta-banner rounded-[32px] p-16 text-center">
                    <h3 className="text-3xl font-semibold mb-4">Want to partner with us?</h3>
                    <p className="text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">Reach over 5,000+ tech-savvy students. Elevate your brand visibility at Lucknow's premier tech fest.</p>
                    <button className="btn-primary gap-2">Download Brochure <Download className="w-4 h-4" /></button>
                </div>
            </Reveal>
        </div>
    </motion.div>
);

const DashboardView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Reveal>
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#3effa0]/10 via-transparent to-transparent border border-[#3effa0]/10">
                        <h2 className="text-3xl font-semibold mb-2">Welcome back, Ishaan!</h2>
                        <p className="text-white/85 text-[14px]">You are currently registered for 3 events. Get ready for Day 01.</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Reveal delay={0.1}>
                        <div className="glass p-8 rounded-3xl">
                            <h3 className="text-sm font-semibold mb-6 flex items-center gap-3"><Layers className="w-4 h-4 text-[#3effa0]" /> My Events</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'BugThug 2.0', status: 'Confimed', color: 'text-[#3effa0]' },
                                    { name: 'HackTheFuture', status: 'Team Pending', color: 'text-orange-400' },
                                    { name: 'BGMI Quals', status: 'Payment Due', color: 'text-red-400' }
                                ].map((ev, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                        <span className="text-[13px]">{ev.name}</span>
                                        <span className={`text-[10px] font-mono ${ev.color}`}>{ev.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="glass p-8 rounded-3xl">
                            <h3 className="text-sm font-semibold mb-6 flex items-center gap-3"><Bell className="w-4 h-4 text-[#3effa0]" /> Announcements</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <p className="text-[12px] leading-relaxed mb-2 text-white/90">RoboWars weigh-in has been moved to 2:00 PM today at Arena Block.</p>
                                    <span className="text-[9px] font-mono text-white/55 uppercase">10 mins ago</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
            <div className="space-y-8">
                <Reveal delay={0.3}>
                    <div className="core-panel p-8 rounded-3xl text-center">
                        <p className="text-[11px] font-mono tracking-widest text-[#3effa0] mb-8 uppercase">My Entry Pass</p>
                        <div className="bg-white p-4 rounded-2xl inline-block mb-6">
                            <QrCode className="w-32 h-32 text-black" />
                        </div>
                        <p className="text-[12px] text-white/75 max-w-[200px] mx-auto leading-relaxed">Show this at the registration desk for seamless entry.</p>
                    </div>
                </Reveal>
                <Reveal delay={0.4}>
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-sm font-semibold mb-6">Team Invitations</h3>
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">AS</div>
                            <p className="text-[12px] flex-1 text-white/90">Aryan invited you to join <span className="text-white">CyberPunks</span></p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-6">
                            <button className="btn-primary-sm justify-center">Accept</button>
                            <button className="btn-ghost-sm justify-center">Decline</button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    </motion.div>
);
