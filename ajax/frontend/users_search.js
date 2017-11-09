const apiUtil = require('./api_util.js');
const followToggle = require('./follow_toggle.js');
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
      let button = $('<button></button>');
      button.addClass("follow-toggle");
      // button.attr("data-initial-follow-state", "unfollowed");
      // button.attr("data-user-id", user.id);
      // button.attr("type", "button");
      // button.attr("name", "button");

      let options = {
        followState: user.followed ? "followed" : "unfollowed",
        userId: user.id
      };
      new followToggle(button, options);
      anch.attr("href", `/users/${user.id}`);
      anch.text(user.username);
      listitem.append(anch);
      listitem.append(button);
      ul.append(listitem);
    });
  }
}

module.exports = UsersSearch;
