import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
import { ISbStoriesParams } from 'storyblok-js-client/types/interfaces';
import { notFound } from 'next/navigation';
import { Links, PageProps } from '../../../types/storyblok';
import getTranslatedSlug from '../../../utils/get-translated-slug';

async function fetchData(params: { slug: string[], locale: string }) {
  const slug = params.slug.join('/');
  const language: string = params.locale;

  if (slug === 'home') {
    notFound();
  }

  const sbParams: ISbStoriesParams = {
    version: 'draft',
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}?language=${language}`, sbParams);

  if (!data) {
    notFound();
  }

  return {
    story: data ? data.story : false,
  };
}

export default async function Page({ params }: PageProps) {
  const { story } = await fetchData(params);
  const { name } = getTranslatedSlug(story);

  return (
    <div>
      <StoryblokComponent blok={story.content} />
      {name}
    </div>
  );
}

export async function generateStaticParams({ locales }: {
  locales: string[],
}) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/links/') as Links;

  const paths: Array<{ params: { slug: Array<string> }, locale: string }> = [];

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return;
    }

    const link = data.links[linkKey];

    const slug = (link.slug === 'home') ? [''] : link.slug.split('/');

    if (locales && link.slug.split('/')[0] !== 'c') {
      locales.map((locale) => paths.push({ params: { slug }, locale }));
    }
  });

  return paths;
}
