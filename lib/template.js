function templateHTML(title, filelist, body, control){
  var list = '<ul>';
  for(var i of filelist){
    //list += `<li><a href="/?id=${i}">${i}</a></li>`;
    list += `<li><a href="/page/${i}">${i}</a></li>`;
  }
  list += '</ul>';
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="./style.css">
      <script src="./colors.js"></script>
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <input id="night_day" type="button" value="night" onclick="
        nightDayHandler(this)
      ">
      <div id="grid">
        ${list}
        ${control}
        <div id="article">
          ${body}
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = templateHTML;
