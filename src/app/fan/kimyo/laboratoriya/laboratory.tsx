'use client';

import { useActionState, useState } from 'react';
import { Atom, Check, FlaskConical, Lightbulb, LockKeyhole, Minus, Plus, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { elements, kindLabels } from '@/lib/chemistry/content';
import { combineElements, type LabState } from './actions';

type Challenge = { id: string; name: string; hint: string };
type CollectionItem = { id: string; formula: string; name: string };
const initialState: LabState = { status: 'idle', message: '' };

export function Laboratory({ initialDiscoveries, challenges, initialCollection }: { initialDiscoveries: string[]; challenges: Challenge[]; initialCollection: CollectionItem[] }) {
  const [state, action, pending] = useActionState(combineElements, initialState);
  const [slots, setSlots] = useState([{ symbol: '', count: 1 }, { symbol: '', count: 1 }]);
  const [activeSlot, setActiveSlot] = useState(0);
  const [target, setTarget] = useState('');
  const [showHint, setShowHint] = useState(false);
  const known = state.discoveredIds ?? initialDiscoveries;
  const collection = state.collection ?? initialCollection;
  const challenge = challenges.find(item => item.id === target);
  const nextChallenge = challenges.find(item => !known.includes(item.id));
  function choose(symbol: string) {
    setSlots(current => current.map((slot, index) => index === activeSlot ? { ...slot, symbol } : slot));
    if (activeSlot === 0) setActiveSlot(1);
  }
  function changeCount(index: number, amount: number) {
    setSlots(current => current.map((slot, i) => i === index ? { ...slot, count: Math.min(4, Math.max(1, slot.count + amount)) } : slot));
  }
  function reset() { setSlots([{ symbol: '', count: 1 }, { symbol: '', count: 1 }]); setActiveSlot(0); }
  function selectChallenge(id: string) { setTarget(id); setShowHint(false); reset(); }

  return <div className="lab">
    <header className="lab-game-header">
      <div className="lab-game-icon"><Atom size={36} aria-hidden="true" /></div>
      <div><p className="eyebrow">Kashfiyot sarguzashti</p><h2>Har bir atom — yangi imkoniyat</h2><p>Elementlarni birlashtiring. Formulalarni oching. Kimyo ustasi bo‘ling.</p></div>
      <div className="lab-rank"><Trophy size={22} aria-hidden="true" /><span>{known.length === challenges.length ? 'Kimyo ustasi' : known.length >= 7 ? 'Tadqiqotchi' : known.length >= 3 ? 'Kashfiyotchi' : 'Yosh olim'}<small>{known.length} / {challenges.length} kashfiyot</small></span></div>
    </header>
    <div className="lab-toolbar">
      <label className="lab-mode"><span>O‘yin rejimi</span><select value={target} onChange={event => selectChallenge(event.target.value)} disabled={pending}>
        <option value="">Erkin kashfiyot</option>{challenges.map(item => <option value={item.id} key={item.id}>Topshiriq: {item.name}{known.includes(item.id) ? ' ✓' : ''}</option>)}
      </select></label>
      <div className="lab-progress"><span><Sparkles size={18} /> Kashfiyotlar <strong>{known.length}/{challenges.length}</strong></span><progress value={known.length} max={challenges.length} aria-label="Ochilgan formulalar" /></div>
    </div>
    {challenge ? <section className="lab-mission"><div><p className="eyebrow">Topshiriq</p><h2>{challenge.name} formulasini tuzing</h2><p>Kerakli elementlar va atomlar sonini toping.</p></div><button className="btn secondary" type="button" onClick={() => setShowHint(!showHint)} aria-expanded={showHint}><Lightbulb size={18} /> {showHint ? 'Yordamni yopish' : 'Yordam'}</button>{showHint && <p className="lab-hint">{challenge.hint}</p>}</section> : <p className="lab-intro"><Lightbulb size={19} /> Boshlash uchun vodorod va kislorodni tanlang. Yoki bir xil elementni ikkala katakka qo‘ying!</p>}
    <div className="lab-workspace">
      <section className="lab-elements" aria-label="Elementlar kutubxonasi"><div className="lab-section-title"><h2>Elementlar</h2><span>{activeSlot + 1}-katakka tanlang</span></div>
        <div className="lab-element-grid">{elements.map(element => <button className={`lab-element ${element.family === 'Metall' ? 'lab-metal' : element.family === 'Inert gaz' ? 'lab-noble' : ''}`} type="button" key={element.symbol} onClick={() => choose(element.symbol)} disabled={pending} aria-label={`${element.name} (${element.symbol})`}><small>{element.number}</small><strong>{element.symbol}</strong><span>{element.name}</span><em>{element.family}</em></button>)}</div>
        <p className="lab-helper">Elementni bosing — u faol katakka tushadi. Bir xil elementni qayta tanlash mumkin.</p>
      </section>
      <section className="lab-bench"><div className="lab-section-title"><h2><FlaskConical size={22} /> Formula ustaxonasi</h2><button type="button" className="lab-reset" onClick={reset} disabled={pending} aria-label="Tanlovni tozalash"><RotateCcw size={19} /></button></div>
        <form action={action}>
          <input type="hidden" name="target" value={target} />
          <div className="lab-slots">{slots.map((slot, index) => <div className={`lab-slot ${activeSlot === index ? 'is-active' : ''}`} key={index}>
            <input type="hidden" name={index === 0 ? 'first' : 'second'} value={slot.symbol} /><input type="hidden" name={index === 0 ? 'firstCount' : 'secondCount'} value={slot.count} />
            <button className="lab-slot-pick" type="button" aria-pressed={activeSlot === index} onClick={() => setActiveSlot(index)} disabled={pending}><small>{index + 1}-katak</small><strong>{slot.symbol || <Plus size={32} />}</strong><span>{elements.find(item => item.symbol === slot.symbol)?.name ?? 'Element tanlang'}</span></button>
            <div className="lab-counter"><button type="button" onClick={() => changeCount(index, -1)} disabled={pending || slot.count === 1} aria-label={`${index + 1}-katak: atomni kamaytirish`}><Minus size={17} /></button><output aria-live="polite">{slot.count}</output><button type="button" onClick={() => changeCount(index, 1)} disabled={pending || slot.count === 4} aria-label={`${index + 1}-katak: atomni ko‘paytirish`}><Plus size={17} /></button></div><small className="lab-atom-label">atom soni</small>
          </div>)}</div>
          <div className="lab-atom-preview" aria-label="Tanlangan atomlar">{slots.map((slot, index) => Array.from({ length: slot.symbol ? slot.count : 0 }, (_, atom) => <span key={`${index}-${atom}`} className={`lab-atom lab-atom-${index}`}>{slot.symbol}</span>))}{!slots.some(slot => slot.symbol) && <span className="lab-placeholder"><Atom size={20} /> Atomlaringiz shu yerda ko‘rinadi</span>}</div>
          <button className="btn lab-submit" disabled={pending || slots.some(slot => !slot.symbol)} type="submit"><Sparkles size={19} /> {pending ? 'Tekshirilmoqda…' : 'Formulani tuzish'}</button>
        </form>
        <div className={`lab-result lab-result-${state.status}`} role="status" aria-live="polite" aria-atomic="true">
          {state.status === 'idle' ? <p>Natija shu yerda ko‘rinadi. Formuladagi kichik son — o‘sha element atomlari soni.</p> : <><p className="eyebrow">Oxirgi tekshiruv</p>{state.recipe && <><div className="lab-formula">{state.recipe.formula}</div><h3>{state.recipe.name}</h3><span className="chip">{kindLabels[state.recipe.kind as keyof typeof kindLabels]}</span></>}<p>{state.message}</p>{state.recipe && <p className="lab-saved"><Check size={17} /> Kashfiyot hisobingizda saqlandi.</p>}{state.targetReached && state.recipe?.id === target && <p className="lab-saved">Topshiriq bajarildi!</p>}{target && state.recipe && state.recipe.id !== target && <p>Bu boshqa modda. Joriy topshiriq: {challenge?.name}.</p>}</>}
        </div>
        {nextChallenge ? <button className="btn secondary lab-next" type="button" disabled={pending} onClick={() => selectChallenge(nextChallenge.id)}>Keyingi topshiriq: {nextChallenge.name} →</button> : <p className="lab-complete"><Sparkles size={20} /> Barcha {challenges.length} formula ochildi! Erkin rejimda bilimlaringizni yana sinang.</p>}
      </section>
    </div>
    <section className="lab-collection"><div className="lab-section-title"><h2>Formulalar to‘plamim</h2><span>{known.length} ta ochildi</span></div><p className="lab-helper">Ochilgan formulalar sahifani yangilaganda ham saqlanadi. Kartani bosib shu modda bo‘yicha mashq qiling.</p><div className="lab-collection-grid">{challenges.map(item => {
      const discovered = collection.find(entry => entry.id === item.id);
      return <button className={`lab-collection-card ${discovered ? 'is-discovered' : ''}`} key={item.id} type="button" onClick={() => selectChallenge(item.id)} disabled={pending} aria-label={`${item.name}: ${discovered ? discovered.formula : 'hali ochilmagan'}`}><strong>{discovered?.formula ?? <LockKeyhole size={22} />}</strong><span>{item.name}</span><small>{discovered ? '✓ Ochilgan' : 'Topshiriqni tanlash'}</small></button>;
    })}</div></section>
  </div>;
}
