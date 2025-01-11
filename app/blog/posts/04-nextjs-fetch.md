---
title: 'NextJS Data Fetch'
author: 'Impostor Engineer'
date: '2022-12-19'
draft: false
slug: 'nextjs-fetch'
tags: ['code', 'JavaScript', 'nextjs', 'fetch']
banner: '04-nextjs-fetch.png'
---

Here is an example of `useEffect` usage for API data fetch. In this blog I'm using data from an external data sources. I didn't want to create a server-side fetch. There are other ways to [fetch data in NEXT.js](https://nextjs.org/docs/basic-features/data-fetching/overview) depending on your application's use case. I preferred client-side rendering.

```js
import Head from 'next/head';
import Layout from '../../components/layout';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

export default function Chart() {
  const [dataJSON, setData] = useState(null);

// I'm using an external website, you can use local '/api/data'
  useEffect(() => {
    fetch('https://www.externalwebsite.com/api/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


// Since the dataJSON is set to null, you need to do something until the data loads.
// I chose to display a message, you can create a loading screen here.
if (!dataJSON)
  return (
    <Layout>
      <Head>
        <title>Charts</title>
      </Head>
      <section>
        <h3>Please wait while data loads...</h3>
      </section>
    </Layout>
  );

// This is where you use the dataJSON. I'm using ApexCharts.
return (
  <Layout>
    <Head>
      <title>Charts</title>
    </Head>
    <section>
    <CreateChart data={dataJSON.data} options={dataJSON.dataOptions}
                 type={'line'} height={500} />
    </section>
  </Layout>
)
```
