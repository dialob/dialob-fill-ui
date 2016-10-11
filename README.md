FlexiForm Fill UI
=================

Embedding FlexiFrom
-------------------

Fill ui stylesheet
```html
  <link rel="stylesheet" href="https://unpkg.com/flexiform-fill-ui@0.0.7/dist/css/ff.css">
```

Fill ui depends on [`window.React`](https://facebook.github.io/react/index.html) library.
```html
  <script src="https://unpkg.com/react@15.3.2/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15.3.2/dist/react-dom.js"></script>
```

Fill ui is available from [unpkg.com](https://unpkg.com) CDN service
```html
  <script src="https://unpkg.com/flexiform-fill-ui@latest/dist/javascript/ff.js"></script>
```

Placeholder for flexiform application
```html
  <div id="flexiform-fill"></div>
```


And inject flexiform view to given placeholder element
```html
<script>
window.FlexiForm.renderFlexiForm(
  document.getElementById('flexiform-fill'),
  {
    url: 'http://localhost:8080/session/' + sessionID,
    reviewUrl: 'http://localhost:8080/review/' + sessionID
  }
);
</script>
```
