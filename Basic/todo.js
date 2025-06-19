$(document).ready(function () {
  $('#add-btn').click(function () {
    const task = $('#todo-input').val().trim();
    if (task !== '') {
      $('#todo-list').append(`<li>${task} <span class="remove">✖</span></li>`);
      $('#todo-input').val('');
    }
  });

  // Remove item
  $('#todo-list').on('click', '.remove', function () {
    $(this).parent().remove();
  });
});
