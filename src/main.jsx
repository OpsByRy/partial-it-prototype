
import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Truck, Boxes, ClipboardList, User, Plus, Zap, Lock, RotateCw, Undo2, Redo2,
  Upload, PencilRuler, SlidersHorizontal, CheckCircle2, Fuel, DollarSign, Route, Gauge,
  Move3D, PackageCheck, X
} from 'lucide-react'
import {
  truck, loads, opportunities, opportunityRank, loadLogicPlan,
  manualExamplePlan, partialFreight, cargoTemplates
} from './data/mockData.js'
import './styles.css'

const tabs = [
  ['home','Home',Home],
  ['garage','Garage',Truck],
  ['loads','Loads',ClipboardList],
  ['cargo','Cargo',Boxes],
  ['profile','Profile',User]
]

const BED_W = 330
const BED_H = 290
const SNAP = 8

const clone = x => JSON.parse(JSON.stringify(x))
const snap = v => Math.round(v / SNAP) * SNAP
const effortScore = v => opportunityRank[v] || 99
const sortOpps = list => [...list].sort((a,b)=>
  (b.revenue - a.revenue) ||
  (effortScore(a.effort) - effortScore(b.effort)) ||
  (effortScore(a.route) - effortScore(b.route))
)

function overlaps(a,b){
  return a.id !== b.id &&
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.d &&
    a.y + a.d > b.y
}

function validate(items){
  return items.map(item => ({
    ...item,
    invalid: !item.locked && items.some(other => overlaps(item, other))
  }))
}

function Money({value}) {
  return <>{value.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0})}</>
}

function Header({kicker='Partial-It', title, subtitle}) {
  return (
    <div className="header">
      <div className="kicker">{kicker}</div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  )
}

function App(){
  const [tab,setTab] = useState('home')
  const [plannerMode,setPlannerMode] = useState('default')
  const [selectedOpp,setSelectedOpp] = useState(null)
  const [selectedLoad,setSelectedLoad] = useState(loads[0])
  const [oppModal,setOppModal] = useState(false)

  function openPlanner(mode, opp=null, load=loads[0]){
    setPlannerMode(mode)
    setSelectedOpp(opp)
    setSelectedLoad(load)
    setTab('loads')
    setOppModal(false)
  }

  return (
    <div className="wrap">
      <div className="phone">
        <div className="island" />
        <div className="status"><span>9:41</span><span>5G ▰</span></div>
        <div className="screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab + plannerMode + (selectedOpp?.id || '') + selectedLoad.id}
              initial={{opacity:0, y:12}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-12}}
              transition={{duration:.2}}
              style={{height:'100%', display:'flex', flexDirection:'column', minHeight:0}}
            >
              {tab === 'home' && <HomeScreen setTab={setTab} openPlanner={openPlanner} openOpps={()=>setOppModal(true)} />}
              {tab === 'garage' && <Garage />}
              {tab === 'loads' && <Planner mode={plannerMode} selectedOpp={selectedOpp} selectedLoad={selectedLoad} />}
              {tab === 'cargo' && <Cargo />}
              {tab === 'profile' && <Profile />}
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="tabs">
          {tabs.map(([id,label,Icon]) => (
            <button key={id} className={'tab ' + (tab === id ? 'active' : '')} onClick={()=>setTab(id)}>
              <Icon size={20}/><span>{label}</span>
            </button>
          ))}
        </nav>
        <AnimatePresence>
          {oppModal && <OpportunitiesModal close={()=>setOppModal(false)} openPlanner={openPlanner}/>}
        </AnimatePresence>
      </div>
    </div>
  )
}

