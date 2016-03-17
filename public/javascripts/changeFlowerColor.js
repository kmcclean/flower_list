
$(document).ready(function(){

  $("#flowerColor").click(function(){

    if ($('#newColor').length === 1) { return; }

    var input = $("<input id='newColor' placeholder='new color'></input>");
    (input).insertAfter($(this))
    var instructions = $("<i>Press Enter to save, Esc to cancel</i>");
    instructions.insertAfter(input);


    input.keypress(function(event){
      //Submit changes by pressing enter
      if (event.which == 13) {

        //Database update via AJAX
        var newColor = $(this).val();
        var name = $("#flowerName").text();
        var data = {"name" : name, "color": newColor}
        var url = '/updateColor'
        $.ajax(
          {"method" : "put" ,
          "data" : data ,
          'url' : url
          }).done(function(result){
            $("#flowerColor").text(result.color);
          }).fail(function(){
            console.log("error");  //TODO - something else?
          });
        input.remove();
        instructions.remove();
        edit = false;
      }
    })

    //Cancel changes by pressing Esc key.
    input.keyup(function(event){
      if (event.which == 27){
        $(this).remove();
        instructions.remove();
        edit = false;
      }
    })
  })
});
