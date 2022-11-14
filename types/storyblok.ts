import StoryData from "storyblok-js-client";

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type Links = {
  data: {
    links: {
      [key: string]: {
        slug: string
        is_folder: boolean
      }
    }
  }
};

export interface BlokComponentModel<T> {
  blok: T,
  stories?: StoryData[]
}