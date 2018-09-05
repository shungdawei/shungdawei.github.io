(function() {
  $(function() {
    var $preview, editor, mobileToolbar, toolbar;
    Simditor.locale = 'zh-CN';
    toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
    mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
    if (mobilecheck()) {
      toolbar = mobileToolbar;
    }
    editor = new Simditor({
      textarea: $('#txt-content'),
      placeholder: '这里输入文字...',
      toolbar: toolbar,
      pasteImage: true,
      docWidth: 760,
      docMode: true,
      defaultImage: 'assets/images/image.png',
      upload: location.search === '?upload' ? {
        url: '/upload'
      } : false
    });

    //$(".doc-placeholder").prop("outerHTML")

    //var docPlaceholderHTML = $("<div class=\"doc-placeholder\"></div>");
    //docPlaceholderHTML.append("<span class=\"left\"></span>");
    //docPlaceholderHTML.append("<span class=\"right\"></span>");
    

    //$(".simditor-body").before(docPlaceholderHTML);

    $preview = $('#preview');
    if ($preview.length > 0) {
      return editor.on('valuechanged', function(e) {
        return $preview.html(editor.getValue());
      });
    }

      $("#getValue").on('click', function () {
          console.log(editor.getValue());
      });

      editor.on("valuechanged",function(e,src){
          var value = editor.getValue();
          var text = value.replace(/<\/?[^>]*>/g,'').replace(/[ | ]*\n/g,'\n').replace(/\n[\s| | ]*\r/g,'\n').replace(/&nbsp;/ig,'');
          $(".words-count .num").text(text.length);
      });
  });

}).call(this);
