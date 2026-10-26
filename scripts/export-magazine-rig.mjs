// Kept as a compatibility entry point. The rejected bitmap rig is archived.
console.warn('The bitmap rig is archived; exporting the current vector rig instead.');
await import('./export-graphic-rig.mjs');
