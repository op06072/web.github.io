const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const express = require('express')
const ctrl = require('./lib/ctrl.js')
const bodyParser = require('body-parser')
const compression = require('compression')
const sanitizeHtml = require('sanitize-html')
const templateHTML = require('./lib/template.js')
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.get('*',function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});
app.get('*', function(request, response, next){
  var filteredID = ''
  var P = request.path
  if(P.includes('page') || P.includes('update')){
    filteredID = P.split('/')[2];
  }
  fs.readFile(`data/${filteredID}`, 'utf8', function(err,description){
    request.description = description;
    next();
  });
});

//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response){
  var filteredID = '';
  var ctrlTxt = ctrl.create();
  /*
  fs.readFile(`data/${filteredID}`, 'utf8', function(err,description){
    var title = 'Welcome';
    description = 'Hello, Node.js';
    
    //fs.readdir('./data', function(error, filelist){
      //sanitizeTitle = sanitizeHtml(title);
      //sanitizeDescription = sanitizeHtml(description, {
        //allowedTags:['h1']
      //});
      //response.send(templateHTML(sanitizeTitle, filelist, `<h2>${sanitizeTitle}</h2>
      //<p>${sanitizeDescription}</p>`, ctrlTxt));
    //})
    sanitizeTitle = sanitizeHtml(title);
    sanitizeDescription = sanitizeHtml(description, {
      allowedTags:['h1']
    });
    response.send(templateHTML(sanitizeTitle, request.list, `<h2>${sanitizeTitle}</h2>
    <p>${sanitizeDescription}</p>`, ctrlTxt));
  })
  */
  var title = 'Welcome';
  description = 'Hello, Node.js';
  sanitizeTitle = sanitizeHtml(title);
  sanitizeDescription = sanitizeHtml(description, {
    allowedTags:['h1']
  });
  response.send(templateHTML(sanitizeTitle, request.list, `<h2>${sanitizeTitle}</h2>
  <p>${sanitizeDescription}</p>
  <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px">`, ctrlTxt));
})

app.get('/page/:pageId', function(request, response){
  var filteredID = path.parse(request.params.pageId).base;
  var ctrlTxt = ctrl.create();
  var title = '';
  /*
  fs.readFile(`data/${filteredID}`, 'utf8', function(err,description){
    title = filteredID
    ctrlTxt += ctrl.update(title) + ctrl.delete(title);
    fs.readdir('./data', function(error, filelist){
      sanitizeTitle = sanitizeHtml(title);
      sanitizeDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      response.send(templateHTML(sanitizeTitle, filelist, `<h2>${sanitizeTitle}</h2>
      <p>${sanitizeDescription}</p>`, ctrlTxt));
    })
  })
  */
  title = filteredID
  ctrlTxt += ctrl.update(title) + ctrl.delete(title);
  sanitizeTitle = sanitizeHtml(title);
  sanitizeDescription = sanitizeHtml(request.description, {
    allowedTags:['h1']
  });
  response.send(templateHTML(sanitizeTitle, request.list, `<h2>${sanitizeTitle}</h2>
  <p>${sanitizeDescription}</p>`, ctrlTxt));
})

app.get('/create', function(request, response){
  var title = 'WEB - create';
  /*
  fs.readdir('./data', function(error, filelist){
    response.send(templateHTML(title, filelist, `
    <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `, ``));
  })
  */
  response.send(templateHTML(title, request.list, `
  <form action="/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
      <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `, ``));
})

