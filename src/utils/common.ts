import { ElNotification } from "element-plus";

export const onError = async (msg: string, error: any) => {
  ElNotification({
    title: "失败",
    message: `${msg} - ${error}`,
    type: "error",
  });
};
