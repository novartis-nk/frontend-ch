// File: src/pages/[[...catchall]].tsx

import * as React from 'react';
import {
  PlasmicComponent,
  ComponentRenderData,
  PlasmicRootProvider,
} from '@plasmicapp/loader-nextjs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';

// This assumes you have a `plasmic-loader.ts` file in your `src` directory.
// If it's somewhere else, you may need to adjust the path.
import { PLASMIC } from '../plasmic-loader';

// The props that will be passed to our page component
interface PlasmicPageProps {
  plasmicData?: ComponentRenderData;
}

// This is the React component that will be rendered for each page
export default function PlasmicPage({ plasmicData }: PlasmicPageProps) {
  // If no page data was found in Plasmic, render a 404 error
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }

  // Get the name of the component to render
  const pageMeta = plasmicData.entryCompMetas[0];

  return (
    // The PlasmicRootProvider makes the Plasmic data available to all components
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
    >
      <PlasmicComponent component={pageMeta.name} />
    </PlasmicRootProvider>
  );
}

// This function runs at build time to fetch the data for a specific page
export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};
  
  // Convert the URL path into a string Plasmic can understand
  const plasmicPath =
    typeof catchall === 'string'
      ? catchall
      : Array.isArray(catchall)
      ? `/${catchall.join('/')}`
      : '/'; // Default to the homepage '/'

  // Fetch the component data from Plasmic
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);

  if (!plasmicData) {
    // If the page doesn't exist in Plasmic, return a 404 error
    return { notFound: true };
  }

  // Pass the data to the page component as props
  return {
    props: {
      plasmicData,
    },
    // This tells Next.js to re-generate the page every 60 seconds
    // to keep it up-to-date with changes in Plasmic Studio.
    revalidate: 60,
  };
};

// This function runs at build time to find all the page paths
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await PLASMIC.fetchPages();
  const paths = pages.map((page) => ({
    params: {
      // The `catchall` parameter is an array of path segments
      catchall: page.path.substring(1).split('/'),
    },
  }));

  return {
    paths,
    // 'blocking' means if a page is not pre-rendered, Next.js will
    // generate it on the first request.
    fallback: 'blocking',
  };
};
