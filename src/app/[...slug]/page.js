import style from './page.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function CatchAllPage({ params }) {
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        The page you are looking for does not exist. You tried to access: <strong>/{slug.join('/')}</strong>
      </p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
