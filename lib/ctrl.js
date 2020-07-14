module.exports = {
  create:function (){
    return `
    <a href="/create">create</a>`;
  },
  update:function (title){
    //return `
    //<a href="/update?id=${title}">update</a>`;
    return `
    <a href="/update/${title}">update</a>`;
  },
  delete:function (title){
    return `
    <form action="/delete_process" method="post">
      <input type="hidden" name="id" value="${title}">
      <input type="submit" value="delete">
    </form>`;
  }
}
