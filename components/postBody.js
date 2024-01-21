import * as React from 'react';
import Image from 'next/image';
import { unified } from 'unified';
import reactRehyped from 'rehype-react';
import rehypeParse from 'rehype-parse';
import utilStyles from '../styles/utils.module.css';
import Zoom from 'react-medium-image-zoom';

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const components = {
  html: ({ children }) => <>{children}</>,
  body: ({ children }) => <>{children}</>,
  head: ({ children }) => <>{children}</>,
  img: (imgProps) => {
    const { src, ...restOfImgProps } = imgProps;
    if (src.startsWith('http')) {
      return (
        <Zoom>
          <img src={src} {...restOfImgProps} className={utilStyles.postImage} />
        </Zoom>
      );
    }
    return (
      <Zoom classDialog={utilStyles.customZoom}>
        <Image
          className={utilStyles.postImage}
          placeholder='blur'
          blurDataURL={rgbDataURL(102, 102, 102)}
          src={src}
          {...restOfImgProps}
        />
      </Zoom>
    );
  },
};

export default function PostBody({ content }) {
  const contentMD = unified()
    .use(rehypeParse, { fragment: true })
    .use(reactRehyped, { createElement: React.createElement, components: components, production })
    .processSync(content).result;
  return <>{contentMD}</>;
}