app.post('/create_process', function(request, response){
  /*
  var body = '';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = path.parse(post.title).base;
    console.log(title)
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.writeHead(302, {Location: `/page/${title}`});
      response.end();
    })
  })
  */
  var post = request.body;
  var title = path.parse(post.title).base;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/page/${title}`)
  })
})

app.get('/update/:pageId', function(request, response){
  var title = path.parse(request.params.pageId).base;
  ctrlTxt = ctrl.create() + ctrl.update(title);
  /*
  fs.readFile(`data/${title}`, 'utf8', function(err,description){
    fs.readdir('./data', function(error, filelist){
      response.send(templateHTML(title, filelist, `
      <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `, ctrlTxt));
    })
  })
  */
  response.send(templateHTML(title, request.list, `
  <form action="/update_process" method="post">
    <input type="hidden" name="id" value="${title}">
    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
    <p>
      <textarea name="description" placeholder="description">${request.description}</textarea>
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `, ctrlTxt));
})

app.post('/update_process', function(request, response){
  /*
  var body = '';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var filteredID = path.parse(id).base;
    var title = path.parse(post.title).base;
    var description = post.description;
    fs.rename(`data/${filteredID}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/page/${title}`)
      })
    })
  })
  */
  var post = request.body;
  var id = post.id;
  var filteredID = path.parse(id).base;
  var title = path.parse(post.title).base;
  var description = post.description;
  fs.rename(`data/${filteredID}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/page/${title}`)
    })
  })
})

app.post('/delete_process', function(request, response){
  /*
  var body = '';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var filteredID = path.parse(id).base;
    fs.unlink(`data/${filteredID}`, function(error){
      response.redirect('/')
    })
  })
  */
  var post = request.body;
  var id = post.id;
  var filteredID = path.parse(id).base;
  fs.unlink(`data/${filteredID}`, function(error){
    response.redirect('/')
  })
})

app.listen(3000, function(){
  console.log('Example app listening on port 3000');
})

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var templateHTML = require('./lib/template.js');
var ctrl = require('./lib/ctrl.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
  var _url = request.url;
  //console.log(url); http(프로토콜)://opentutorials.org(호스트(도메인)):3000(포트)/main(path)?id=HTML&page=12(query string)
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var sanitizeTitle = '';
  var sanitizeDescription = '';
  //console.log(queryData.id);
  if(pathname === '/'){
    var filteredID = path.parse(queryData.id).base;
    var ctrlTxt = ctrl.create();
    fs.readFile(`data/${filteredID}`, 'utf8', function(err,description){
      if(filteredID === undefined){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
      } else {
        var title = filteredID
        ctrlTxt += ctrl.update(title) + ctrl.delete(title);
      }
      fs.readdir('./data', function(error, filelist){
        response.writeHead(200);
        sanitizeTitle = sanitizeHtml(title);
        sanitizeDescription = sanitizeHtml(description, {
          allowedTags:['h1']
        });
        response.end(templateHTML(sanitizeTitle, filelist, `<h2>${sanitizeTitle}</h2>
        <p>${sanitizeDescription}</p>`, ctrlTxt));
      })
    })
  } else if(pathname === '/create'){
    var title = 'WEB - create';
    fs.readdir('./data', function(error, filelist){
      response.writeHead(200);
      response.end(templateHTML(title, filelist, `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `, ``));
    })
  } else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var title = path.parse(post.title).base;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
    })
  } else if(pathname === '/update'){
    var title = path.parse(queryData.id).base;
    ctrlTxt = ctrl.create() + ctrl.update(title);
    fs.readFile(`data/${title}`, 'utf8', function(err,description){
      fs.readdir('./data', function(error, filelist){
        response.writeHead(200);
        response.end(templateHTML(title, filelist, `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
    
app.get('/update/:pageId', function(request, response){
  var title = path.parse(request.params.pageId).base;
  console.log(title)
  ctrlTxt = ctrl.create() + ctrl.update(title);
  fs.readFile(`data/${title}`, 'utf8', function(err,  })
    })
  } else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredID = path.parse(id).base;
      var title = path.parse(post.title).base;
      var description = post.description;
      fs.rename(`data/${filteredID}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      })
    })
  } else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredID = path.parse(id).base;
      fs.unlink(`data/${filteredID}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end();
      })
    })
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
  //console.log(__dirname + _url);
  //response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
*/