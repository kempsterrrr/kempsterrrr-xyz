---
title: Why we use Redux at footnoteapp
date: "2018-06-05"
description: Don't listen to the haters, when your app needs it, Redux is great. This is how I used it to massively improve code quality, developer velocity and maintainability building footnoteapp.com
path: /articles/why-we-use-redux-at-footnoteapp
---

_[footnoteapp](https://footnoteapp.com/) is a tool for automatically logging articles you read online via a lightweight extension with a more feature-rich app for organising these for safe keeping. This is a personal project working closely with [@rubengmurray](https://twitter.com/rubengmurray) and [@itstrickey](https://twitter.com/its__trickey). It's still in development with lots of work to do so bare with us!_

When building the MVP for footnote we went with vanilla React initially rather than adding in a third party library to manage the applications’ state. Whilst this lowered the complexity (and thus time) in getting to MVP which was our primary goal, it resulted in an app that became complicated to reason about and therefore hard to develop further.

### What made the app hard to understand?

We had a lot of data and methods which needed to be shared between components in completely different parts of the app. This meant we had an obtuse root component that held all the data and most of the methods used in the app which then had to be passed up, and down, the component tree as props.

Here is the constructor function from our original root component:

```javascript
constructor(props) {
    super(props);
    this.state = {
      userLoading: true,
      apiUrl: `${API_ROOT}`,
      user: {},
      articles: [],
      libraries: [],
      activeView: 'Feed',
      paging: {
        start: 0,
        end: 50
      },
      articleLoading: true
    };
    this.searchUserArticles = this.searchUserArticles.bind(this);
    this.getUserArticles = this.getUserArticles.bind(this);
    this.removeArticleFromDom = this.removeArticleFromDom.bind(this);
    this.infinteScroll = this.infinteScroll.bind(this);
    this.createLibrary = this.createLibrary.bind(this);
    this.getUserLibraries = this.getUserLibraries.bind(this);
    this.getLibraryArticles = this.getLibraryArticles.bind(this);
    this.selectAllArticles = this.selectAllArticles.bind(this);
    this.deleteLibrary = this.deleteLibrary.bind(this);
  }
```

🤢

Those 9 bound methods on the constructor where all methods on the root component so you can probably imagine the size of this thing! Keeping track of 9 methods as they were passed between parent and child components, up, and down multiple levels was challenging and made for pretty uglily, hard to navigate and understand code.

The issues this caused as developers were:

- **Tracking down bugs** - we never knew where to look
- **Ensuring data changed** - was a change in one part of the app was represented everywhere else
- **Adding new features** - it was not always immediately clear where the method we needed was and how we’d get it to the new component

### What did we need to change to make app easier to work with?

There were three main things we wanted to achieve to make the app more useable from a developers point of view:

1.  **Be able to share state across the app** - without _having_ the pass it from a parent component
2.  **Be able to share methods, or actions, across the app** - without _having_ to pass them from a higher up the tree
3.  **Handle data fetching outside of React components** - to make them less obtuse, more readable and more reusable.

Redux fit these problems well and as an added benefit it’s popularity means it is heavily supported in the open source community with extra tools to extend the library and resources for learning. As amateur developers both those added benefits were invaluable.

### How did Redux work out

It should be noted that the initial effort required to implement Redux is significantly greater than working with React alone. Furthermore, if you are new to the library it is not always easy to understand as there are several new terms and concepts that have nothing to do with React itself and I hadn’t run into prior to this.

What we had at the end was a lot more but much smaller and more modular files. Everything had it’s own place so whilst there was more to do what we were doing was much clearer. As well as a more maintainable architecture, it gave us huge benefits for debugging through the [Redux Dev Tools](https://github.com/gaearon/redux-devtools) (again provided but the brilliant [Dan Abramov](https://twitter.com/dan_abramov)) which allows you to track and review every state change in Redux so you can see exactly what is happening with an app at any point in time.

We would highly recommend Redux to teams struggling to manage state with React’s internal state alone. Just be wary of the added complexity for the sake of ease - it you’re not finding it hard to understand what’s going on with your app it’s probably fine as it is.
