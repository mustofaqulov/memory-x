
import { T } from '@/components/preferences';
import Link from 'next/link';
export default function NotFound() { return <div className="page-head"><p className="eyebrow"><T text={"Sahifa topilmadi"} /></p><h1 style={{fontSize:38}}><T text={"Bu manzil mavjud emas"} /></h1><p className="lead"><T text={"Havolani tekshiring yoki boshqaruv sahifasiga qayting."} /></p><Link className="btn" href="/dashboard"><T text={"Boshqaruvga qaytish"} /></Link></div>; }
