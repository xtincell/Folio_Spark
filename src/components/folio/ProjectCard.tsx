import styles from '@/styles/home.module.css';
import type { Project } from './data/practices';
import { AgencyChain } from './AgencyChain';
import { ProofEmbed } from './ProofEmbed';

type ProjectCardProps = {
  p: Project;
  accent: string;
};

export function ProjectCard({ p, accent }: ProjectCardProps) {
  return (
    <article className={styles.proj}>
      <div className={styles.projHead}>
        <h4 className={styles.projName}>{p.name}</h4>
        <span className={styles.projMeta}>{p.meta}</span>
      </div>
      <div className={styles.projRole} style={{ color: accent }}>{p.role}</div>
      {p.chain && p.chain.length > 0 && <AgencyChain chain={p.chain} />}
      <p className={styles.projBody}>{p.body}</p>
      <div className={styles.projTags}>
        {p.tags.map((t) => (
          <span className={styles.projTag} key={t}>
            {t}
          </span>
        ))}
      </div>
      {p.proofs && p.proofs.length > 0 && (
        <div className={styles.projProofs}>
          <div className={styles.proofsLabel} style={{ color: accent }}>
            <span className={styles.proofsDot} style={{ background: accent }} />
            Preuves vidéo
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
