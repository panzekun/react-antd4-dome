import React from 'react'
import {
  HomeOutlined,
  PieChartOutlined,
  BarsOutlined,
  MenuOutlined,
  QqOutlined,
  UsergroupDeleteOutlined,
  WechatOutlined,
  AndroidOutlined,
  ShoppingOutlined,
  AreaChartOutlined
} from '@ant-design/icons';

export const menus = [
  {
    path: '/home',
    title: '首页',
    icon: <HomeOutlined />
  },
  {
    path: '/products',
    title: '商品管理',
    icon: <ShoppingOutlined />,
    children: [
      {
        path: '/products/category',
        title: '品类管理',
        icon: <PieChartOutlined />
      },
      {
        path: '/products/goods',
        title: '商品管理',
        icon: <PieChartOutlined />
      },

    ]
  },
  {
    path: '/user',
    title: '用户管理',
    icon: <UsergroupDeleteOutlined />,
  },
  {
    path: '/role',
    title: '角色管理',
    icon: <AndroidOutlined />,
  },
  {
    path: '/charts',
    title: '图表',
    icon: <AreaChartOutlined />,
  },
  {
    path: '/menu',
    title: '多级菜单',
    icon: <BarsOutlined />,
    children: [
      {
        path: '/menu/level',
        title: '二级菜单',
        icon: <MenuOutlined />,
        children: [
          {
            path: '/menu/level/submenu-1',
            title: '三级菜单1',
            icon:<WechatOutlined />
          },
          {
            path: '/menu/level/submenu-2',
            title: '三级菜单2',
            icon:<QqOutlined />
          }
        ]
      }
    ]
  },
];
