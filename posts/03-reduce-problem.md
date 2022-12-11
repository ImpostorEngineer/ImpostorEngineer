---
title: 'Reduce Problem'
author: 'Impostor Engineer'
date: '2022-12-12'
draft: false
slug: 'reduce-problem'
tags: ['code', 'JavaScript', 'reduce']
banner: 'news-post-banner.png'
---

I was trying to create a calendar app. I manage to get the calendar data (will make another post about this) from [Google Calendar API](https://developers.google.com/calendar/api/v3/reference/). I have two calendars and need to group the events under each day.

Data provided by the API looks like this:

```JSON
[{
  "kind": "calendar#events",
  "etag": etag,
  "summary": string,
  "description": string,
  "updated": datetime,
  "timeZone": string,
  "accessRole": string,
  "defaultReminders": [
    {
      "method": string,
      "minutes": integer
    }
  ],
  "nextPageToken": string,
  "nextSyncToken": string,
  "items": [
    events Resource
  ]
},
{
  ...
}]

```

I had to figure out how to group events. I wanted to group them by date. My initial solution was a mess. It worked, but it was a mess. Until I figured the [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

Solution was beautiful. It took some tries but I got the inspiration from a [freecodecamp.org page](https://www.freecodecamp.org/news/the-ultimate-guide-to-javascript-array-methods-reduce/).

```JavaScript
const finalListofEvents = data.reduce(function (obj, day) {
    const theday = day.formattedDate;
    if (!obj[theday]) {
      obj[theday] = { events: [day] };
    } else {
      obj[theday]['events'].push(day);
    }
    return obj;
}, {});
```

The output looks like this:

```JSON
finalListofEvents: {
'2022-12-01': {events: [ {...}, {...} ]},
'2022-12-02': {events: [ {...}, {...}, {...} ]},
'2022-12-03': {events: [ {...}, {...} ]}
}
```
