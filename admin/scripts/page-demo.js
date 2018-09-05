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

      editor.on("pasting",function(e,$content){
          console.log('pasting');
          //$content.append("pasting");
          var imgs = $content.find('img');
          var imgWrapper = '<div class="img-wrap" style="text-align: center;"></div>';
          var imgCaption = '<div class="img-caption-wrap"><input placeholder="图片描述(最多50字)"/><p class="img-caption">图片描述</p></div>';
          for(var i = 0;i<imgs.length;i++)
          {
            //$(imgs[i]).attr('data-width',$(imgs[i]).width());
            //$(imgs[i]).attr('data-height',$(imgs[i]).height());
            $(imgs[i]).wrap(imgWrapper);
            $(imgs[i]).parent().append(imgCaption);
          }
      });

      // editor.on('decorate',function(e,$el){
      //   console.log('decorate');
      // });
  });

}).call(this);
