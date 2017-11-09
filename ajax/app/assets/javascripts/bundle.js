/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const followToggle = __webpack_require__(1);
const userSearch = __webpack_require__(3);
$(() => {

  $('button.follow-toggle').each(function(i, el) {
    // debugger
    const x = new followToggle($(el));
  });

 $('nav.users-search').each(function(i, el) {

   const y = new userSearch($(el));
 });

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
class FollowToggle {
  constructor($button, options) {
    // const $button = $('.follow_toggle');
    this.userId = ($button.attr("data-user-id") || options.userId);
    //followState false? means following that user
    this.followState = ($button.attr("data-initial-follow-state") || options.followState);
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const apiUtil = __webpack_require__(2);
const followToggle = __webpack_require__(1);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map