const followToggle = require('./follow_toggle.js');
const userSearch = require('./users_search.js');
$(() => {

  $('button.follow-toggle').each(function(i, el) {
    // debugger
    const x = new followToggle($(el));
  });

 $('nav.users-search').each(function(i, el) {

   const y = new userSearch($(el));
 });

});
