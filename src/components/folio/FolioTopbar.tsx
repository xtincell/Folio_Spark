'use client';
import { StudioHeader } from '@/components/studio/Studio';
type Active = 'accueil' | 'folio' | 'galerie' | 'cv' | 'design' | 'tech' | 'tarifs' | 'recrutement';
export function FolioTopbar(_props: { label?: string; active: Active }) { return <StudioHeader />; }
