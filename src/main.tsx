import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'KissanCare', type: 'AI FOR AGRICULTURE', status: 'SHIPPED', stat: '85%', desc: 'Farmer advisory chatbot with an NLP classifier across six categories and three agronomic APIs.', tags: ['Python', 'NLP', 'REST APIs'], detail: 'SIH 2024 institutional shortlist from 200+ teams.' },
  { title: 'Edwizer', type: 'AI EDTECH', status: 'LIVE BUILD', stat: '6', desc: 'Personalized learning platform designed from discovery to deployment with a multi-tier backend.', tags: ['React', 'Node.js', 'Python'], detail: 'Led a cross-functional team of six engineers.' },
  { title: 'Swachta', type: 'CIVIC TECH', status: 'MVP', stat: '45%', desc: 'Smart-city waste intelligence that detects hotspots and routes SLA-based sanitation tickets.', tags: ['Computer Vision', 'Geo-tagging', 'Product'], detail: 'Targeting a ~45% faster resolution turnaround.' },
  { title: 'Autonomous RAG', type: 'AI AGENTS', status: 'SYSTEM', stat: 'RAG', desc: 'Context-aware workflows for resume parsing, candidate matching, and learning schedules.', tags: ['LangChain', 'LLMs', 'RAG'], detail: 'Orchestrates job-application and skill-growth workflows.' },
  { title: 'Medimin', type: 'HEALTH INTELLIGENCE', status: 'IN PROGRESS', stat: '01', desc: 'A comparison engine for medicine prices, composition, benefits, and side effects.', tags: ['Research', 'Product', 'AI'], detail: 'Concept-stage mission; not presented as deployed.' },
  { title: 'Quick Queue', type: 'SYSTEM DESIGN', status: 'IN PROGRESS', stat: '∞', desc: 'Slot-based queue management aimed at turning waiting time into useful time.', tags: ['Scheduling', 'UX', 'Systems'], detail: 'Concept-stage mission; not presented as deployed.' }
]

const skills = [
  ['AI / ML', 'Python · LLMs · RAG · LangChain · PyTorch · TensorFlow · HuggingFace · OpenAI API'],
  ['PRODUCT SYSTEMS', 'Discovery · PRDs · RICE · GTM · Agile · CI/CD · Product strategy'],
  ['BUILD', 'React · Next.js · React Native · FastAPI · Node.js · Tailwind · RBAC'],
  ['DATA / INFRA', 'SQL · Pandas · Supabase · MySQL · Docker · Cloudflare Workers · D1 · KV']
]

function OrbitalCore() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current; if (!el) return
    const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(54, 1, .1, 100); camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(el.clientWidth, el.clientHeight); el.appendChild(renderer.domElement)
    const group = new THREE.Group(); scene.add(group)
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 2), new THREE.MeshBasicMaterial({ color: 0xc8ff37, wireframe: true })); group.add(core)
    const rings = [1.42, 1.74, 2.05].map((r, i) => { const x = new THREE.Mesh(new THREE.TorusGeometry(r, .012, 10, 90), new THREE.MeshBasicMaterial({ color: i === 1 ? 0x70ecff : 0xc8ff37 })); x.rotation.x = i * .8 + .2; x.rotation.y = i * .52; group.add(x); return x })
    const stars = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: 0x70ecff, size: .035 })); const dots = new Float32Array(900); for (let i=0;i<dots.length;i++) dots[i]=(Math.random()-.5)*10; stars.geometry.setAttribute('position', new THREE.BufferAttribute(dots,3)); scene.add(stars)
    let id=0; const animate=()=>{ id=requestAnimationFrame(animate); group.rotation.y += .004; core.rotation.x += .002; rings.forEach((r,i)=>r.rotation.z += .006*(i+1)); stars.rotation.y -= .0007; renderer.render(scene,camera) }; animate()
    const resize=()=>{ renderer.setSize(el.clientWidth,el.clientHeight); camera.aspect=el.clientWidth/el.clientHeight; camera.updateProjectionMatrix() }; addEventListener('resize', resize)
    return()=>{ cancelAnimationFrame(id); removeEventListener('resize',resize); renderer.dispose(); el.innerHTML='' }
  }, [])
  return <div className="orbital" ref={host} aria-label="Animated AI core" />
}

function Shell({ children }: { children: React.ReactNode }) {
  const page = useRef<HTMLElement>(null); const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0,0); const ctx=gsap.context(()=>{ gsap.fromTo('.reveal', { y:30, opacity:0 }, { y:0, opacity:1, duration:.75, stagger:.09, ease:'power3.out' }); gsap.utils.toArray<HTMLElement>('.scan-in').forEach(n=>gsap.fromTo(n,{y:32,opacity:0},{y:0,opacity:1,duration:.65,scrollTrigger:{trigger:n,start:'top 88%'}})) }, page); return()=>ctx.revert() }, [pathname])
  return <main ref={page} className="app-shell"><header><Link className="mark" to="/">S<span>Y</span><i/></Link><nav><Link to="/">LAUNCH</Link><Link to="/missions">MISSIONS</Link><Link to="/profile">PROFILE</Link><Link to="/contact">COMMS</Link></nav><span className="signal">◉ ONLINE</span></header>{children}<footer><span>SHIVAM YADAV / BUILDER PROFILE</span><span>INDIA · 2026</span></footer></main>
}

