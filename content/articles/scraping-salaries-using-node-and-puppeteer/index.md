---
title: Scraping London tech salaries from indeed using Node and Puppeteer
date: "2018-08-08"
description: A short guide on how to scrape and parse salaries from Indeed.com using Nodejs and Google's Puppeteer Chromium API
path: /articles/scraping-salaries-using-node-and-puppeteer
content_type: article
---

My day job is recruitment for [Talent Point](http://talentpoint.co/). Our success is largely based on helping our partners understand the realities of the job markets they are hiring from including how much/what bang (skills + experience) they can get for their buck (budget/salary) and then planning hiring campaigns accordingly.

As a developer, this presents an interesting problem. How can I can track average salaries for various roles across London?

### Step in Node and Puppeteer

[Puppeteer](https://github.com/GoogleChrome/puppeteer) is a Headless Chrome API built in Node. It allows us to do pretty much anything we can do manually in the browser. In this instance, the important features are rendering, inspecting and then manipulating the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

### So how do we use it to scrape Indeed for salaries?

- Figure out Indeed’s URL query structure
- Load this in Puppeteer
- Identify the HTML element containing salary info
- Use standard browser `document` methods to access that HTML element
- Parse out salary data and add it to an `Array`

---

#### Figure out Indeed’s URL query structure

This first step was pretty straightforward. I headed to indeed.com, entered in the desired search query and copied the URL on the resulting page. If you look at the URL you can see that the query parameters are in the string:

https://www.indeed.co.uk/jobs?as_and=&as_phr=%22javascript+developer%22&as_any=&as_not=&as_ttl=&as_cmp=&jt=permanent&st=&salary=&radius=25&l=london&fromage=1&limit=50&sort=&psf=advsrch

_As I was looking for only permanent jobs in the last day, I had to do this search via the advanced search option on Indeed._

#### Load this into puppeteer

Puppeteer is very developer friendly. To load this URL using the API requires just three lines:

```javascript
const browser = puppeteer.launch({ headless: false })
const page = browser.newPage()
page.goto(
  `https://www.indeed.co.uk/jobs?as_and=&as_phr=%22javascript+developer%22&as_any=&as_not=&as_ttl=&as_cmp=&jt=permanent&st=&salary=&radius=25&l=london&fromage=1&limit=50&sort=&psf=advsrch`
)
```

This code launches Chromium and navigates to the indeed URL. The `headless: false` argument passed to the `puppeteer.launch()` method starts Chromium as a full browser which shows us the full rendered page and gives us access to the chrome developer console which is important for our next step.

#### Identify the HTML element containing salary info

Now, finding the HTML element that contains the salary information is as simple as opening the developer console, right-clicking the element and noting it’s selector. In this case the best choice was the `.no-wrap` class that was called on the `span` element the salary info sat inside as it was unique on the page to these elements.

#### Use the standard browser `document` methods to access the elements text

Every browser provides a[document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object which represents the loaded page as well as providing a set of methods to manipulate or access elements (or nodes) on that page. In this case we want to find every element on the page which has a class of `no-wrap` as we already noted it as a unique identifier for the element containing the salary info we need.

This is done like so: `document.querySelectorAll(‘.no-wrap’)` which returns an ‘Array like object’ containing all of the Nodes (HTML elements) which have a class of `no-wrap`. Using another standard JavaScript feature, `innerText`, we can then store the text inside those element into it’s own variable as a string.

#### Parse that data and add it to an `Array`

Yay. At this point I thought I was almost there… 👍. Turns out the string returned isn’t entirely consistent in it’s format and also it has non-numeric characters which together make converting it to a single integer (or number) a challenge.

The string formats we needed to extract data from where as so:

```
"£50,000"
"£50,000 - £70,000"
```

Extracting information from string is typically referred to as ‘parsing’ and is typically achieved using [Regex (Regular Expressions)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). Taken from Mozzila MDN docs:

> Regular expressions are patterns used to match character combinations in strings.

Step 1:
`split()` each salary string into separate values in an array based on if there is a `-` character in the string:

`"£50,000".split('-')` = `[“£50,0000”]`
Or
`"£50,000 - £70,000".split('-')` = `[“£50,0000”, "£70,0000"]`

Step 2:
Remove all non-integers from string, if two elements in array take the second (higher salary), convert to an integer and push onto a new final array:

```javascript
if (arr.length === 1) {
  salaryData.push(parseInt(arr[0].replace(/\D/g, '')));
  return;
  }
  salaryData.push(parseInt(arr[1].replace(/\D/g, '')));
}
```

Output:
`[500000, 70000]`

And that ’s it!

This array or results is a small example to show you the theory behind what I did. The actually app extracts the salaries for every permanent job posted in the last 24 hours for the given job title and location which in the real app is logged into a Mongo database for analysis.

### Next steps…

This is definitely only the MVP. The long tail of salary tracker is to compare the variation in salary over time not only for specific jobs, but also for senior/lead jobs vs others and for jobs in specific industries and with specific skills, or both.

Stay tuned for the launch of salarytracker.io 🚀!
