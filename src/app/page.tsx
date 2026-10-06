import { StudioHome } from '@/components/studio/StudioHome';
import { PersonJsonLd } from '@/components/folio/PersonJsonLd';
export const metadata = { alternates: { canonical: '/' } };
export default function FolioPage() { return <><PersonJsonLd /><StudioHome /></>; }
