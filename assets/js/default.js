var colorStatus = true,
    infoStatus = false;
    np='---\n\
title:\n\
author: admin\n\
type: post\n\
date: 2018-02-14\n\
url: /posts/post-slug/\n\
categories:\n\
  - Uncategorized\n\
tags:\n\
  - tag\n\
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
  if(infoStatus == false)
    $( ".help-wrapper" ).fadeIn( "slow" );
  else
    $( ".help-wrapper" ).fadeOut( "slow" );
  infoStatus = !infoStatus;
}

function toggleColor(){
  if(colorStatus == true) {
    $('body').css("background-color", "white");
    $('body').css("color", "black");
    $('.help-wrapper .hellper').css("background-color", "rgba(0,0,0,0.1)");
  }else {
    $('body').css("background-color", "black");
    $('body').css("color", "white");
    $('.help-wrapper .hellper').css("background-color", "rgba(255,255,255,0.1)");
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
  window.prompt("Copy to clipboard: Ctrl+C, Enter", $('textarea').val());
}