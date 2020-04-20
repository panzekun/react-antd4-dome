
import Home from '@v/Home';
import Category from '@v/Category';
import Goods from '@v/Goods';
import Error404 from '@v/Error/Error404';
import User from '@v/User';
import Role from '@v/Role';
import Charts from '@v/Charts';
import MenuOne from '../views/LevelMenu/MenuOne';
import MenuTwo from '../views/LevelMenu/MenuTwo';


export const routes = [
  { path: "/home", component: Home },
  { path: "/products/category", component: Category },
  { path: "/products/goods", component: Goods },
  { path: "/404", component: Error404 },
  { path: "/user", component: User },
  { path: "/role", component: Role },
  { path: "/charts", component: Charts },
  { path: '/menu/level/submenu-1', component: MenuOne },
	{ path: '/menu/level/submenu-2', component: MenuTwo },
]
