import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },

  {
    navCap: 'Components',
  },
  {
    displayName: 'Appointmnet',
    iconName: 'calendar-month',
    bgcolor: 'primary',
    route: '/ui-components/appointment',
  },
  {
    displayName: 'Doctor',
    iconName: 'stethoscope',
    bgcolor: 'warning',
    route: '/ui-components/doctor',
  },
  {
    displayName: 'Medicine',
    iconName: 'pill',
    bgcolor: 'success',
    route: '/ui-components/medicine',
  },
  {
    displayName: 'Prescription',
    iconName: 'receipt-2',
    bgcolor: 'error',
    route: '/ui-components/prescription',
  },
  {
    displayName: 'Money',
    iconName: 'coin',
    bgcolor: 'error',
    route: '/ui-components/statistics',
  },
  {
    displayName: 'Money',
    iconName: 'coin',
    bgcolor: 'error',
    route: '/ui-components/add',
  },
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   bgcolor: 'accent',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   bgcolor: 'warning',
  //   route: '/authentication/register',
  // },


  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   bgcolor: 'success',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   bgcolor: 'error',
  //   route: '/extra/sample-page',
  // },
];
