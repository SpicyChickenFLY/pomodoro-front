<template>
  <div>
    <el-date-picker></el-date-picker>
    <el-button type="success" :icon="Plus" @click="addTask"
      >制定今日计划</el-button
    >
    <el-divider>今日计划</el-divider>
    <el-table :data="taskListData" >
      <el-table-column>
        <template #default="{ row }">
          <el-text>{{ row.title }}</el-text>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-text v-for="i in row.estimatePomodoroCnt1st" :key="i">
            <el-icon><Star /></el-icon>
          </el-text>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-button @click="startFocus(row.id)">开始专注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider>计划外紧急</el-divider>
    <el-table :data="taskListData" >
      <el-table-column>
        <template #default="{ row }">
          <el-text>{{ row.title }}</el-text>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-text v-for="i in row.estimatePomodoroCnt1st" :key="i">
            <el-icon><Star /></el-icon>
          </el-text>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-button>开始专注</el-button>
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
} from "vue";
import { ElNotification, ElLoading, ElMessageBox } from "element-plus";
import { Star } from "@element-plus/icons-vue";
import { getTaskList } from "@/api/tasks.ts";

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
  getTaskList()
    .then((res) => {
      taskListData.value = res.data;
    })
    .catch((error) => onError("获取管理器信息失败", error));
};

const startFocus = () => {
  addTaskVisible.value = true
}

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
