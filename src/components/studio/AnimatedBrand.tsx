'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FlameMark } from '@/components/folio/FlameMark';
import s from './brand.module.css';
export function AnimatedBrand(){
 const [pulse,setPulse]=useState(false);
 useEffect(()=>{let timer:ReturnType<typeof setTimeout>;const play=()=>{setPulse(true);clearTimeout(timer);timer=setTimeout(()=>setPulse(false),1100);};window.addEventListener('xtincell:hero-exit',play);return()=>{clearTimeout(timer);window.removeEventListener('xtincell:hero-exit',play);};},[]);
 return <Link href="/" className={s.brand} data-pulse={pulse} aria-label="Alexandre Djengue — accueil"><FlameMark size={32} animated={false}/><span>Xtincell</span></Link>;
}
