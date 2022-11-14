import { StoryData } from '@storyblok/react';

const getTranslatedSlug = (story: StoryData) => {
  let name = story.content?.og_title ? story.content.og_title : story.name;
  let { slug } = story;

  const translatedSlug = story.translated_slugs?.find((lang) => lang.lang === story.lang);

  if (translatedSlug) {
    name = translatedSlug?.name ?? story.name;
    slug = translatedSlug?.path;
  }

  return {
    name,
    slug,
  };
};

export default getTranslatedSlug;
