<template>
  <div class="app-container">
    <editor id="tinymce" v-model="_value" :init="init" ref="editorRef"></editor>
    <!--    <div v-html="tinymceHtml"></div>-->
  </div>
</template>

<script setup lang="ts">
const NODE_ENV = import.meta.env.MODE
import {computed, onMounted} from "vue";
import tinymce from "tinymce/tinymce";
// import "tinymce/models/dom"; // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue"; // 引入组件
// 都是富文本插件
import "tinymce/icons/default";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/preview";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/hr";
import {HttpRequest} from "@/request/httpRequest";

const request = new HttpRequest({baseURL: '/uploadApi/'})
const editorRef = ref(null)
// 以上所有的样式在 node_modules 下面 tinymce 里面的 plugins 都能找到。
const props = defineProps({
  modelValue: {
    default: '',
  },
  getElement: Function
})
const emit = defineEmits(['update:modelValue', 'uploadImg'])
const _value = computed({
  get: () => {
    return props.modelValue
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})
const init = {
  //初始化数据
  language_url: NODE_ENV === 'development' ? "langs/zh-Hans.js" : new URL("/langs/zh-Hans.js", import.meta.url).href, // 引入语言包（该语言包在public下，注意文件名称）
  // language_url: "public/langs/zh-Hans.js", // 引入语言包（该语言包在public下，注意文件名称）
  language: "zh-Hans", // 这里名称根据 zh-Hans.js 里面写的名称而定
  skin_url: NODE_ENV === 'development' ? "skins/ui/oxide" : new URL("/skins/ui/oxide", import.meta.url).href, // 这里引入的样式
  // skin_url: "public/skins/ui/oxide", // 这里引入的样式
  content_css: NODE_ENV === 'development' ? "skins/content/default/content.css" : new URL("/skins/content/default/content.css", import.meta.url).href, //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  // content_css: "public/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  height: 'calc(100vh - 80px)', // 限制高度
  plugins: "link hr searchreplace textpattern lists image code table wordcount imagetools preview ", // 富文本插件
  toolbar:
      " hr searchreplace  preview  editimage     | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
  branding: false, // //是否禁用“Powered by TinyMCE”

  menubar: true, //顶部菜单栏显示
  paste_convert_word_fake_lists: false, // 插入word文档需要该属性
  content_style: "body {font-size: 10pt;}",
  urlconverter_callback: function (url, node, on_save, name) {
    if (node === 'img' && url.startsWith('blob:')) {
      tinymce.activeEditor && tinymce.activeEditor.uploadImages()
    }
    return url;
  },
  images_upload_handler: async (blobInfo, success, failure) => {
    // try {
    //   const res = await request.postByFormData("api/file/doUpLoadwebp", {file: blobInfo.blob()})
    //   if (res.data) success(res.data)
    // } catch (e) {
    //   console.error(e, '上传图片出错')
    // }
    const reader = new FileReader();
    reader.readAsDataURL(blobInfo.blob());
    reader.onloadend = async () => {
      try {
        // const res = await request.post("/hzsx/busShop/doUpLoadwebp", {base64: reader.result})
        success(reader.result)
        emit('uploadImg')
      } catch (e) {
        console.error(e, '上传图片出错')
      }
    };
  },
  textpattern_patterns: [
    {start: '###', cmd: 'InsertOrderedList'},
    {start: '---', replacement: '<hr/>'},
    {start: '--', replacement: '—'},
    {start: '-', replacement: '—'},
    {start: '(c)', replacement: '©'},
    {start: '//brb', replacement: 'Be Right Back'},
    {start: '//heading', replacement: '<h1 style="color:blue">Heading here</h1><p><em>Date: 01/01/2000</em></p> '},
  ],
};
const getEditor = () => {
  const el = tinymce.activeEditor.getBody();

  console.log( el.getElementsByTagName('p'))

}
defineExpose({getEditor})
onMounted(() => {
  tinymce.init({}); // 初始化富文本
});
</script>

<style scoped>
::v-deep(img) {
  margin-top: 100px;
}
</style>
