<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { ref } from 'vue'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'

const articleList = ref([]) //文章列表
const total = ref(0) //总条数
const loading = ref(false) //loading状态

//定义请求参数对象
const params = ref({
  pagenum: 1, //当前页
  pagesize: 5, //当前生效的每页条数
  cate_id: '',
  state: '',
})
//基于params参数渲染列表
const getArticleList = async () => {
  loading.value = true

  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false
}
getArticleList()

//处理分页逻辑
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  //只要是每页条数变化了,那么原本正在访问的当前页意义不大了,数据大概率已经不在原来那一页了
  //重新从第一页渲染即可
  params.value.pagenum = 1
  params.value.pagesize = size
  //基于最新的当前页和每页条数渲染数据
}
const onCurrentChange = (page) => {
  // console.log('当前每页条数', page)
  params.value.pagenum = page
  //基于最新的当前页,渲染数据
  getArticleList()
}

//搜索逻辑 => 按照最新的逻辑,重新检索,从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1 //重置页面
  getArticleList()
}
//重置逻辑 => 将筛选逻辑清空,重新检索,从第一页开始展示
const onReset = () => {
  params.value.pagenum = 1 //重置页面
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()

//添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}

//编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open({ row })
}
//删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <!-- label展示给用户看的,value是提交给后台的 -->
      <el-form-item label="文章分类:">
        <!-- Vue2 => v-model :value和@input的简写 -->
        <!-- Vue3 => v-model :modelvalue和@update:modelValue的简写 -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽row可以获取当前行的数据 => v-for 遍历item -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 添加编辑的抽屉 -->
    <article-edit ref="articleEditRef"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
