// Healthcheck minimal pour Coolify / Docker (HEALTHCHECK du Dockerfile).
// Un 200 signifie : process Node vivant et routeur Next opérationnel.
export function GET() {
  return Response.json({ status: 'ok' });
}
