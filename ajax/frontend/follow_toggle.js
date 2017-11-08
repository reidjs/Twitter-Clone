const APIUtil = require('./api_util.js');
class FollowToggle {
  constructor($button) {
    // const $button = $('.follow_toggle');
    this.userId = $button.attr("data-user-id");
    //followState false? means following that user
    this.followState = $button.attr("data-initial-follow-state");
    this.$button = $button;
    this.render();

    $button.on("click", (event) => {
      return this.handleClick(event);
    });
  }
  render() {
    if (this.followState === "unfollowed") {
      this.$button.text("Follow!");
    } else {
      this.$button.text("Unfollow!");
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (this.followState === "unfollowed") {
      APIUtil.followUser(this.userId).then(() => {
        this.followState = "followed";
        this.render();
      });
    } else {
      APIUtil.unfollowUser(this.userId).then(() => {
        this.followState = "unfollowed";
        this.render();
      });
    }
  }


}

module.exports = FollowToggle;
