---
title: Using Higher-order components with React and Redux
date: "2018-07-17"
description: Higher-order components might not be the hottest topic in React world anymore but here's how I found them super useful building footnoteapp.com.
path: /articles/higher-order-components-react-redux
---

[React-redux](https://github.com/reduxjs/react-redux) provides a `connect()` component which allows us to wrap existing React components as they are exported, injecting data from the Redux store as well as actions (functions) you can dispatch to make changes to that store. This uses the [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html) pattern which means it is a function that takes a component as an argument like so `connect(someComponent)` and returns a new component with additional properties.

Whilst building [footnote](https://footnoteapp.com/app/reading) we found this pattern especially powerful. Each part of the app needed specific data and actions relevant to the job it was created to perform. Using the `connect()` component alone you need to hard-code the dispatch actions and props for each component to explicitly tell redux what you need.

E.g. `UserProfile` - _(simplified version)_

```javascript
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchArticles } from "../actions/article-actions"

class Articles extends Component {
  render() {
    const { articles, deleteArticle } = this.props
    return (
      <div className="articles-container">
        {articles.reading.map(item => {
          return <Article key={item.id} {...item} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.articles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchArticles(url, userId) {
      dispatch(fetchArticles(url, userId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles)
```

Having to repeat yourself sucks. Using connect this way means you have to write the `mapStateToProps` and `mapDispatchToProps` functions out every time you want use data or actions from redux. Luckily, we can steal the HOC concept and extract the logic into another HOC component which we import and use in any other part of the app.

Here is a simplified version of the `withArticles()` HOC we created for footnote:

```javascript
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchArticles } from "../actions/article-actions"

export function withArticles(WrappedComponent) {
  class withArticlesComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchArticles(url, userId) {
        dispatch(fetchArticles(url, userId))
      },
    },
  }

  const mapStateToProps = state => {
    return {
      ...state.articles,
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withArticlesComponent)
}
```

Rather than repeat this code everywhere it allowed us to wrap any component and get the articles data and actions for free like so:

```JavaScript
export default withArticles(Articles)
```

Not only did this cut down the size of our component files it also allowed members of the team less experienced in React and Redux to quickly try ideas without having to worry about the wiring required the get the data and actions they needed. As amatuers pushing for a quick MVP this was invaluable.

We did however notice some drawbacks. In some components we were ‘chaning’ many higher order components together forexample:

```javascript
withRouter(withUser(withArticles(Header)))
```

This isn’t the prettiest code and also caused instances where we were passing much more data than we needed to some components. The latter is arguably down to bad practice around not making effective use of React’s built into features for passing data but it did sometimes make debugging harder as there was more to data being passed to consider.

All in all we saw huge value in Higher Order Components and would use them again however we’d be careful not to use them to hammer in screws.
