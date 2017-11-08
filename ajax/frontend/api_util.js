const APIUtil = {
  followUser: (id) => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: "POST",
      dataType: "JSON",
      success: () => {
        console.log("follow");
        // this.followState = !this.followState;
        // this.render();
      }
    });
  },
  unfollowUser: (id) => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: "DELETE",
      dataType: "JSON",
      success: () => {
        console.log("unfollowed");
        // this.followState = !this.followState;
        // this.render();
      }
    });
  }
};

module.exports = APIUtil;
