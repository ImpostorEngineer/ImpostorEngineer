import React from 'react';
import Image from 'next/image';
import { createElement } from 'react';
import * as prod from 'react/jsx-runtime';
import { unified } from 'unified';
import reactRehyped from 'rehype-react';
import rehypeParse from 'rehype-parse';

const components = {
  html: ({ children }) => <>{children}</>,
  body: ({ children }) => <>{children}</>,
  head: ({ children }) => <>{children}</>,
  img: (imgProps) => {
    const { src, ...restOfImgProps } = imgProps;
    if (src.startsWith('http')) {
      return <img src={src} {...restOfImgProps} />;
    }
    return <Image className='' src={src} {...restOfImgProps} />;
  },
};

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: components,
  createElement: createElement,
};

export function CustomMDX({ source }) {
  return unified().use(rehypeParse).use(reactRehyped, production).processSync(source).result;
}
