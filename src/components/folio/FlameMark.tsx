import { SparkMark } from './icons/SparkMark';

type FlameMarkProps = {
  size?: number;
  animated?: boolean;
  white?: boolean;
};

export function FlameMark({ size = 64, animated = true, white = false }: FlameMarkProps) {
  return <SparkMark size={size} animated={animated} mono={white} />;
}
