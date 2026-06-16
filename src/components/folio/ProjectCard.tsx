'use client';

import styles from '@/styles/home.module.css';
import type { Project } from './data/practices';
import { AgencyChain } from './AgencyChain';
import { ProofEmbed } from './ProofEmbed';
import { useT, useLang, pick } from '@/lib/i18n';

type ProjectCardProps = {
  p: Project;
  accent: string;
};

export function ProjectCard({ p, accent }: ProjectCardProps) {
  const t = useT();
  const { lang } = useLang();
  return (
    <article className={styles.proj}>
      <div className={styles.projHead}>
        <h4 className={styles.projName}>{p.name}</h4>
        <span className={styles.projMeta}>{pick(p.meta, lang)}</span>
      </div>
      <div className={styles.projRole} style={{ color: accent }}>{pick(p.role, lang)}</div>
      {p.chain && p.chain.length > 0 && <AgencyChain chain={p.chain} />}
      <p className={styles.projBody}>{pick(p.body, lang)}</p>
      <div className={styles.projTags}>
        {p.tags.map((tag) => (
          <span className={styles.projTag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {p.proofs && p.proofs.length > 0 && (
        <div className={styles.projProofs}>
          <div className={styles.proofsLabel} style={{ color: accent }}>
            <span className={styles.proofsDot} style={{ background: accent }} />
            {t.proof.label}
          </div>
          <div className={styles.proofsGrid}>
            {p.proofs.map((pr, i) => (
              <ProofEmbed key={`${pr.url}-${i}`} pr={pr} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
