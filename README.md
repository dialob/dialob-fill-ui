Dialob Fill UI
=================

Embedding Dialob
-------------------

Fill ui stylesheet
```html
  <link rel="stylesheet" href="https://unpkg.com/dialob-fill-ui@0.1.1/dist/css/dialob.css">
```

Fill ui depends on [`window.React`](https://facebook.github.io/react/index.html) library.
```html
  <script src="https://unpkg.com/react@15.4.1/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15.4.1/dist/react-dom.js"></script>
```

Fill ui is available from [unpkg.com](https://unpkg.com) CDN service
```html
  <script src="https://unpkg.com/dialob-fill-ui@latest/dist/javascript/dialob.js"></script>
```

Placeholder for dialob application
```html
  <div id="dialob-fill"></div>
```


And inject dialob view to given placeholder element
```html
<script>
window.Dialob.renderDialob(
  document.getElementById('dialob-fill'),
  {
    url: 'http://localhost:8080/session/' + sessionID,
    reviewUrl: 'http://localhost:8080/review/' + sessionID
  }
);
</script>
```

```
Dialob.renderDialob(targetElement, options)
```

 * `targetElement` - dom element where dialob ui will be rendered
 * `options` dialob ui settings
   - `url` session communication endpoint url
   - `reviewUrl` if questionnaire is completed redirect ui to this url
   - `csrf` cross-site request forgery token settings
     * `headerName` header to be added on http POST requests
     * `token` payload for csrf header
   - `submitCallback` optional function to be called when questionnaire is completed. Function takes one parameter containing context object, where `questionnaireId` contains questionnaire ID that is completed.

