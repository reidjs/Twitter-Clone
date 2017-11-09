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
  },
  searchUsers: (queryVal, success) => {
    return $.ajax({
      url: '/users/search',
      method: "GET",
      dataType: "JSON",
      // data: `query: ${queryVal}`,
      data: {query: queryVal},
      success: (searchResults) => {
        // console.log(searchResults);

        return success(searchResults);
      },
      error: (error) => {

        console.log(error);
      }
    });
  }
};

module.exports = APIUtil;
