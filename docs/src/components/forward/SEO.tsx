import Head from 'next/head';
import { useRouter } from 'next/router';

import { APP_URL } from '@resources/utils/constants';
import { makeUrl } from '@resources/utils/makeUrl';

interface Props {
  url?: string;
  title?: string;
  image?: string;
  description?: string;
}

export const SEO = ({
  url,
  children,
  title = 'Reactools',
  image = '/img/meta.png',
  description = 'React utilities to facilitate development.',
}: PropsWithChildren<Props>): JSX.Element => {
  const router = useRouter();

  const metaImage = makeUrl(image);
  const canonical = makeUrl(url ?? router.asPath);

  return (
    <Head>
      <title>{title}</title>

      <link rel="canonical" href={canonical} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <link itemProp="url" href={APP_URL} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />

      <meta name="image" content={metaImage} />
      <meta name="description" content={description} />

      {/* OpenGraph */}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Reactools" />

      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />

      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />

      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />

      {/* Twitter */}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:src" content={metaImage} />

      <meta name="twitter:site" content="@hitechline" />
      <meta name="twitter:creator" content="@hitechline" />
      <meta name="twitter:card" content="summary_large_image" />

      {children}
    </Head>
  );
};
