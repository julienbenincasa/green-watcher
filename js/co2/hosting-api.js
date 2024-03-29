"use strict";
function check(domain) {
  if (typeof domain === "string") {
    return checkAgainstAPI(domain);
  } else {
    return checkDomainsAgainstAPI(domain);
  }
}
async function checkAgainstAPI(domain) {
  const req = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`);
  const res = await req.json();
  return res.green;
}
async function checkDomainsAgainstAPI(domains) {
  try {
    const apiPath = "https://api.thegreenwebfoundation.org/v2/greencheckmulti";
    const domainsString = JSON.stringify(domains);
    const req = await fetch(`${apiPath}/${domainsString}`);
    const allGreenCheckResults = await req.json();
    return greenDomainsFromResults(allGreenCheckResults);
  } catch (e) {
    return [];
  }
}
function greenDomainsFromResults(greenResults) {
  const entries = Object.entries(greenResults);
  const greenEntries = entries.filter(([key, val]) => val.green);
  return greenEntries.map(([key, val]) => val.url);
}
var hosting_api_default = {
  check
};
export {
  hosting_api_default as default
};
