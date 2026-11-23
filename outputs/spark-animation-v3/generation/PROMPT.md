# Génération des dessins de développement

Outil intégré `image_gen.imagegen`. La variante exacte du modèle n’est pas exposée. Référence : `../references/spark-master-nuit.png`.

Use case: precise-object-edit. Asset: a registered 2D effects animation sprite sheet for the exact Spark brand logo in the attached reference.
Generate ONE image with exactly EIGHT square animation cels in an invisible FOUR columns by TWO rows grid, read left to right then next row. Target canvas 2048x1024. No gutters, no dividers, no labels, no text. Each cel has identical square camera and identical logo position and scale, matching the reference composition. The white blade/star/X structure is an invariant tracing of the supplied reference; do not redesign its curves. Navy background #0A0E1A, white #FFFFFF, orange #F05A28, perfectly flat solid fills, normal edge antialiasing, absolutely no glow or texture.

Animate ONLY the THREE orange flames from thin retained streaks into the final logo shapes. Important: three individual connected masses exist in ALL eight cels, always in their three final regions. Never merge them, never spawn new fragments, never switch one into a different flame, never add a ribbon along the white blade. Each flame's LOWER POINT remains at its exact final lower point in the reference throughout all eight cels. The large left flame remains in FRONT of the left white ray; the medium upper-right and small lower-right flames remain BEHIND white. Exactly one smooth tapered upper tip and one pointed lower root per flame; no branches, holes, forks, zigzags, sharp kinks, spurs or detached embers.

The action: white has just decelerated; orange material keeps flowing upward around it, gains body, overtravels very slightly, then settles. Draw beautiful naturally tapered continuous flame curves. Each horizontal slice of each orange mass should be one continuous span (no looped-over tip). Body motion leads the upper tip, which follows with a small delay. Roots stay still, tips can move only modestly. They should feel like ribbons of flame held under tension, not rubber symbols inflating.

Eight ordered drawings:
1. Afterimage: all three flames slender, roughly 15% of final area, 65% of final height. Upper tips extended upward with a fine curve; lower roots already fixed.
2. Drawn inbetween: 30% area, 80% height, widening from roots into curved bodies.
3. Drawn inbetween: 55% area, 93% height; a single smooth bend travels up the large left flame.
4. Drawn inbetween: 80% area, nearly final height; upper tips lag slightly behind bodies.
5. Full expressive flame shapes at 108% area, very slight outward follow-through of upper tips, the reference silhouette still strongly recognizable.
6. The body is settled at 102% area, tips complete their short curved path.
7. Close to final master, 100% area; very small remaining change confined to upper thirds.
8. EXACT orange shapes from the reference image, same final scale and registration, no variation.

White should stay 100% identical in all eight cels. Background remains uniform navy. Prioritize continuity between neighbouring cels and fidelity of the final drawing over spectacular variation. This is a production sprite sheet to be sliced and animated, not a storyboard poster.
