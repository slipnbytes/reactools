import { Provider } from '@hitechline/next-mdx/Provider';
import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next';
import React from 'react';

import { getAllDocumentFiles } from '@resources/utils/mdx/getAllDocumentFiles';
import { getDocument } from '@resources/utils/mdx/getDocument';
import type { Document as DocumentType } from '@resources/utils/mdx/types';

const Document = ({ rendered }: DocumentType) => {
  return (
    <div>
      <Provider {...rendered} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  DocumentType,
  {
    slug: string[];
  }
> = async ({ params }) => {
  const document = await getDocument(params.slug);

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

/* eslint react/no-danger: 0 */
