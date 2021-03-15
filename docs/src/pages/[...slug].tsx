import { Provider } from '@hitechline/next-mdx/provider';
import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next';

import { SEO } from '@components/forward/SEO';

import { getAllDocumentFiles } from '@resources/utils/mdx/getAllDocumentFiles';
import { getDocument } from '@resources/utils/mdx/getDocument';
import type { Document as DocumentType } from '@resources/utils/mdx/types';

const Document = ({ info, rendered }: DocumentType): JSX.Element => (
  <>
    <SEO description={info.description} title={info.title} />

    <div className="markdown">
      <Provider {...rendered} />
    </div>
  </>
);

export const getStaticProps: GetStaticProps<
  DocumentType,
  {
    slug: string[];
  }
> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('"slug" not provided.');
  }

  const document = await getDocument(params?.slug);

  return {
    props: document,
  };
};

type Paths = GetStaticPathsResult['paths'];

export const getStaticPaths: GetStaticPaths = async () => {
  const documents = await getAllDocumentFiles();
  const paths: Paths = documents.map<Paths[number]>(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return { paths, fallback: false };
};

export default Document;
