import { createComponentVNode } from "inferno";

var requireJSX = require('express-engine-inferno-jsx/require');

module.exports = function (props) {
  var __components;

  import External from '@ext/external';
  export default class Test {
    go() {
      return createComponentVNode(2, External);
    }

  }
  return __components;
};