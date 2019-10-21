---
title: My Perfectly Reasonable approach to React Project Architecture
date: "2018-11-06"
description: React application architecture can be complicated. Let the challenges you face drive the decisions you make
path: /articles/reasonable-react-project-architecture
---

I’ve Google’d how to properly structure a React project countless times. Whilst learning, knowing how to organise your files is probably one of the least important things you need to be thinking about when you could be using that brain space to learn more about the fundamentals of your craft.

Really, it doesn’t matter that much. In the words of Dan Abramov…

[Move files around until it feels right](http://react-file-structure.surge.sh/)

This advice was golden. After building a few personal projects (which I obviously haven’t launched 🙄. Yet!) when moving onto my first professional project I was determined not to get bogged down in the implementation details and focus on creating the value that was required to make the app successful. Going with the flow I ended up with a project structure that does exactly what it needs to do and nothing more.

### Make it obvious where the applications structure comes from

After reading so much about container components and how they were the answer to everything I’d tried to write code in a way that attempted to support these patterns without really understanding them (I still don’t!). Patterns are great but when working with multiple people who are new to React using domain specific terminology simply makes their job of understanding the code base harder than it already is.

Under the influence of the ridiculously amazing [GatsbyJS](https://www.gatsbyjs.org/), I structured my app using layouts (Gatsby uses pages but it’s the same concept) whereby inside of a layout folder I’d have a component for each route of the app I was building.

E.G. _(index.js corresponds to the home/root route)_

```javascript
src/
  layouts/
    index.js
    Account/
    Companies/
    Hub/
    Login/
```

The key benefit from this kind of approach is that it’s obvious what you’re going to find in a folder called `layouts`. Anyone stepping into a code base that structures its files inside directories with sensible and descriptive names is probably going to have at least an ‘OK’ time understanding it.

### Separate individual components that make up layouts from thoes that govern its Structure

At the start of the project I had huge layouts components which held both the applications structure and the individual components which together made up the structure of each page. This quickly became unmanageable as trying to find the code for smaller isolated parts of the app took an age.

To make this easier I separated out specific components which together made up parts of each layout into their own folders and files under a component directory like so:

```javascript
components/
  AppHeader/
  ChangePasswordForm/
  LoginForm/
  LogoSpinner/
  Sidebar/
```

From a high-level view I could now find the layout I needed quickly and just as quickly find specific components via descriptive names in a centralised location. This separation also supports a flatter project structure which was a win in-terms of both navigating the repo faster and reducing it's hierarchal structure which inturn also made sharing each piece easier.

The lesson I learnt from this experience was invaluable. Letting the challenges of a naturally growing codebase drive the structure and architecture of that code base made for a much better end-result when compared with letting preconceived ideas restrict freedom to get things done.

I strongly advise anyone still learning not to think too much about project strucutre initially and go with the flow so you can feel the pain and understand the considerations needed around different architectures before deciding which way to go.
