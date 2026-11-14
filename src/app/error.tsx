'use client';
import { T } from '@/components/preferences';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) { return <div className="page-head" role="alert"><p className="eyebrow"><T text={"Xatolik"} /></p><h1 style={{fontSize:38}}><T text={"Sahifani ochib bo‘lmadi"} /></h1><p className="lead"><T text={"Aloqani tekshirib, qayta urinib ko‘ring. Saqlangan natijalaringiz o‘chmaydi."} /></p><button className="btn" type="button" onClick={reset}><T text={"Qayta urinish"} /></button></div>; }
