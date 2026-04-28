import { Fragment } from 'react';
import styles from '@/styles/home.module.css';
import { AgencyTooltip } from './AgencyTooltip';

export function AgencyChain({ chain }: { chain: string[] }) {
  if (!chain || chain.length === 0) return null;
  const last = chain.length - 1;
  return (
    <div className={styles.projChain} aria-label="Chaîne de collaboration">
      {chain.map((node, i) => {
        const cls = [
          styles.chainNode,
          i === 0 ? styles.chainNodeClient : '',
          i === last && chain.length > 1 ? styles.chainNodeSelf : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <Fragment key={`${node}-${i}`}>
            <AgencyTooltip name={node}>
              <span className={cls}>{node}</span>
            </AgencyTooltip>
            {i < last && <span className={styles.chainArrow} aria-hidden="true">←</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
