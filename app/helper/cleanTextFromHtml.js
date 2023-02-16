function uncleanHTML(str) {
  str.replace(/&lt;(?<=&lt;)(.*?)(?=&gt;)&gt;/g, "<$1>");
}
function cleanHTML(str) {
  str.replace(/<(?<=<)(.*?)(?=>)>/g, "&lt;$1&gt;");
}

//myString.replace(/<[^>]*>?/gm, '')
