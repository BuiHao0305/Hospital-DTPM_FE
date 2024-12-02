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
    bgcolor: 'accent',
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
    displayName: 'Medicine',
    iconName: 'receipt-2',
    bgcolor: 'error',
    route: '/ui-components/add-medicine',
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
