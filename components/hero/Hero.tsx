import { storyblokEditable } from '@storyblok/react';
import React from 'react';
import { SbBlokData } from '@storyblok/js';
import { BlokComponentModel } from '../../types/storyblok';

interface HeroProps extends SbBlokData {
  name: string
}
const Hero: React.FC<BlokComponentModel<HeroProps>> = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    {blok.name}
  </div>
);

export default Hero;
