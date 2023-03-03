/* 1) Trying to make my list sortable on mobile devices, 
but 'touch punch plugin' is preventing dblclick and click 
to work */

  


$(document).ready(function() {
  
  /*Retrieving data from localstorage*/
  
  $("ul").empty().append (JSON.parse(localStorage.getItem("storedList")));
  $("input:checkbox").removeAttr("checked");
  $(".checked").attr("checked", "checked"); 
  
  /*Toggle checked class for localStorage*/

  $("input:checkbox").click(function() {
  $(this).toggleClass("checked");
  });
  
    
    /*add new item*/
  
  $(".button--add").click(function() {
   if($(".input").val()!=="") {   
   $("ul").append("<li></li>");
     $("li:last").text($(".input").val())
     .prepend('<label class="custom-checkbox"><input type="checkbox"></label>');
     $(".input").val("").focus();}
  });

  
  /*edit existing item*/
  
  $("ul").on("dblclick", "li", function() {
    /*$("ul").sortable("disable");*/ //[1]
    var origValue = $(this).text();
    $(this).addClass("edit--item").html('<input type="text" class="input--edit">')
    .prepend('<label class="custom-checkbox"><input type="checkbox"></label>');
    $(".input--edit").val(origValue).focus();
    });
  
  
 $("ul").on("click", "li", function() {
    var newValue = $(".input--edit").val();
    $(".edit--item").text(newValue).prepend('<label class="custom-checkbox"><input type="checkbox"></label>');
    $(".input--edit").remove();
    $(".edit--item").removeClass();
    });
  
  
    /*remove all items*/

    $(".button--clear").dblclick(function() {
      $("ul").empty();
      localStorage.removeItem("storedList");
    });
    

   /*hide collected items*/

   $(".button--hide").click(function(){
     $("input:checkbox:checked").parents("li").hide()
   });
  
  /*show collected items*/

   $(".button--show").click(function(){
     $("input:checkbox:checked").parents("li").show()
   });

  
  /*rearrange items' order*/
  
 $("ul").sortable({delay: 1000}); //[1]
  
  
  /*save to localstorage*/

  $(".button--save").click(function(){
    var newList = $("ul").html();
    localStorage.setItem("storedList", JSON.stringify(newList));
  });
  
});