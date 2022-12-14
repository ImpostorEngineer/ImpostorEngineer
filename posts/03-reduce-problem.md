---
title: 'Reduce Problem'
author: 'Impostor Engineer'
date: '2022-12-12'
draft: false
slug: 'reduce-problem'
tags: ['code', 'JavaScript', 'reduce']
banner: '03-reduce-problem.png'
---

I always had this idea to make a [magic mirror](https://magicmirror.builders/). One of the components of that is calendar events. Instead of using the software, I wanted to create my own event lister. I also have the idea to wall-mount a tablet to use as a family calendar. This app will list the calender events and the current weather forecast. Here I share my solution for listing the events under each day. I hope you find it useful!

Minimum Viable Product for the app was: pull `events` data from two calendars, sort them based on their start `datetime`, and list them under each day. I manage to get the calendar data (will make another post about this) from [Google Calendar API](https://developers.google.com/calendar/api/v3/reference/). Sorting was easy. I had to create a new datetime property to sort the events easily.

Hard part was trying to figure out how to group all the events under each day. I don't have formal education in coding. I learned from watching some twitch streamers, youtube videos, and learned how to read manuals. My initial solution was a mess. It had multiple `for` loops and a few objects, but it worked, but it was a mess. Then I somehow remembered the [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) function. I have seen [CodingGarden](https://www.twitch.tv/codinggarden) use it before, come to think of it.

## `Array.prototype.reduce()` Syntax

When you see the word `accumulator`, I thought it only adds values. It can accumulate `objects` too.

```JavaScript
Array.reduce(function (accumulator, currentValue) { /* … */ }, initialValue)
```

Data provided by the Google API looks like this:

```JSON
[{
  "kind": "calendar#events",
  "etag": etag,
  "summary": string,
  "description": string,
  "start": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },
  "end": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },
  ...
},
{
  ...
}]

```

Final solution was beautiful. It took some tries but I got the inspiration from a [freecodecamp.org page](https://www.freecodecamp.org/news/the-ultimate-guide-to-javascript-array-methods-reduce/).

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

This could be obvious for some, but a beginner level coder who doesn't even know what the problem is figuring this out was extremely rewarding.
