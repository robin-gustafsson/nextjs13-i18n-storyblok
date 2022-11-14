import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
import { notFound } from 'next/navigation';
import { PageProps } from '../../types/storyblok';
import getTranslatedSlug from '../../utils/get-translated-slug';

async function fetchData(params: { slug: string[], locale: string }) {
  const slug = 'home';
  const language: string = params.locale;

  const storyblokParams: {
    version: 'draft' | 'published',
    cv?: number
  } = {
    version: 'published',
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}?language=${language}`, storyblokParams);

  if (!data) {
    notFound();
  }

  return {
    story: data ? data.story : false,
  };
}

export default async function Home({ params }: PageProps) {
  const { story } = await fetchData(params);
  const { name: pageTitle } = getTranslatedSlug(story);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
