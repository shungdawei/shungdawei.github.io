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
      placeholder: 'Simditor魔改，这里输入文本...',
      toolbar: toolbar,
      pasteImage: true,
      //docWidth: 800,
      //docMode: false,
      defaultImage: 'plugins/simditor/placeholder.png',
      upload: location.search === '?upload' ? {
        url: '/upload'
      } : false
    });

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
