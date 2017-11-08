const followToggle = require('./follow_toggle.js');
$(() => {
  $('button.follow-toggle').each(function(i, el) {
    // debugger
    const x = new followToggle($(el));
  });
});
