import { getBlogIndex } from '@/lib/wordpress';

export const metadata = { alternates: { canonical: '/upgraders' } };
import { UpgradersClient } from './UpgradersClient';

export default async function UpgradersPage() {
  const { posts: latestPosts } = await getBlogIndex({ perPage: 3 });
  return <UpgradersClient latestPosts={latestPosts} />;
}