function HomeScreen({setTab, openPlanner, openOpps}) {
  const topOpps = sortOpps(opportunities).slice(0,3)
  const totalOppRevenue = opportunities.reduce((sum,o)=>sum+o.revenue,0)
  return (
    <>
      <Header title="Know Before You Load." subtitle="Plan, optimize, and monetize unused capacity before freight hits the dock." />
      <div className="content">
        <div className="card hero">
          <div className="row"><span className="pill">Capacity Intelligence</span><Zap /></div>
          <div>
            <div className="big"><Money value={totalOppRevenue}/></div>
            <p className="subtitle">Potential additional revenue from ranked partial-load matches.</p>
          </div>
        </div>

        <div className="grid">
          <button className="primary" onClick={()=>setTab('loads')}><Plus size={18}/> New Load</button>
          <button className="secondary" onClick={()=>setTab('garage')}><Truck size={18}/> Add Truck</button>
        </div>

        <div className="card">
          <div className="row">
            <div>
              <div className="title">Capacity opportunities</div>
              <div className="muted">Ranked by revenue, effort, then detour.</div>
            </div>
            <button className="secondary small" onClick={openOpps}>View All ({opportunities.length})</button>
          </div>
          {topOpps.map(o => (
            <div className="card" key={o.id} style={{margin:'10px 0 0'}}>
              <div className="row">
                <div>
                  <div className="title">{o.title}</div>
                  <div className="muted">{o.route} | {o.effort}</div>
                </div>
                <span className="pill">+<Money value={o.revenue}/></span>
              </div>
              <p className="subtitle" style={{marginTop:8}}>{o.note}</p>
              <button className="primary" style={{width:'100%', marginTop:12}} onClick={()=>openPlanner('partial', o, loads[0])}>
                Review Partial Load
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="title">Existing loads</div>
          {loads.map(load => (
            <button className="card" key={load.id} style={{width:'100%', textAlign:'left', margin:'10px 0 0'}} onClick={()=>openPlanner('existing', null, load)}>
              <div className="row">
                <div>
                  <div className="title">{load.name}</div>
                  <div className="muted">{load.status} • Revenue <Money value={load.revenue}/> • Fuel <Money value={load.fuelCost}/></div>
                </div>
                <span className="pill">{load.score || 'Draft'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function Planner({mode, selectedOpp, selectedLoad}) {
  const [view,setView] = useState('perspective')
  const [showIntake,setShowIntake] = useState(false)
  const [selected,setSelected] = useState(null)
  const [toast,setToast] = useState('LoadLogic default plan loaded. Cargo is grayed until manually edited.')
  const [history,setHistory] = useState([])
  const [redo,setRedo] = useState([])

  const initialItems = useMemo(() => {
    if (mode === 'partial') {
      return validate([
        ...loadLogicPlan.map(x => ({...x, locked:true})),
        ...(selectedOpp ? partialFreight.map(x => ({...x, newLoad:true})) : [])
      ])
    }
    return validate(loadLogicPlan.map(x => ({...x, ghost:true})))
  }, [mode, selectedOpp])

  const [items,setItems] = useState(initialItems)
  const manual = items.some(i => i.manual)
  const invalid = items.some(i => i.invalid)
  const activeOpp = selectedOpp || opportunities[0]
  const totalRevenue = selectedLoad.revenue + (mode === 'partial' ? activeOpp.revenue : 0)
  const totalFuel = selectedLoad.fuelCost + (mode === 'partial' ? activeOpp.fuelCost : 0)
  const profit = totalRevenue - totalFuel
  const totalWeight = items.reduce((s,i)=>s+i.weight,0)
  const utilization = mode === 'partial' ? 91 : selectedLoad.utilization

  function pushState(next,msg){
    setHistory(h => [...h, clone(items)])
    setRedo([])
    setItems(validate(next.map(i => ({...i, ghost:false}))))
    setToast(msg)
    setTimeout(()=>setToast(''),1900)
  }

  function moveItem(id, patch, msg='Cargo moved. Snapped to grid and revalidated.'){
    pushState(items.map(i => i.id === id ? {...i, ...patch, manual:true} : i), msg)
  }

  function optimize(){
    const optimized = mode === 'partial'
      ? [...loadLogicPlan.map(x => ({...x, locked:true})), ...partialFreight.map(x => ({...x, newLoad:true}))]
      : loadLogicPlan.map(x => ({...x}))
    pushState(optimized, 'LoadLogic restored the default optimized plan: fit, weight distribution, rear-door access, and spacing improved.')
  }

  function undo(){
    if (!history.length) return
    const prev = history[history.length-1]
    setRedo(r => [clone(items), ...r])
    setHistory(h => h.slice(0,-1))
    setItems(prev)
    setToast('Undone.')
  }

  function redoMove(){
    if (!redo.length) return
    const next = redo[0]
    setHistory(h => [...h, clone(items)])
    setRedo(r => r.slice(1))
    setItems(next)
    setToast('Redone.')
  }

  function rotateSelected(){
    const target = items.find(i => i.id === selected)
    if (!target || target.locked) return
    const nextW = target.d
    const nextD = target.w
    const boundedX = Math.min(target.x, 330 - nextW)
    const boundedY = Math.min(target.y, 290 - nextD)
    moveItem(target.id, {w:nextW, d:nextD, x:boundedX, y:boundedY}, 'Cargo rotated, bounded inside trailer, and snapped to spacing grid.')
  }

  return (
    <>
      <Header
        kicker="LoadLogic Planner"
        title={mode === 'partial' ? 'Partial Load Review' : 'Load Workspace'}
        subtitle={mode === 'partial'
          ? 'Existing freight is locked in dark blue. New freight validates against open capacity.'
          : '3D trailer planner with bounded cargo, snapping, rotation, and LoadLogic reset.'}
      />
      <div className="content">
        <div className="grid">
          <button className="primary" onClick={()=>setShowIntake(true)}><Plus size={16}/> New Load</button>
          <button className="secondary" onClick={optimize}><SlidersHorizontal size={16}/> Optimize Load</button>
        </div>

        <div className="card">
          <div className="row">
            <div>
              <div className="title">{selectedLoad.name}</div>
              <div className="muted">{truck.name} • {truck.interior}</div>
            </div>
            <span className="pill"><span className="status-dot"></span>{mode === 'partial' ? activeOpp.route : 'Active'}</span>
          </div>
          <div className="grid" style={{marginTop:12}}>
            <Metric icon={<DollarSign size={16}/>} label="Revenue" value={<Money value={totalRevenue}/>} />
            <Metric icon={<Fuel size={16}/>} label="Fuel" value={<Money value={totalFuel}/>} />
            <Metric icon={<Gauge size={16}/>} label="Profit" value={<Money value={profit}/>} />
            <Metric icon={<PackageCheck size={16}/>} label="Utilization" value={`${utilization}%`} />
          </div>
          {mode === 'partial' && (
            <div className="card" style={{marginBottom:0}}>
              <div className="title">{activeOpp.title}</div>
              <p className="subtitle">{activeOpp.dims} • {activeOpp.weight} lbs • {activeOpp.effort}</p>
              <div className="metric-line"><span className="muted">Partial revenue</span><strong><Money value={activeOpp.revenue}/></strong></div>
              <div className="metric-line"><span className="muted">Partial fuel add-on</span><strong><Money value={activeOpp.fuelCost}/></strong></div>
            </div>
          )}
        </div>

        <div className="segmented">
          {[
            ['top','Top'],
            ['rear','Rear'],
            ['side','Side'],
            ['perspective','3D']
          ].map(([id,label]) => (
            <button key={id} className={view === id ? 'active' : ''} onClick={()=>setView(id)}>{label}</button>
          ))}
        </div>

        <div className="card">
          <div className="row">
            <span className="pill"><Move3D size={13}/> Drag blocks</span>
            <span className="pill">Snap + ¼ in gap</span>
          </div>
          {view === 'top' && <TopView items={items} setSelected={setSelected} moveItem={moveItem}/>}
          {view === 'rear' && <RearView items={items}/>}
          {view === 'side' && <SideView items={items}/>}
          {view === 'perspective' && <PerspectiveView items={items}/>}
        </div>

        <div className="sheet">
          <div className="planner-toolbar">
            <button className="secondary" onClick={undo} disabled={!history.length}><Undo2 size={16}/> Undo</button>
            <button className="secondary" onClick={redoMove} disabled={!redo.length}><Redo2 size={16}/> Redo</button>
            <button className="secondary" onClick={rotateSelected}><RotateCw size={16}/> Rotate</button>
          </div>
          <div className="card" style={{marginBottom:0}}>
            <div className="metric-line"><span className="muted">Load Score</span><strong>{invalid ? 'Invalid' : mode === 'partial' ? '96' : '92'}</strong></div>
            <div className="metric-line"><span className="muted">Weight</span><strong>{totalWeight.toLocaleString()} / {truck.payloadLimit.toLocaleString()} lbs</strong></div>
            <div className="metric-line"><span className="muted">Optimization Factors</span><strong>Fit • Access • Weight</strong></div>
          </div>
          {manual ? (
            <button className="primary" style={{width:'100%', marginTop:12}} disabled={invalid}>
              {invalid ? 'Resolve Collision Before Proceeding' : 'Proceed with Manual Plan'}
            </button>
          ) : (
            <p className="subtitle" style={{textAlign:'center', marginTop:12}}>Manual plan button unlocks after the first cargo move.</p>
          )}
          <div className="card">
            <div className="row"><CheckCircle2 color="#45f0b4"/><div className="title">LoadLogic reasoning</div></div>
            <p className="subtitle" style={{marginTop:8}}>Optimized for rear-door access, weight distribution, pallet spacing, remaining capacity, and total revenue opportunity.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showIntake && <NewLoadModal close={()=>setShowIntake(false)}/>}
        {toast && <Toast text={toast}/>}
      </AnimatePresence>
    </>
  )
}

function Metric({icon,label,value}) {
  return (
    <div className="card" style={{margin:0}}>
      <div className="row">
        {icon}
        <div style={{textAlign:'right'}}>
          <div className="muted">{label}</div>
          <div className="title">{value}</div>
        </div>
      </div>
    </div>
  )
}

function TopView({items,setSelected,moveItem}) {
  return (
    <div className="trailer-shell top" style={{marginTop:12}}>
      <div className="nose-label">NOSE</div>
      <div className="capacity-zone">Open<br/>Capacity</div>
      {items.map(item => (
        <motion.div
          key={item.id}
          className={`freight-block ${item.locked ? 'locked' : item.newLoad ? 'new' : 'valid'} ${item.invalid ? 'invalid' : ''} ${item.manual ? 'manual' : ''}`}
          drag={!item.locked}
          dragMomentum={false}
          dragConstraints={{left:-item.x, right:BED_W-item.x-item.w, top:-item.y, bottom:BED_H-item.y-item.d}}
          onTap={()=>setSelected(item.id)}
          onDragEnd={(_,info)=>{
            if (item.locked) return
            const x = Math.max(0, Math.min(BED_W-item.w, snap(item.x + info.offset.x)))
            const y = Math.max(0, Math.min(BED_H-item.d, snap(item.y + info.offset.y)))
            moveItem(item.id, {x,y})
          }}
          whileDrag={{scale:1.04, zIndex:5}}
          style={{left:item.x, top:item.y, width:item.w, height:item.d, opacity:item.ghost ? .52 : 1}}
        >
          <span>{item.label}</span>
          {item.locked && <span className="lock-badge"><Lock size={12}/></span>}
        </motion.div>
      ))}
    </div>
  )
}

function RearView({items}) {
  const sorted = [...items].sort((a,b)=>a.x-b.x)
  return (
    <div className="rear-scene" style={{marginTop:12}}>
      <div className="rear-door-frame" />
      <div className="clearance">INTERNAL CLEARANCE</div>
      <div className="rear-floor" />
      {sorted.map((item,idx) => {
        const left = 42 + (idx % 4) * 70
        const height = Math.max(42, Math.min(168, item.h * 1.75))
        const bottom = 55 + Math.floor(idx / 4) * 58
        return (
          <div
            key={item.id}
            className={`rear-box ${item.locked ? 'locked' : item.newLoad ? 'new' : ''}`}
            style={{left, bottom, width: Math.max(46, item.w*.82), height}}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

function SideView({items}) {
  const sorted = [...items].sort((a,b)=>a.y-b.y)
  return (
    <div className="side-scene" style={{marginTop:12}}>
      <div className="side-trailer" />
      <div className="side-floor" />
      {sorted.map(item => (
        <div
          key={item.id}
          className={`side-box ${item.locked ? 'locked' : item.newLoad ? 'new' : ''}`}
          style={{
            left: 28 + item.y*.78,
            bottom: 105,
            width: item.d*.72,
            height: Math.max(34, item.h*1.05)
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

function PerspectiveView({items}) {
  return (
    <div className="perspective-scene" style={{marginTop:12}}>
      <div className="iso-stage">
        <div className="iso-floor" />
        <div className="iso-wall" />
        {items.map(item => {
          const w = item.w*.7
          const d = item.d*.62
          const h = Math.max(24, item.h*.55)
          return (
            <div
              key={item.id}
              className={`iso-cube ${item.locked ? 'locked' : item.newLoad ? 'new' : ''} ${item.invalid ? 'invalid' : ''}`}
              style={{left:item.x*.68, top:item.y*.55, width:w, height:d, transform:`translateZ(${h}px)`}}
            >
              <div className="front" style={{width:w, height:h, transform:`translateY(${d-h}px)`}} />
              <div className="top" style={{width:w, height:d}} />
              <div className="side" style={{width:d, height:h, left:w-d, transform:`rotateY(90deg) translateZ(${d}px) translateY(${d-h}px)`}} />
            </div>
          )
        })}
      </div>
      <div className="pill" style={{position:'absolute',left:15,bottom:15}}>45° trailer volume view</div>
    </div>
  )
}

function NewLoadModal({close}) {
  return (
    <motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="modal-card" initial={{y:40}} animate={{y:0}} exit={{y:40}}>
        <h2>Create New Load</h2>
        <p className="subtitle">Choose how you want to build the freight list.</p>
        <button className="primary" style={{width:'100%', marginTop:14}}><Upload size={18}/> Upload BOL / Rate Con / CSV</button>
        <button className="secondary" style={{width:'100%', marginTop:10}}><PencilRuler size={18}/> Enter Pallet Measurements</button>
        <div className="card">
          <div className="title">Manual fields</div>
          <p className="subtitle">Length, width, height, weight, quantity, stackable, rotation allowed, delivery stop.</p>
        </div>
        <button className="danger" style={{width:'100%', marginTop:10}} onClick={close}>Cancel</button>
      </motion.div>
    </motion.div>
  )
}

function OpportunitiesModal({close,openPlanner}) {
  const list = sortOpps(opportunities)
  return (
    <motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="modal-card" initial={{y:40}} animate={{y:0}} exit={{y:40}}>
        <div className="row">
          <h2>All Capacity Matches</h2>
          <button className="danger" onClick={close}><X size={16}/> Close</button>
        </div>
        <p className="subtitle">Sorted by total revenue, rearrangement effort, then route detour.</p>
        {list.map(o => (
          <div className="card" key={o.id}>
            <div className="row">
              <div>
                <div className="title">{o.title}</div>
                <div className="muted">{o.route} | {o.effort}</div>
              </div>
              <span className="pill">+<Money value={o.revenue}/></span>
            </div>
            <p className="subtitle" style={{marginTop:8}}>{o.dims} • {o.confidence}% confidence</p>
            <button className="primary" style={{width:'100%', marginTop:10}} onClick={()=>openPlanner('partial',o,loads[0])}>Review</button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function Toast({text}) {
  return (
    <motion.div className="toast" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
      <div className="title">{text}</div>
    </motion.div>
  )
}

function Garage(){
  return (
    <>
      <Header kicker="Vehicle Platform" title="Truck Garage" subtitle="Verified Digital Twins for every cargo space."/>
      <div className="content">
        <div className="card hero">
          <div className="row"><span className="pill">Verified Digital Twin</span><Truck/></div>
          <div>
            <h2>{truck.name}</h2>
            <p className="subtitle">{truck.type} • Interior {truck.interior}</p>
          </div>
        </div>
        <div className="card"><div className="metric-line"><span className="muted">Payload limit</span><strong>{truck.payloadLimit.toLocaleString()} lbs</strong></div></div>
        <div className="card"><div className="metric-line"><span className="muted">Fuel estimate basis</span><strong>{truck.mpg} MPG @ ${truck.gasPrice}/gal</strong></div></div>
      </div>
    </>
  )
}

function Cargo(){
  return (
    <>
      <Header kicker="Freight Platform" title="Cargo Library" subtitle="Reusable freight profiles with dimensions, weight, and rules."/>
      <div className="content">
        {cargoTemplates.map(c => (
          <div className="card" key={c.name}>
            <div className="row"><Boxes/><span className="pill">{c.rules}</span></div>
            <h2>{c.name}</h2>
            <p className="subtitle">{c.dims} • {c.weight}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function Profile(){
  return (
    <>
      <Header kicker="Identity Platform" title="Profile" subtitle="Account, role, settings, and support."/>
      <div className="content">
        {['Owner-Operator Role','Offline Sync','Units of Measure','Subscription','Support','Privacy'].map(x => (
          <div className="card" key={x}><div className="row"><div className="title">{x}</div><span>›</span></div></div>
        ))}
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
