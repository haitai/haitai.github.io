var colorStatus = false,
    infoStatus = false;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd;
    np='---\n\
title:\n\
author: admin\n\
type: post\n\
date:'
+ ' ' + today + '\n\
url: /posts/postslug/\n\
categories:\n\
  - uncategorized\n\
tags:\n\
  - untagged\n\
---\n\
';

$(function() {
  // When using more than one `textarea` on your page, change the following line to match the one you’re after
  var $textarea = $('textarea'),
      $preview = $('<div id="preview" />').insertAfter('#text-holder'),
      converter = new Markdown.getSanitizingConverter();
      Markdown.Extra.init(converter);
      convert = converter.makeHtml;

      var text = sessionStorage.getItem("mkdowninfo");
      if(text == null || text == "null" || text == "")
      	text = "";//"Hi\n==\nYou can type your text **here**.";

  // instead of `keyup`, consider using `input` using this plugin: http://mathiasbynens.be/notes/oninput#comment-1
  $textarea.keyup(function() {
  	if(text == null){
    	$preview.html(convert($textarea.val()));
    	sessionStorage.setItem("mkdowninfo", $textarea.val());
    }else{
    	$textarea.val(text);
    	$preview.html(convert(text));
    	text = null;
    }
  }).trigger('keyup');
});

function toggleInfo() {
  if(infoStatus == false) {
    var height = $(document.body).height() - 150;
    $( ".help-wrapper" ).fadeIn( "fast" );
    $('textarea').css("height", height + "px");
    $('#preview').css("height", height + "px");
  } else {
    $( ".help-wrapper" ).fadeOut( "fast" );
    $('textarea').css("height", "100%");
    $('#preview').css("height", "100%");
  }
  infoStatus = !infoStatus;
}

function toggleColor(){
  if(colorStatus == false) {
    $('body').css("background-color", "white");
    $('body').css("color", "black");
    $('.help-wrapper .hellper').css("background-color", "rgba(0,0,0,0.1)");
    $('textarea').css("background-color", "white");
    $('textarea').css("color", "black");
    $('.md_editor a').css("color", "black");
    $('#preview').removeClass( "night" ).addClass( "day" );
    $('pre').removeClass( "night" ).addClass( "day" );
    $('code').removeClass( "night" ).addClass( "day" );
  } else {
    $('body').css("background-color", "black");
    $('body').css("color", "white");
    $('.help-wrapper .hellper').css("background-color", "rgba(255,255,255,0.1)");
    $('textarea').css("background-color", "black");
    $('textarea').css("color", "white");
    $('.md_editor a').css("color", "white");
    $('#preview').removeClass( "day" ).addClass( "night" );
    $('pre').removeClass( "day" ).addClass( "night" );
    $('code').removeClass( "day" ).addClass( "night" );
  }
  colorStatus = !colorStatus;
}

function clearPage() {
  $('textarea').val("");
  $('#preview').html("");
  sessionStorage.setItem("mkdowninfo", "");
}

function newPost() {
  $('textarea').val(np);
  sessionStorage.setItem("mkdowninfo", "");
}

function copyToClipboard() {
  window.prompt("复制到剪贴板: Ctrl+C, Enter", $('textarea').val());
}