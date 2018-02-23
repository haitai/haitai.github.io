var colorStatus = true,
    infoStatus = false,
    previewStatus = false;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hou = today.getHours(); //Returns the hour of the day (0-23).
var min = today.getMinutes(); //Returns the minute (0-59)
var sec = today.getSeconds(); //Returns the second (0-59).
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    if(min<10) {
        min = '0'+min
    } 
    if(sec<10) {
        sec = '0'+sec
    } 
    todaydate = yyyy + '-' + mm + '-' + dd;
    nowtime = yyyy + '-' + mm + '-' + dd + 'T' + hou + ':' + min + ':' + sec + '+08:00';
    np='---\n\
title:\n\
author: admin\n\
type: post\n\
date:'
+ ' ' + nowtime + '\n\
url: /posts/postslug/\n\
categories:\n\
  - uncategorized\n\
tags:\n\
  - untagged\n\
\n\
---\n\
';
function saveToFile()
{
    var textToSave = document.getElementById("text").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/html"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var m = prompt ( "请输入文件名" , "" ) ;

    var fileNameToSaveAs = todaydate + "-" + m + ".md";
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
 
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
function file_open(files) {
  if (files.length) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function() {
      $('#text').val(this.result);
      $('#preview').html(convert(this.result));
      sessionStorage.setItem("mkdowninfo", this.result);
    }
    reader.readAsText(file);
  }
}
$(function() {
  // When using more than one `textarea` on your page, change the following line to match the one you’re after
  var $textarea = $('textarea'),
      $preview = $('<div id="preview" />').insertAfter('#nothing'),
      converter = new Markdown.getSanitizingConverter();
      Markdown.Extra.init(converter, {
        extensions: "all",
        highlighter: "prettify"
      });
      convert = converter.makeHtml;

      var text = sessionStorage.getItem("mkdowninfo");
      if(text == null || text == "null" || text == "")
      	text = "";//"Hi\n==\nYou can type your text **here**.";

  // instead of `keyup`, consider using `input` using this plugin: http://mathiasbynens.be/notes/oninput#comment-1
  $textarea.keyup(function() {
  	if(text == null){
    	$preview.html(convert($textarea.val()));
    	sessionStorage.setItem("mkdowninfo", $textarea.val());
      PR.prettyPrint();
    }else{
    	$textarea.val(text);
    	$preview.html(convert(text));
      PR.prettyPrint();
    	text = null;
    }
  }).trigger('keyup');
});

// 说明：Javascript 切换页面 CSS 样式
// 整理：http://www.CodeBit.cn

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
      && a.getAttribute("rel").indexOf("alt") == -1
      && a.getAttribute("title")
    ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);

function toggleInfo() {
  if(infoStatus == false) {
    var height = $(document.body).height() - 150;
    $(".help-wrapper" ).fadeIn( "fast" );
    $('textarea').css("height", height + "px");
    $('#text-preview').css("height", height + "px");
  } else {
    $( ".help-wrapper" ).fadeOut( "fast" );
    $('textarea').css("height", "100%");
    $('#text-preview').css("height", "100%");
  }
  infoStatus = !infoStatus;
}

function togglePreview() {
  if(previewStatus == false) {
    $("#text-holder").fadeOut( "fast" );
    $('#text-preview').fadeIn( "fast" );
  } else {
    $("#text-holder").fadeIn( "fast" );
    $('#text-preview').fadeOut( "fast" );
  }
  previewStatus = !previewStatus;
}

function toggleColor(){
  if(colorStatus == false) {
    $('body').css("background-color", "white");
    $('body').css("color", "black");
    $('.help-wrapper .hellper').css("background-color", "black");
    $('.help-wrapper .hellper').css("color", "white");
    $('textarea').css("background-color", "white");
    $('textarea').css("color", "black");
    $('.md_editor a').css("color", "black");
    $('#preview').removeClass( "night" ).addClass( "day" );
    $('pre').removeClass( "night" ).addClass( "day" );
    $('code').removeClass( "night" ).addClass( "day" );
    setActiveStyleSheet('prettify-day');
  } else {
    $('body').css("background-color", "black");
    $('body').css("color", "white");
    $('.help-wrapper .hellper').css("background-color", "white");
    $('.help-wrapper .hellper').css("color", "black");
    $('textarea').css("background-color", "black");
    $('textarea').css("color", "white");
    $('.md_editor a').css("color", "white");
    $('#preview').removeClass( "day" ).addClass( "night" );
    $('pre').removeClass( "day" ).addClass( "night" );
    $('code').removeClass( "day" ).addClass( "night" );
    setActiveStyleSheet('prettify-night');
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
  $('#preview').html(convert(np));
  sessionStorage.setItem("mkdowninfo", np);
}

function copyToClipboard() {
    /* Get the text field */
  var copyText = document.getElementById("text");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("Copy");

  /* Alert the copied text */
  alert("内容已复制："+'\n' + copyText.value);
  //window.prompt("复制到剪贴板: Ctrl+C, Enter", $('textarea').val());
}

$(function() {
  var stack = new Undo.Stack(),
    EditCommand = Undo.Command.extend({
      constructor: function(textarea, oldValue, newValue) {
        this.textarea = textarea;
        this.oldValue = oldValue;
        this.newValue = newValue;
      },
      execute: function() {
      },
      undo: function() {
        this.textarea.val(this.oldValue);
      },
      
      redo: function() {
        this.textarea.val(this.newValue);
      }
    });
  stack.changed = function() {
    stackUI();
  };
  
  var undo = $(".undo"),
      redo = $(".redo");
  function stackUI() {
    undo.attr("disabled", !stack.canUndo());
    redo.attr("disabled", !stack.canRedo());
  }
  stackUI();
  
  $(document.body).delegate(".undo, .redo", "click", function() {
    var what = $(this).attr("class");
    stack[what]();
    return false;
  });
  
  var text = $("#text"),
    startValue = text.val(),
    timer;
  $("#text").bind("keyup", function() {
    // a way too simple algorithm in place of single-character undo
    clearTimeout(timer);
    timer = setTimeout(function() {
      var newValue = text.val();
      // ignore meta key presses
      if (newValue != startValue) {
        // this could try and make a diff instead of storing snapshots
        stack.execute(new EditCommand(text, startValue, newValue));
        startValue = newValue;
      }
    }, 250);
  });
  
  $(document).keydown(function(event) {
    if (!event.metaKey || event.keyCode != 90) {
      return;
    }
    event.preventDefault();
    if (event.shiftKey) {
      stack.canRedo() && stack.redo()
    } else {
      stack.canUndo() && stack.undo();
    }
  });
});