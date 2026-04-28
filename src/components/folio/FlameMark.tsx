import Image from 'next/image';
import styles from '@/styles/home.module.css';

type FlameMarkProps = {
  size?: number;
  animated?: boolean;
  white?: boolean;
};

export function FlameMark({ size = 64, animated = true, white = false }: FlameMarkProps) {
  return (
    <Image
      src={white ? '/logo-spark-white.png' : '/logo-spark.png'}
      width={size}
      height={size}
      alt="Xtincell"
      className={animated ? styles.flameAnim : ''}
      style={{ display: 'inline-block', objectFit: 'contain' }}
      priority={false}
    />
  );
}