function Home() { return <><section className="hero"><div className="hero-copy"><p className="reveal system">SYSTEM BOOTED <b>•</b> PLAYER 01</p><h1 className="reveal">SHIVAM<br/><em>YADAV</em></h1><p className="reveal intro">Founder, technical builder, and B.Tech AI/ML student turning complex problems into products people can use.</p><div className="reveal actions"><Link className="primary" to="/missions">ENTER MISSION LOG <span>↗</span></Link><a className="secondary" href="https://github.com/shivbu22" target="_blank">GITHUB</a></div></div><OrbitalCore/><div className="hero-meta"><span>GREATER NOIDA / GHAZIABAD</span><span>FOUNDER MODE: ACTIVE</span></div></section><section className="statline scan-in"><div><strong>03</strong><span>VENTURES<br/>IN MOTION</span></div><div><strong>85%</strong><span>NLP MODEL<br/>ACCURACY</span></div><div><strong>150+</strong><span>DSA PROBLEMS<br/>SOLVED</span></div><div><strong>06</strong><span>ENGINEERS<br/>LED</span></div></section><section className="manifesto scan-in"><p>“I don’t collect side projects.<br/><b>I ship missions.</b>”</p><Link to="/profile">VIEW PLAYER PROFILE <span>→</span></Link></section></> }

function Missions() { return <section className="page"><div className="page-title reveal"><p className="system">MISSION SELECT / 06</p><h2>BUILT TO<br/><em>MOVE.</em></h2><p>Each project is a problem space explored with technical depth and product intent.</p></div><div className="missions">{projects.map((p,i)=><article className="mission scan-in" key={p.title}><div className="mission-top"><span>{String(i+1).padStart(2,'0')} / {p.type}</span><b className={p.status.includes('PROGRESS')?'pending':''}>{p.status}</b></div><div className="mission-stat">{p.stat}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><small>{p.detail}</small><button aria-label={'Explore '+p.title}>EXPLORE <span>↗</span></button></article>)}</div></section> }

function Profile() { return <section className="page profile"><div className="page-title reveal"><p className="system">PLAYER PROFILE / 01</p><h2>BUILDING<br/><em>THE NEXT.</em></h2></div><div className="profile-grid scan-in"><aside><div className="avatar">SY</div><p>SHIVAM “SHIV” YADAV</p><span>APM · AI / TECHNICAL PRODUCT</span><hr/><span>LEVEL 04 / B.TECH AI & ML</span><span>LLOYD INSTITUTE · 2027</span><span>CGPA 8.2</span></aside><article><p className="lead">A founder-first engineer who connects user insight, systems thinking, and hands-on building.</p><p>Shiv is pursuing B.Tech in AI/ML while building ventures across civic-tech, edtech, and AI tooling. His work moves from research and positioning through architecture, deployment, and iteration.</p><div className="experience"><div><b>FOUNDER & TECHNICAL LEAD</b><span>SWACHTA / CIVIC TECH</span><p>Built a smart-city MVP with computer vision and SLA-based routing for waste hotspot resolution.</p></div><div><b>FOUNDER & TECHNICAL LEAD</b><span>EDWIZER / JAN 2025 — PRESENT</span><p>Owned 0→1 lifecycle, live deployment, and bi-weekly execution for AI-driven learning.</p></div><div><b>AI INTERN</b><span>VELOCITIQ TECHNOLOGIES / 2025</span><p>Completed remote AI internship alongside founder work.</p></div></div></article></div><div className="ability-grid">{skills.map(([name,body])=><div className="ability scan-in" key={name}><span>{name}</span><p>{body}</p></div>)}</div><section className="awards scan-in"><h3>ACHIEVEMENT CACHE</h3><ul><li>SIH 2024 institutional shortlist for KissanCare, chosen from 200+ teams.</li><li>150+ DSA problems solved; active GeeksforGeeks Chapter member.</li><li>Six certifications across product, business, AI, ML, Python, and SQL.</li></ul></section><section className="certs scan-in"><h3>CERTIFICATION INVENTORY</h3><p>Brand Building 101 · AI for Business Leaders · Product Management: Vision, Roadmap & Strategy · Machine Learning A–Z · Python for Data Science & AI · Introduction to SQL</p></section></section> }

function Contact() { return <section className="contact page"><p className="system reveal">COMMUNICATIONS UPLINK</p><h2 className="reveal">LET’S BUILD<br/><em>SOMETHING REAL.</em></h2><p className="contact-copy reveal">Have a hard problem, a product to ship, or an ambitious AI workflow to design? Send the signal.</p><div className="contact-links reveal"><a href="https://www.linkedin.com/in/shivbu22" target="_blank">LINKEDIN <span>↗</span></a><a href="https://github.com/shivbu22" target="_blank">GITHUB <span>↗</span></a></div><p className="note reveal">Direct email contact can be added when provided.</p></section> }

function App(){ const path=useLocation().pathname; const Page=path==='/missions'?Missions:path==='/profile'?Profile:path==='/contact'?Contact:Home; return <Shell><Page/></Shell> }
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>)
