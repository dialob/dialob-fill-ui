import React, {Component} from 'react';
import {render} from 'react-dom';

import {renderDialob} from '../../src';

const BOOT_BASE_URL = 'http://localhost:8081';
const SESSION_BASE_URL = 'http://localhost:8080';
const SESSION_ID = '4dbef5cba8bf1954ef6fa8c433001acf';

function defaultSubmitCallback(context) {
  console.log('Submit callback called with context:', context);
}

var options = {
  'backendApiUrl': BOOT_BASE_URL + '/webapi',
  'chatUrl':null,
  'connectionMode':'rest',
  'csrf':null,
  'restUrl': SESSION_BASE_URL + '/session/dialob/' + SESSION_ID,
  'reviewUrl': BOOT_BASE_URL + '/review/' + SESSION_ID,
  'transports':null,
  'url': SESSION_BASE_URL + '/session/socket/' + SESSION_ID
};
options.submitCallback = defaultSubmitCallback;

var params = (new URL(location.href)).searchParams;
var mode = params.get('mode');
if (mode) {
  console.log('Overriding connection mode:', mode);
  options.connectionMode = mode;
}

renderDialob(document.querySelector('#demo'), options);
