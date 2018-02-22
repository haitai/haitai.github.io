// DEFINING MARKDOWN CONTROLS

$(document).ready(function() {
  $('#add_h').on("click", function(e) {
    e.preventDefault();
    md_insert_h_to('md_text_editor');
  });

  $('#add_em').on("click", function(e) {
    e.preventDefault();
    md_insert_em_to('md_text_editor');
  });

  $('#add_strong').on("click", function(e) {
    e.preventDefault();
    md_insert_strong_to('md_text_editor');
  });

  $('#add_strikethrough').on("click", function(e) {
    e.preventDefault();
    md_insert_strikethrough_to('md_text_editor');
  });

  $('#add_paragraph').on("click", function(e) {
    e.preventDefault();
    md_insert_paragraph_to('md_text_editor');
  });

  $('#add_horizontal_rule').on("click", function(e) {
    e.preventDefault();
    md_insert_horizontal_rule_to('md_text_editor');
  });

  $('#add_blockquote').on("click", function(e) {
    e.preventDefault();
    md_insert_blockquote_to('md_text_editor');
  });

  $('#add_unord_list').on("click", function(e) {
    e.preventDefault();
    md_insert_unord_list_to('md_text_editor');
  });

  $('#add_ord_list').on("click", function(e) {
    e.preventDefault();
    md_insert_ord_list_to('md_text_editor');
  });

  $('#add_table').on("click", function(e) {
    e.preventDefault();
    md_insert_table_to('md_text_editor');
  });

  $('#add_link').on("click", function(e) {
    e.preventDefault();
    md_insert_link_to('md_text_editor');
  });

  $('#add_image').on("click", function(e) {
    e.preventDefault();
    md_insert_image_to('md_text_editor');
  });

  $('#add_code').on("click", function(e) {
    e.preventDefault();
    md_insert_code_to('md_text_editor');
  });
});

function md_insert_h_to(element) {
  insertText(element, "#","", "")
}

function md_insert_em_to(element) {
  insertText(element, "*", "*", "italic")
}

function md_insert_strong_to(element) {
  insertText(element, "**", "**", "bold")
}

function md_insert_strikethrough_to(element) {
  insertText(element, "~~", "~~", "strikethrough")
}

function md_insert_paragraph_to(element) {
  insertText(element, "\n", "\n\n", "paragraph")
}

function md_insert_horizontal_rule_to(element) {
  insertText(element, "\n***", "\n", "")
}

function md_insert_blockquote_to(element) {
  insertText(element, "\n> ", "\n", "blockquote")
}

function md_insert_unord_list_to(element) {
  insertText(element, "\n* ", "", "element")
}

function md_insert_ord_list_to(element) {
  insertText(element, "\n1. ", "", "element")
}

function md_insert_table_to(element) {
  insertText(element, "\n", "\n", "header 1 | header 2\n---|---\nrow 1 col 1 | row 1 col 2\nrow 2 col 1 | row 2 col 2")
}

function md_insert_link_to(element) {
  insertText(element, "[", "](http://linkaddress.com)", "linkname")
}

function md_insert_image_to(element) {
  insertText(element, "![", "](http://linkaddress.com/img.jpg)", "alt text")
}

function md_insert_code_to(element) {
  insertText(element, "`", "`", "code")
}
// IMPLEMENTING MARKDOWN EDITOR 


function insertText(element_name, before_text, after_text, default_text) {
  // get element by name
  var element = document.getElementsByName(element_name)[0];

  //IE specific patch: IE 9 etc.
  if (selection = document.selection) {
    IE_insertText(element, selection, before_text, after_text, default_text);
  //modern browsers
  } else if (element.selectionStart || element.selectionStart == '0') {
    var selection_from       = element.selectionStart;
    var selection_to         = element.selectionEnd;
    var val                  = element.value;
    var text_before_selected = val.substring(0, selection_from);
    var text_after_selected  = val.substring(selection_to, val.length);
    var selected_text        = val.substring(selection_from, selection_to);
    var content;

    // if we didn't select anything we add default text
    if (selection_from == selection_to) {
      content = default_text;
     // otherwise we use selected text  
    } else {
      content = selected_text;
    }

   // updating element value
    element.value = text_before_selected + before_text + content + 
                    after_text + text_after_selected;
    element.focus();

   // do highlight text
    element.selectionStart = selection_from + before_text.length;
    element.selectionEnd   = element.selectionStart + content.length;

    if (selection_from != selection_to) {
      window.getSelection().collapseToEnd();
    }
  //other ones?
  } else {
    alert("still not fully implemented"); 
  }
}


// special function for inserting text in Internet Explorer

function IE_insertText(element, selection, before_text, after_text, 
                       default_text) {
  // firstly have to focus on element to manipulate with range on it
  // otherwise it will break 
  element.focus();

  // grab current selection
  var range = selection.createRange();

  var content;
  // if we didn't select anything we add default text
  if (selection.type == 'None') {
    content = default_text;
  // otherwise we use selected text  
  } else {
    content = range.text;
  }

  // will highlight from that starting point
  var start = IE_currentCursorPosition(element, range.getBookmark());

  // we will highlight text after added before text markdown
  start += before_text.length;

  // highlight till content lenght
  var end = start + content.length;

  // if we selected some text do not highlight it after adding markdown to it
  // reposition cursor after added content
  if (selection.type != 'None') {
    start = end;
  }

  // update content of field
  range.text = before_text + content + after_text;

  // reintroduce in element proper selection of updated content
  // we need new text range
  var text_range = element.createTextRange();
  // do highlight text
  text_range.collapse(true);
  // set proper start and end points 
  text_range.moveEnd("character", end);
  text_range.moveStart("character", start);
  text_range.select();
}


// to calculate Internet Explorer cursor position,
// at the beginning of currently selected text
function IE_currentCursorPosition(element, range_bookmark) {
  var position  = 0;
  var range_dup = element.createTextRange();

  range_dup.moveToBookmark(range_bookmark);

  while (range_dup.moveStart('character' , -1) !== 0) {
    position++;
  }
  return position;
}
