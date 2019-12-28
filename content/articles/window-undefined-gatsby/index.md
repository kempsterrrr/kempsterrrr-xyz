---
title: Why is my window undefined, Gatsby?
description: Understanding and dealing with the window undefined error during a Gatsby build.
date: "2019-12-28"
path: /articles/window-undefined-error-gatsby
content_type: article
---

A common error I run into with [Gatsby](https://gatsbyjs.org) is `window undefined` during a production build. I thought I'd briefly explain what (typically) causes this error and how to avoid it.

![Gatsby](../../../src/images/Gatsby_Logo.png)

### The Cause: Static Site Generator (SSG)

Gatsby is a static site generator. That means your website is generated at build time (on a server) rather than at run time (when a user requests your site in their browser).

The error, `window undefined`, refers to the [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) object which is specific to the browser environment. Given a Gatsby site is built ahead of time on your server your code does not have access to the window object when you (or your hosting provider) runs `Gatsby build`.

### How do we fix it?

The simplest approach is using an `if` statement to see if the window object is defined like so:

```javascript
if(window !=== undefined) {
  // your code here
} else {
  // your other code here
}
```

You can also shorten this with a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) as follows:

```javascript
window typeof !== undefined ? // your code here : // your other code here
```

Although Gatsby builds a static site on the server and thus doesn't have access to the `window` object at build time, at run time (when your site is loaded in the browser) Gatsby turns your page into a fully functioning React.js app, again giving your code access to the `window` object.

I hope this helps to solve your problem. Please feel free to reach out on [Twitter](https://twitter.com/kempsterrrr) or [email](mailto:kempsterwilliam@gmail.com) if you have any questions and I'll try my best to help 👍.
