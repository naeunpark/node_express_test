var todos = {
  add: function(e){

    if(e.which == 13){
      var item = $(this).val();
      var createdData = { name : item };

      if(item !== ''){

        $.post("http://139.59.230.182:3002/tasks", createdData).done(function(response){
        $('ul')
        .append('<li class="list"><span class="btn-delete" data-id="' + response._id + '"><i class="fa fa-trash-o"></i></span>'+ response.name +'</li>');

        todos.reset();
      });
      }
      else{
        alert('Please write down the list');
      }
    }
  },

  reset: function(){
    var item = $('#createList').val('');
  },

  update: function(e){
    $(this).css({"text-decoration":"line-through"})
  },

  delete: function(e){

    var itemId = $(this).closest('span').attr('data-id');
  console.log(itemId);
    $.ajax({
      url: "http://139.59.230.182:3002/tasks/" + itemId,
      type: "DELETE"
    }).done(function(response){
      console.log(response);
    });
    $(this).closest('li').remove();
  },

  toggle: function(e){
    $('#createList').toggle();
  },

  setEvent: function(){

    $('.container').on('keypress', '#createList', todos.add);
    $('.container').on('click', '.btn-delete', todos.delete);
    $('.container').on('click', '.list', todos.update);
    $('.container').on('click', '.btn-toggle', todos.toggle);

    $.get("http://139.59.230.182:3002/tasks", function(data){
      console.log(data);
      $.each(data,function(index, value){
        console.log(value);
        $('ul').append('<li class="list"><span class="btn-delete" data-id="' + value._id + '"><i class="fa fa-trash-o"></i></span>'+ value.name +'</li>')
      })
    })

  },

  init: function(){
    todos.setEvent();
  }
}
todos.init();
