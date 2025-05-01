import {Home, Star} from 'react-feather';

export const MENUITEMS = [
    {
      menutitle: 'General',
      menucontent: 'Dashboards',
      Items: [
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/`
          },
          {
            title: 'Favorite Movies', icon: Star, type: 'link', path: `/favorites`
          },
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/asdasd`
          },
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/asdasdasd`
          }
      ]
    }
  ];