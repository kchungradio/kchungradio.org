function noSpam(user, domain) {
  var locationstring = "mailto:" + user + "@" + domain;
  window.location = locationstring;
}
