import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, Truck, Boxes, ClipboardList, User, Plus, Zap, Share2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { trucks, cargo } from './data/mockData.js'
import './styles.css'

const tabs = [
  ['home', 'Home', Home],
  ['garage', 'Garage', Truck],
  ['loads', 'Loads', ClipboardList],
  ['cargo', 'Cargo', Boxes],
  ['profile', 'Profile', User],
]

function Header({ kicker='Partial-It', title, subtitle }) {
  return <div className="header"><div className="kicker">{kicker}</div><h1>{title}</h1><p className="subtitle">{subtitle}</p></div>
}

function HomeScreen({ setTab }) {
  return <>
    <Header title="Know Before You Load." subtitle="Plan, optimize, and share freight loads before the dock." />
    <div className="content">
      <div className="card hero">
        <div className="row"><span className="pill">LoadLogic Ready</span><Zap /></div>
        <div><div className="big">$428</div><p className="subtitle">Estimated revenue opportunity from open capacity this week.</p></div>
      </div>
      <div className="grid">
        <button className="primary" onClick={() => setTab('loads')}><Plus size={18}/> New Load</button>
        <button className="secondary" onClick={() => setTab('garage')}><Truck size={18}/> Add Truck</button>
      </div>
      {['Newark → Philly Partial', 'Elizabeth Warehouse Pickup', 'Jersey City Mixed Freight'].map((x, i) => (
        <div className="card" key={x}>
          <div className="row"><div><div className="title">{x}</div><div className="muted">{i === 1 ? 'Draft' : 'Optimized'} • {i === 0 ? '2 pallets open' : 'Review plan'}</div></div><span className="pill">{i === 1 ? '—' : 92 - i}</span></div>
        </div>
      ))}
    </div>
  </>
}

function Garage({ setTab }) {
  return <>
    <Header kicker="Vehicle Platform" title="Truck Garage" subtitle="Manage verified Digital Twins for every cargo space." />
    <div className="content">
      {trucks.map(t => <div className="card" key={t.name}>
        <div className="row"><div className="icon"><Truck /></div><span className="pill">{t.status}</span></div>
        <h2>{t.name}</h2><p className="subtitle">{t.type}</p>
        <div className="row"><span className="muted">Last utilization</span><strong>{t.utilization}%</strong></div>
        <button className="primary" style={{width:'100%', marginTop: 16}} onClick={() => setTab('loads')}>Launch New Load</button>
      </div>)}
    </div>
  </>
}

function Loads() {
  const [done, setDone] = useState(false)
  return <>
    <Header kicker="Planning Platform" title={done ? 'LoadLogic Results' : 'Load Workspace'} subtitle={done ? 'Freight fits with strong remaining capacity.' : 'Visualize first. Calculate second.'} />
    <div className="content">
      <div className="card">
        <div className="row"><span className="pill">Newark → Philly</span><Share2 /></div>
        <div className="truck-bed" style={{marginTop: 14}}>
          <div className="box" style={{left:18, top:24, width:90, height:70}}>P1</div>
          <div className="box" style={{left:118, top:24, width:90, height:70}}>P2</div>
          <div className="box" style={{left:218, top:24, width:90, height:70}}>P3</div>
          <div className="box" style={{left:18, top:106, width:120, height:82}}>CRATE</div>
          <div className="box" style={{left:150, top:106, width:112, height:82}}>FURN</div>
        </div>
      </div>
      {!done ? <button className="primary" style={{width:'100%'}} onClick={() => setDone(true)}>Optimize Load</button> :
      <div className="card">
        <div className="row"><div className="big" style={{fontSize:48}}>92</div><CheckCircle2 color="#45f0b4"/></div>
        <h2>Fits with Rearrangement</h2>
        <p className="subtitle">LoadLogic preserved 2 pallet positions and produced a safer rear-access sequence.</p>
        <button className="primary" style={{width:'100%', marginTop: 16}}>Share Load Plan</button>
      </div>}
    </div>
  </>
}

function Cargo() {
  return <>
    <Header kicker="Freight Platform" title="Cargo Library" subtitle="Reusable freight profiles for faster load creation." />
    <div className="content">
      {cargo.map(c => <div className="card" key={c.name}><div className="row"><div className="icon"><Boxes /></div><span className="pill">Qty {c.qty}</span></div><h2>{c.name}</h2><p className="subtitle">{c.dims} • {c.weight}</p></div>)}
    </div>
  </>
}

function Profile() {
  return <>
    <Header kicker="Identity Platform" title="Profile" subtitle="Account, settings, subscription, and support." />
    <div className="content">
      {['Owner-Operator Role', 'Offline Sync', 'Units of Measure', 'Subscription', 'Help Center'].map(x => <div className="card" key={x}><div className="row"><div className="title">{x}</div><span className="muted">›</span></div></div>)}
    </div>
  </>
}

function App() {
  const [tab, setTab] = useState('home')
  return <div className="wrap"><div className="phone">
    <div className="island"></div><div className="status"><span>9:41</span><span>5G ▰</span></div>
    <AnimatePresence mode="wait"><motion.div key={tab} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.2}}>
      {tab === 'home' && <HomeScreen setTab={setTab}/>}
      {tab === 'garage' && <Garage setTab={setTab}/>}
      {tab === 'loads' && <Loads/>}
      {tab === 'cargo' && <Cargo/>}
      {tab === 'profile' && <Profile/>}
    </motion.div></AnimatePresence>
    <nav className="tabs">{tabs.map(([id,label,Icon]) => <button key={id} className={'tab '+(tab===id?'active':'')} onClick={() => setTab(id)}><Icon size={20}/><span>{label}</span></button>)}</nav>
  </div></div>
}

createRoot(document.getElementById('root')).render(<App />)
