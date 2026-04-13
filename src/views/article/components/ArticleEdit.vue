<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

//控制抽屉显示隐藏
const visibleDrawer = ref(false)

//默认数据
const defaultForm = {
  title: '', //标题
  cate_id: '', //分类id
  cover_img: '', //封面图片file对象
  content: '', //string内容
  state: '', //状态
}

//准备数据
const formModel = ref({
  // title: '', //标题
  // cate_id: '', //分类id
  // cover_img: '', //封面图片file对象
  // content: '', //string内容
  // state: '', //状态
  ...defaultForm,
})
//图片上传相关逻辑
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //预览图片
}
//组件对外暴露一个方法open,基于open传递的参数，区分添加还是编辑
//open({}) => 表单无需渲染，说明是添加
//open({id,cate_name}) => 表单需要渲染，说明是编辑
//open 调用后，可以打开弹窗
const open = (row) => {
  visibleDrawer.value = true //显示抽屉
  if (row.id) {
    //需要基于row.id发送该请求,获取编辑对应的详情数据,进行回显
    console.log('编辑回显')
  } else {
    //基于默认的数据重置我们form数据
    formModel.value = {
      ...defaultForm,
    }
    console.log('添加')
  }
}

defineExpose({
  open,
})
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 此处需要关闭element-plus的自动上传,不需要配置action等参数
             只需要做前端的本地预览图片即可,无需在提交前上传图标
             语法: URL.createObjectURL(...)创建本地预览的地址,来预览 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
