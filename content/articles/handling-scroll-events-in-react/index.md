---
title: Handling scroll events in React
date: "2018-06-03"
description: Handling scroll events when building JavaScript apps is really common. Here's how I handled it when implementing infinite scroll on footnoteapp.com.
path: /articles/handling-scroll-events-in-react
content_type: article
---

Handling scroll events is something that I deal with regularly. The most common reason I run into it is when I am implementing infinite scrolling in a content driven app or website and, considering I couldn’t find much out there specifically about doing this in React, I thought I’d share my solution.

_Disclaimer - At time of writing I was only targeting Chrome_

## The Problem

1.  How to work with scroll events in React
2.  How to calculate when the user has scrolled to the bottom of a div

### Scroll Events in React

When a user scrolls a DOM [scroll](https://developer.mozilla.org/en-US/docs/Web/Events/scroll) event is fired, an event which is built into ever browser by default. React has it’s own method, [onScroll](s), which can be called on any component when the scroll event is fired. Using this onScroll method we can call a function as a result of a user scrolling.

Example;

```javascript
<SomeComponent onScroll={someMeothod} />
```

As with any DOM event, an event object is created with properties that can provide useful information about the event and the element said event is related too. A scroll event is fired for every pixel a user scrolls. In this case, we are only concerned with identifying when the user has scrolled to the end of the parent element containing our content.

### Calculating when user has scrolled to end of a container

Add an `onScroll` method to element containing content which calls a function on the components class:

```javascript
<div className="content-container" onScroll={this.handleScroll}>
  // Your content
</div>
```

Then create the `handleScroll` function to handle the scroll event:

```js
class MyComponent extends React.Component {
  handleScroll = e => {
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
    }
  }
  render() {
    return (
      <div className="content-container" onScroll={this.handleScroll}>
        // Your content
      </div>
    )
  }
}
```

Let’s break down what is happening in the `handleScroll` method to make things a bit clearer…

`e` - this corresponds to the event itself. It is an object that is created by the browser with properties related to the scroll event we are working with.

`let element = e.target` - this allows us to find the element which dispatched the event using (`e.target`) and assign it to the variable which we can use in the rest of the code.

Now we (our code) knows which element is being scrolled and we have assigned it to a variable in our methods scope, we can access the properties of that element given by the browser and calculate if the user has scrolled to the end.

`element.scrollHeight` - this is the height in pixels of the elements content, including content not visible on the screen due to css overflow.

`element.scrollTop` - the height in pixels that an element's content is scrolled vertically.

`element.clientHeight` - the height in pixels of the scrollable part of the element.

Using the above properties, we can calculate if the user has scrolled to the bottom of the element by comparing the negative sum of the `scrollHeight` and `scrollTop` to the `clientHeight`. If they are are the same, the user has scrolled to the bottom of the element. By wrapping this in an `if` statement we can therefore ensure that our function within the if statement’s scope is only run when the user has scrolled to the end of the div and our `if` condition is met.
