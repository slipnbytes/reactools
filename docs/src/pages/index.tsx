import React from 'react';

import Overview from '@/markdown/index.mdx';

import { SEO } from '@components/forward/SEO';

const Home = () => (
  <>
    <SEO description="Create React interfaces is easy." title="Reactools" />

    <div className="markdown">
      <Overview />
    </div>
  </>
);

export default Home;
