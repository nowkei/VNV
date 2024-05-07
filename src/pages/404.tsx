import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after a delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // 5 seconds delay before redirecting

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you requested could not be found. You will be redirected to the
        home page shortly.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
