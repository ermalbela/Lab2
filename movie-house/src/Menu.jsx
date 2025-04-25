import {Home, Users, UserCheck, Activity, BarChart} from 'react-feather';

export const MENUITEMS = [
    {
      menutitle: 'General',
      menucontent: 'Dashboards',
      Items: [
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/`
          },
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/`
          },
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/`
          },
          {
            title: 'Dashboard', icon: Home, type: 'link', path: `/`
          }
          // },
          // {
          //   title: 'Clients', icon: UserCheck, type: 'link', path: `${process.env.PUBLIC_URL}/clients`
          // },
          // {
          //   title: 'Users', icon: Users, type: 'link', path: `${process.env.PUBLIC_URL}/users`
          // },
          // {
          //   title: 'Visits', icon: Activity, type: 'link', path: `${process.env.PUBLIC_URL}/visits`
          // },
          // {
          //   title: 'Smart Reports', icon: BarChart, type: 'link', path: `${process.env.PUBLIC_URL}/smartReports`
          // }
      ]
    }
  ];