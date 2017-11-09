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
    usersArr.forEach((el) => {
      console.log(el);
    });
  }
}

module.exports = UsersSearch;
