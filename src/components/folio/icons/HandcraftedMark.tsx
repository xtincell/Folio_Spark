/**
 * HandcraftedMark — a faceted, hand-cut spark.
 * Signals the « fait main / human-crafted » offers (high-value, bespoke), as
 * opposed to the ⚡ AI-powered ones. On-brand with « de la poussière à l'étoile ».
 */
export function HandcraftedMark({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* four-point cut star */}
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      {/* facets — the "cut by hand" detail */}
      <path d="M12 12 L14 10 M12 12 L14 14 M12 12 L10 14 M12 12 L10 10" opacity="0.7" />
    </svg>
  );
}
