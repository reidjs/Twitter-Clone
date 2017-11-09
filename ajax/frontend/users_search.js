const apiUtil = require('./api_util.js');
class UsersSearch {
  constructor ($el) {
    this.$el = $el;
    this.$input = $($el.find('input'));
    this.$ul = $($el.find('ul'));
    // this.query = "";
    this.$input.on("keypress", (event) => {
      this.handleInput(event);
    });
  }

  handleInput(event) {
    // console.log(e.key);
    // this.query += event.key;
    // apiUtil.searchUsers(this.query, this.renderResults);
    // debugger
    apiUtil.searchUsers(this.$input.val(), this.renderResults);
  }

  renderResults(usersArr) {
    const ul = $('ul.users');
    ul.empty();
    usersArr.forEach((user) => {
      let listitem = $('<li></li>');
      let anch = $('<a></a>');
      anch.attr("href", `/users/${user.id}`);
      anch.text(user.username);
      listitem.append(anch);

      ul.append(listitem);
    });
  }
}

module.exports = UsersSearch;
