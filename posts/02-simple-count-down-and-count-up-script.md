---
title: 'Simple Count Down and Count Up JavaScript Examples'
author: 'Impostor Engineer'
date: '2022-12-10'
draft: false
slug: 'count-down-count-up'
tags: ['code', 'JavaScript', 'count-up', 'count-down']
banner: 'news-post-banner.png'
---

I don't stream, but that doesn't mean that one day I won't. So I was working on my overlay ideas and decided to write a simple script that will count down for the beginning of the stream and count up for the duration of the stream.

I googled at first, there were many examples. I couldn't decipher some of them to fit my needs. Eventually I manage to get the scripts below working. I can't say they are the best way to do this, this is what I was able to get working and like how it looks.

## Count Down Script

For this example we are going to hardcode the `timeLeft`, I actually use the URL to set the timer, code commented. This script can count down for days, like days till Christmas. I didn't know how to `clearInterval` until I worked on this.

```JS
// const urlParams = new URLSearchParams(window.location.search);
// let timeLeft = urlParams.get('time') * 60;

let timeLeft = 5 // in minutes.
let counting = setInterval(function () {
  if (timeLeft >= 0) {
    let secs = (Math.floor(timeLeft) % 60).toString().padStart(2, '0');
    let mins = (Math.floor(timeLeft / 60) % 60).toString().padStart(2, '0');
    let hours = (Math.floor(timeLeft / 60 / 60) % 24).toString().padStart(2, '0');
    let days = Math.floor((timeLeft / 60 / 60 / 24) % 24)
      .toString()
      .padStart(2, '0');
    let daysText = `${days} days ${hours}:${mins}:${secs}`;
    let hoursText = `${hours}:${mins}:${secs}`;
    let minsText = `${mins}:${secs}`;
    const countDownText = days > 0 ? daysText : hours > 0 ? hoursText : minsText;

    // This will write the text in an element with countdown id.
    document.getElementById('countdown').innerHTML = countDownText;

    timeLeft -= 1;
  }
  if (timeLeft < 0) {
    clearInterval(counting);
  }
}, 1000);
```

## Count Up Script

You can set a `startTime` (in minutes) if you like, otherwise it will start from zero.

```JS
const urlParams = new URLSearchParams(window.location.search);
let startTime = urlParams.get('time') * 60;

let counting = setInterval(function () {
  if (startTime >= 0) {
    let secs = (Math.floor(startTime) % 60).toString().padStart(2, '0');
    let mins = (Math.floor(startTime / 60) % 60).toString().padStart(2, '0');
    let hours = (Math.floor(startTime / 60 / 60) % 24).toString().padStart(2, '0');
    let days = Math.floor((startTime / 60 / 60 / 24) % 24)
      .toString()
      .padStart(2, '0');
    let daysText = `${days} days ${hours}:${mins}:${secs}`;
    let hoursText = `${hours}:${mins}:${secs}`;
    let minsText = `${mins}:${secs}`;
    const countDownText = days > 0 ? daysText : hours > 0 ? hoursText : minsText;

    document.getElementById('countup').innerHTML = countDownText;

    startTime += 1;
  }
  if (startTime < 0) {
    clearInterval(counting);
  }
}, 1000);
```
