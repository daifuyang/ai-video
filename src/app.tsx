// 运行时配置

import { RunTimeLayoutConfig } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    childrenRender(dom, props) {
      return (
        <ConfigProvider
          theme={{
            // 1. 单独使用暗色算法
            algorithm: theme.darkAlgorithm,

            // 2. 组合使用暗色算法与紧凑算法
            // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          }}
        >
          {dom}
        </ConfigProvider>
      );
    },
  };
};
