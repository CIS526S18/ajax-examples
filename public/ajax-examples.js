console.log("Loading ajax-examples.js");

/** @function postResult
  * This function posts a result in the form of
  * a list item by appending it to a list element
  * with the provided id.
  * @param {String} id - the id of the list to place the result in
  * @param {String} result - the result string to post.
  */
function postResult(id, result) {
  // Get the list with id from the Document Object Model
  var list = document.getElementById(id);
  // Create a new list item element
  var node = document.createElement('li');
  // Add the results to the list item
  node.innerHTML = result;
  // Append the new list item to the specified list
  list.appendChild(node);
}

/** @function makeXmlHttpRequest
  * An event handler that creates an XmlHttpRequest
  * object and uses it to retrieve a result from a
  * web API.
  */
function makeXmlHttpRequest(event) {
  event.preventDefault();
  // Create the XmlHttpRequest
  var xhr = new XMLHttpRequest();
  // Add an event handler for when the state changes.
  xhr.onreadystatechange = function(event) {
    console.log("State Change", xhr.readyState, xhr.status)
    if(xhr.readyState === 4 && xhr.status === 200) {
      postResult('xml-http-request-list', xhr.responseText);
    }
  }
  // Send the request
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  xhr.send();
}

/** Attach the makeXmlHttpRequest event handler to
  * the corresponding button on the page.
  */
var makeXmlHttpRequestButton = document.getElementById('make-xml-http-request');
makeXmlHttpRequestButton.addEventListener('click', makeXmlHttpRequest);

/** @function makeJQueryAjaxRequest
  * An event handler that uses JQuery's ajax implementation
  * to retrieve a result from a web api.
  */
function makeJQueryAjaxRequest(event) {
  event.preventDefault();
  // Make the ajax request and handle its result
  jQuery.ajax('https://jsonplaceholder.typicode.com/posts/2', {
    method: 'GET',
    success: function(data) {
      postResult('jquery-ajax-request-list', JSON.stringify(data));
    }
  });
}

/** Attach the makeJQueryAjaxRequest event handler
  * to the corresponding button on the page.
  * We'll use JQuery's approach this time.
  */
jQuery('#make-jquery-ajax-request').on('click', makeJQueryAjaxRequest);


/** @function makeFetchRequest
  * An event handler that makes a request using
  * the new standardized Fetch API.  I
  */
function makeFetchRequest(event) {
  event.preventDefault();
  // Make the request (returns a Promise)
  fetch('https://jsonplaceholder.typicode.com/posts/2')
  // Use the Promise's then() function to recieve and
  // process the results of the request
  .then(function(response) {
    // response.text() returns a promise to supply
    // the request's body as text.  We could also use
    // response.json() which would parse a JSON body
    // and supply the resulting JavaScript object.
    return response.text();
  })
  // Use the result of this second, chained promise
  // to post the body text into the results list
  .then(function(text) {
    postResult('fetch-request-list', text);
  })
}

/** Attach the makeFetchRequest event handler to
  * the corresponding button on the page.
  */
var makeFetchRequestButton = document.getElementById('make-fetch-request');
makeFetchRequestButton.addEventListener('click', makeFetchRequest);
