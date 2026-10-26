'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLang } from '@/lib/i18n';
import { MagazineCharacter } from './character/MagazineCharacter';
import { type Pose } from './character/poses';
import s from './magazine.module.css';

const scenes = [
 {id:'cover',fr:'La couverture',en:'The cover',title:['Parce qu’il\ny a toujours','un moyen.'],english:['Because there’s always','a way.'],body:'Comprendre ce qui bloque. Trouver une direction. Fabriquer de quoi avancer.',bodyEn:'Understand what stands in the way. Find a direction. Make the next step possible.',href:'#regard',cta:'Ouvrir le numéro',ctaEn:'Open the issue'},
 {id:'regard',fr:'Le regard',en:'The eye',title:['Avant de diriger,','regarder.'],english:['Before directing,','look.'],body:'Les gens, les détails, ce qui se joue entre deux instants. C’est souvent là que tout commence.',bodyEn:'People, details, what happens between two moments. Often, that is where it all begins.',href:'/galerie',cta:'Entrer dans la galerie',ctaEn:'Enter the gallery'},
 {id:'direction',fr:'La direction',en:'The direction',title:['Faire tenir','l’ensemble.'],english:['Make it all','come together.'],body:'Une idée, une équipe, des images. Trouver le fil et l’emmener jusqu’au bout.',bodyEn:'An idea, a team, images. Find the thread and follow it through.',href:'/work',cta:'Voir les projets',ctaEn:'See the projects'},
 {id:'fabrique',fr:'La fabrique',en:'The making',title:['Fabriquer','ce qui manque.'],english:['Make','what’s missing.'],body:'Parfois, la pièce qui manque est un outil. Alors je le construis.',bodyEn:'Sometimes the missing piece is a tool. So I build it.',href:'#fabrique',cta:'Explorer la fabrique',ctaEn:'Explore the making'},
] as const;
const thumbs=['/work/galerie-pixieset/03-lydol-portrait.jpg','/work/cases/friesland-campina/02.webp','/studio/la-barre.svg'];
export function MagazineHero(){
 const {lang}=useLang(), fr=lang==='fr';
 const [index,setIndex]=useState(0), [paused,setPaused]=useState(false),[offscreen,setOffscreen]=useState(false);
 const section=useRef<HTMLElement>(null),touch=useRef<{x:number;y:number}|null>(null),exited=useRef(false);
 const reduced=useReducedMotion();
 const scene=scenes[index]??scenes[0], title=fr?scene.title:scene.english;
 const go=(n:number)=>setIndex((n+scenes.length)%scenes.length);
 useEffect(()=>{
  const el=section.current;if(!el)return;
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry)return;
   const outside=!entry.isIntersecting;
   setOffscreen(outside||document.hidden);
   if(outside&&!exited.current&&entry.boundingClientRect.top<0)window.dispatchEvent(new Event('xtincell:hero-exit'));
   exited.current=outside;
  },{threshold:0});
  observer.observe(el);
  const visibility=()=>setOffscreen(document.hidden||el.getBoundingClientRect().bottom<0);
  document.addEventListener('visibilitychange',visibility);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
 },[]);
 return <section ref={section} id="top" className={s.hero} lang={lang} data-slide={scene.id} aria-label={fr?'Quatre facettes':'Four facets'} aria-roledescription={fr?'carrousel':'carousel'} tabIndex={0}
  onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}}}
  onTouchStart={e=>{const t=e.touches[0];if(t)touch.current={x:t.clientX,y:t.clientY};}}
  onTouchEnd={e=>{const t=e.changedTouches[0],start=touch.current;if(t&&start&&Math.abs(t.clientX-start.x)>60&&Math.abs(t.clientY-start.y)<50)go(index+(t.clientX<start.x?1:-1));touch.current=null;}}>
  <div className={s.masthead} aria-label="Xtincell"><svg viewBox="0 0 1400 210" role="img" aria-label="XTINCELL"><text x="0" y="176" textLength="1400" lengthAdjust="spacingAndGlyphs">XTINCELL</text></svg></div>
  <div className={s.edition}><span>{fr?'FOLIO PERSONNEL':'PERSONAL PORTFOLIO'} · N°01</span><span>DOUALA · 2026</span><span>{String(index+1).padStart(2,'0')} / 04</span></div>
  <div className={s.stage}>
   <div className={s.identity}><strong>Alexandre<br/>Djengue</strong><span>{fr?'DIRECTEUR ARTISTIQUE':'ART DIRECTOR'}</span><i/></div>
   <AnimatePresence mode="wait" initial={false}><motion.div className={s.copy} key={scene.id} initial={{opacity:0,y:reduced?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:reduced?0:.2}}>
    <p className={s.chapter}>{index>0?`0${index} / ${fr?scene.fr:scene.en}`:fr?'Le fil d’un parcours':'The thread of a journey'}</p>
    <h1>{title[0]}<br/><em>{title[1]}</em></h1>
    <p className={s.body}>{fr?scene.body:scene.bodyEn}</p>
    <Link className={s.cta} href={scene.href}>{fr?scene.cta:scene.ctaEn}<span aria-hidden="true">↗</span></Link>
   </motion.div></AnimatePresence>
   <div className={s.photoStory} aria-hidden={scene.id!=='regard'} data-visible={scene.id==='regard'}><img src="/work/galerie-pixieset/03-lydol-portrait.jpg" alt={fr?'Lydol sur scène, photographie par Alexandre Djengue':'Lydol on stage, photographed by Alexandre Djengue'}/><small>LYDOL · LE REGARD</small></div>
   <div className={s.campaign} aria-hidden={scene.id!=='direction'} data-visible={scene.id==='direction'}><img src="/work/cases/friesland-campina/02.webp" alt={fr?'Campagne Bonnet Rouge — création avec MATANGA':'Bonnet Rouge campaign — artwork with MATANGA'}/><small>BONNET ROUGE / MATANGA</small></div>
   <div className={s.character}><MagazineCharacter pose={scene.id as Pose} paused={paused||offscreen} board={<div className={s.board}><div><span>LA FABRIQUE</span><b>La Barre.</b><p>{fr?'Donner une direction. Garder le fil.':'Set a direction. Keep the thread.'}</p></div><img src="/studio/la-barre.svg" alt=""/><small>{fr?'Schéma conceptuel · outil en construction':'Conceptual diagram · work in progress'}</small></div>}/></div>
  </div>
  <div className={s.bottom}>
   <div className={s.chapters}>{scenes.slice(1).map((item,i)=><button type="button" key={item.id} onClick={()=>go(i+1)} aria-pressed={index===i+1} aria-label={`${fr?'Afficher':'Show'} ${fr?item.fr:item.en}`}><img src={thumbs[i]} alt=""/><span><small>0{i+1} /</small>{fr?item.fr:item.en}<i aria-hidden="true">↗</i></span></button>)}</div>
   <div className={s.controls}><button type="button" onClick={()=>go(0)} aria-label={fr?'Revenir à la couverture':'Back to cover'} className={s.home}>⌂</button><span aria-live="polite" aria-atomic="true">0{index+1} / 04</span><button type="button" onClick={()=>go(index-1)} aria-label={fr?'Vue précédente':'Previous view'}>←</button><button type="button" onClick={()=>go(index+1)} aria-label={fr?'Vue suivante':'Next view'}>→</button><button type="button" aria-pressed={paused} aria-label={fr?(paused?'Reprendre les animations':'Mettre les animations en pause'):(paused?'Resume animations':'Pause animations')} onClick={()=>setPaused(!paused)}>{paused?'▷':'Ⅱ'}</button></div>
  </div>
 </section>;
}
