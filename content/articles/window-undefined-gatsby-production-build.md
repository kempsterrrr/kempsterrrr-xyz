---
title: Window Undefined Errro in Gatsby Production Build
date: "2018-10-30"
description: Simply post highlighting the course of 'window undefined' errors in Gatsby production builds and how to fix it.
path: /articles/window-undefined-gatsby-production-build
content_type: article
---

A common error I run into with Gatsby - regardless of how much I use it - is window undefined during a proudction build.

### The cause of this error

Gatsby is a static site generator. That means your website is generated at build time (on a server )rather than at run time (in the browser). The `window` object is specific to the browser environment so given a Gatsby site is built ahead of time outside of the browser (on the server) your code does not have access to the `window` object which causes an undefined error from any code using the window obeject.

### How do we fix this?

The simplist approach is using an if statement to see if the `window` object is defined.

```javascript
if(window !=== undefined) {
  // your code here
} else {
  // your other code here
}
```

You can simplify this with a tenery operatore as follows:

```javascript
window typeof !== undefined ? // your code here : // your other code here
```

Although gatsby builds a static site on the server and thus doesn't have access to the browser `window` object at build time, at run time (when your site is loaded in the browser) Gatsby turns your page into a fully functioning React.js app and again has access to the `window` variable as you're now in a browser environment.

With this you can then execute code that requires the `window` object as you normally would with confidence it existis in the current scope/environment.

I hope this solves your problem, if not feel free to reach out on Twitter or email and I'll try my best to help.
