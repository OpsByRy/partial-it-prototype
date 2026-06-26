
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Home, Truck, Boxes, ClipboardList, User, Plus, Zap, Share2,
  CheckCircle2, MapPin, DollarSign, Move, PackagePlus, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { trucks, cargo, partialOpportunities } from './data/mockData.js'
import './styles.css'

const tabs = [
  ['home', 'Home', Home],
  ['garage', 'Garage', Truck],
  ['loads', 'Loads', ClipboardList],
  ['cargo', 'Cargo', Boxes],
  ['profile', 'Profile', User],
]

const initialBoxes = [
  { id: 'P1', label: 'P1', x: 18, y: 24, w: 82, h: 66 },
  { id: 'P2', label: 'P2', x: 108, y: 24, w: 82, h: 66 },
  { id: 'P3', label: 'P3', x: 198, y: 24, w: 82, h: 66 },
  { id: 'CRATE', label: 'CRATE', x: 18, y: 106, w: 118, h: 82 },
  { id: 'FURN', label: 'FURN', x: 146, y: 106, w: 108, h: 82 },
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
      <div className="card">
        <div className="row">
          <div>
            <div className="title">Capacity opportunity found</div>
            <div className="muted">Edison pickup can fit with your current Philly route.</div>
          </div>
          <span className="pill">+$285</span>
        </div>
        <button className="primary" style={{width:'100%', marginTop: 14}} onClick={() => setTab('loads')}>Review Partial Load</button>
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

function DraggableCargo({ box, updateBox }) {
  return (
    <motion.div
      className={'cargo-box ' + (box.extra ? 'extra' : '')}
      drag
      dragMomentum={false}
      dragConstraints={{ left: -box.x, right: 340 - box.x - box.w, top: -box.y, bottom: 260 - box.y - box.h }}
      onDragEnd={(_, info) => {
        updateBox(box.id, {
          x: Math.max(0, Math.min(340 - box.w, box.x + info.offset.x)),
          y: Math.max(0, Math.min(260 - box.h, box.y + info.offset.y))
        })
      }}
      whileDrag={{ scale: 1.06, zIndex: 10 }}
      style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
    >
      {box.label}
    </motion.div>
  )
}

function Loads() {
  const [stage, setStage] = useState('workspace')
  const [boxes, setBoxes] = useState(initialBoxes)
  const [view, setView] = useState('top')
  const [toast, setToast] = useState('Drag cargo blocks to manually adjust the load plan.')
  const opp = partialOpportunities[0]

  function updateBox(id, pos) {
    setBoxes(prev => prev.map(b => b.id === id ? { ...b, ...pos } : b))
    setToast('Position updated. Progress auto-saved.')
    setTimeout(() => setToast(''), 1800)
  }

  function acceptPartial() {
    setBoxes(prev => [
      ...prev,
      { id: 'NEW1', label: 'NEW P1', x: 248, y: 102, w: 72, h: 60, extra: true },
      { id: 'NEW2', label: 'NEW P2', x: 248, y: 170, w: 72, h: 60, extra: true }
    ])
    setStage('accepted')
    setToast('Additional partial load added to workspace.')
    setTimeout(() => setToast(''), 1800)
  }

  return <>
    <Header
      kicker="Planning Platform"
      title={stage === 'results' || stage === 'accepted' ? 'LoadLogic Results' : stage === 'opportunity' ? 'Partial Load Match' : 'Load Workspace'}
      subtitle={stage === 'opportunity' ? 'Capacity Intelligence found freight that fits your open space.' : stage === 'accepted' ? 'Additional freight added. Re-optimized capacity and payout.' : 'Drag cargo, review capacity, and optimize before loading.'}
    />
    <div className="content">
      <div className="segmented">
        <button className={view === 'top' ? 'active' : ''} onClick={() => setView('top')}>Top</button>
        <button className={view === 'rear' ? 'active' : ''} onClick={() => setView('rear')}>Rear</button>
        <button className={view === '3d' ? 'active' : ''} onClick={() => setView('3d')}>3D</button>
      </div>

      <div className="card">
        <div className="row"><span className="pill">{view.toUpperCase()} VIEW</span><span className="pill"><Move size={12}/> Draggable</span></div>
        <div className="truck-bed" style={{marginTop: 14}}>
          <div className="capacity-zone">Open<br/>Capacity</div>
          <div className="dock-label">REAR DOOR</div>
          {boxes.map(b => <DraggableCargo key={b.id} box={b} updateBox={updateBox} />)}
        </div>
      </div>

      {stage === 'workspace' && (
        <div className="sheet">
          <div className="row">
            <div>
              <div className="title">Current load draft</div>
              <div className="muted">5 cargo groups • 6,840 lbs • 2 pallet positions open</div>
            </div>
            <PackagePlus />
          </div>
          <button className="primary" style={{width:'100%', marginTop: 14}} onClick={() => setStage('results')}>Optimize Load</button>
          <button className="secondary" style={{width:'100%', marginTop: 10}} onClick={() => setStage('opportunity')}>Find Additional Partial Load</button>
        </div>
      )}

      {stage === 'results' && (
        <div className="card">
          <div className="row"><div className="big" style={{fontSize:48}}>92</div><CheckCircle2 color="#45f0b4"/></div>
          <h2>Fits with Rearrangement</h2>
          <p className="subtitle">LoadLogic preserved 2 pallet positions and produced a safer rear-access sequence.</p>
          <div className="grid" style={{marginTop: 14}}>
            <button className="secondary" onClick={() => setStage('workspace')}>Edit</button>
            <button className="primary" onClick={() => setStage('opportunity')}>Find Partial</button>
          </div>
        </div>
      )}

      {stage === 'opportunity' && (
        <div className="card">
          <div className="row">
            <div className="icon"><MapPin /></div>
            <span className="pill">{opp.confidence}</span>
          </div>
          <h2>{opp.title}</h2>
          <p className="subtitle">{opp.route} • {opp.freight} • {opp.weight}</p>
          <div className="card" style={{marginBottom: 0}}>
            <div className="row"><span className="muted">Estimated payout</span><strong>{opp.payout}</strong></div>
            <div className="row" style={{marginTop: 10}}><span className="muted">Fit reason</span><strong style={{textAlign:'right'}}>{opp.fit}</strong></div>
          </div>
          <div className="grid" style={{marginTop: 14}}>
            <button className="danger" onClick={() => setStage('workspace')}><X size={16}/> Decline</button>
            <button className="primary" onClick={acceptPartial}><DollarSign size={16}/> Add Load</button>
          </div>
        </div>
      )}

      {stage === 'accepted' && (
        <div className="card">
          <div className="row"><div className="big" style={{fontSize:48}}>96</div><span className="pill">+$285</span></div>
          <h2>Additional Partial Accepted</h2>
          <p className="subtitle">The Edison pickup was added to the rear-right capacity zone. Updated load score improved to 96 with 91% utilization.</p>
          <button className="primary" style={{width:'100%', marginTop: 14}}>Share Updated Load Plan</button>
          <button className="secondary" style={{width:'100%', marginTop: 10}} onClick={() => setStage('workspace')}>Keep Editing</button>
        </div>
      )}
    </div>

    <AnimatePresence>
      {toast && <motion.div className="toast" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="title">{toast}</div>
      </motion.div>}
    </AnimatePresence>
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
