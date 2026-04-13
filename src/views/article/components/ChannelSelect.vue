<script setup>
import { artGetCannelsService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String],
  },
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetCannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getChannelList()
</script>

<template>
  <el-select :modeValue="modelValue" @updat:modelValue="emit('update:modelValue', $event)">
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
    <el-option label="体育" value="137"></el-option>
  </el-select>
</template>
