<template>
  <div>
    <el-table
      :data="taskListData"
      size="small"
      border
      style="width: 100%"
    >
      <el-table-column label="内容">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="专注情况">
        <template #default="{ row }">
        <el-rate
          v-model="row.estimatePomodoro1st"
          :max="row.estimatePomodoro1st"
          :icons="ChatRound"
          :void-icon="ChatRound"
        />
        <el-rate
          v-model="row.estimatePomodoro2rd"
          :max="row.estimatePomodoro2rd"
          :icons="ChatRound"
          :void-icon="ChatRound"
        />
        <el-rate
          v-model="row.estimatePomodoro3nd"
          :max="row.estimatePomodoro3nd"
          :icons="ChatRound"
          :void-icon="ChatRound"
        />
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  computed,
} from "vue";
import axios from "axios";
import moment from "moment";
import { ElNotification, ElLoading, ElMessageBox } from "element-plus";
import { ChatRound } from "@element-plus/icons-vue";

const timer = reactive(null);

const taskListData = ref([]);

onMounted(async () => {
  refresh();
  // const timer = setInterval(() => refresh(), 5000);
  // onBeforeMount(() => clearInterval(timer));
  // onBeforeUnmount(() => clearInterval(timer));
});

const onError = async (msg, error) => {
  ElNotification({
    title: "失败",
    message: `${msg} - ${error}`,
    type: "error",
  });
};

const refresh = async () => getTaskInfo();

const getTaskInfo = async () => {
  axios
    .get("/api/tasks")
    .then((res) => {
      taskListData.value = res.data;
    })
    .catch((error) => onError("获取管理器信息失败", error));
};

</script>

<style scoped>
:deep(.el-table--small .el-table__cell) {
  padding: 0;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 5px;
}
:deep(.el-collapse-item__header) {
  height: 30px;
}
:deep(.el-table__empty-block) {
  min-height: 30px;
}
:deep(.el-table__empty-text) {
  line-height: 20px;
  height: 20px;
}
:deep(.el-switch) {
  --el-switch-on-color: #95d475;
  --el-switch-off-color: #f89898;
}
</style>
