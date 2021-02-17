import { promises } from 'fs';
import matter from 'gray-matter';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { join } from 'path';
import React from 'react';
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const Document = ({ content }) => {
  return <div>{content}</div>;
};

export async function getStaticProps({ params }) {
  const baseUrl = join(process.cwd(), 'src', 'markdown');
  const documentPath = [].concat(params.slug).join('/');

  const documentFullPath = join(baseUrl, `${documentPath}.mdx`);
  const fileContent = await promises.readFile(documentFullPath, 'utf8');

  const { data, content: markdown } = matter(fileContent);
  const content = await remark().use(html).use(prism).process(markdown);

  return {
    props: {
      data,
      content: content.toString(),
    },
  };
}

export async function getStaticPaths() {
  const baseUrl = join(process.cwd(), 'src', 'markdown');

  const files = await promises.readdir(baseUrl);

  const paths = files.map(path => ({
    params: {
      slug: [path.replace(/\.mdx/, '')],
    },
  }));

  return { paths, fallback: false };
}

export default Document;
