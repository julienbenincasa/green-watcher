"use strict";
import hostingAPI from "./hosting-api.js";
function check(domain) {
  return hostingAPI.check(domain);
}
var hosting_default = {
  check
};
export {
  hosting_default as default
};
