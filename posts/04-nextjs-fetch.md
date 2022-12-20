---
title: 'NextJS Data Fetch'
author: 'Impostor Engineer'
date: '2022-12-19'
draft: false
slug: 'nextjs-fetch'
tags: ['code', 'JavaScript', 'nextjs', 'fetch']
banner: '04-nextjs-fetch.png'
---

Here is an example of `useEffect` usage for API data fetch. In this blog I'm using data from external data sources. I didn't want to create a server-side fetch.

```JavaScript
import Head from 'next/head';
import Layout from '../../components/layout';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

export default function Chart() {
  const [dataJSON, setData] = useState(null);

  useEffect(() => {
    fetch('https://www.externalwebsite.com/api/data')
      .then((res) => res.json())
      .then((data) => setData(data)); // You can also apply some functions to the data.
      // I created a function to convert the data to be used in ApexCharts.
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
    <CreateChart data={dataJSON.data} options={dataJSON.dataOptions} type={'line'} height={500} />
    </section>
  </Layout>
)
```
