import React from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { SbBlokData } from '@storyblok/js';
import { BlokComponentModel } from '../../types/storyblok';

interface PageStoryProps extends SbBlokData {
  body: SbBlokData[];
}

const PageStory: React.FC<BlokComponentModel<PageStoryProps>> = (props) => {
  const { blok } = props;
  return (
    <main {...storyblokEditable(blok)}>
      {blok?.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default PageStory;
