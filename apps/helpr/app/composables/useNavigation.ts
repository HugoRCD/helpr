import { CogIcon, HomeIcon, UserGroupIcon, UserCircleIcon, PencilIcon, BookmarkIcon } from '@heroicons/vue/24/outline'

type Where = 'home' | 'app' | 'user' | 'admin';

type Navigation = {
  name: string;
  to: string;
  icon: any;
};

export function getNavigation(where: Where): Navigation[] {
  const userStore = useUserStore()
  switch (where) {
    case 'home':
      return [
        { name: 'Home', to: '/', icon: HomeIcon },
        { name: 'Pricing', to: '/pricing', icon: HomeIcon },
        { name: 'Integrations', to: '/integrations', icon: HomeIcon },
        { name: 'Team', to: '/team', icon: HomeIcon },
        { name: 'Contact', to: '/contact', icon: HomeIcon },
      ]
    case 'app':
      return [
        { name: 'My Flows', to: '/app/my-flows', icon: BookmarkIcon },
        { name: 'Providers', to: '/app/providers', icon: HomeIcon },
      ]
    case 'user':
      return [
        {
          name: 'Profile',
          to: '/app/profile/' + userStore.getUser?.id,
          icon: UserCircleIcon,
        },
        { name: 'Edit Profile', to: '/app/edit-profile', icon: PencilIcon },
        { name: 'Settings', to: '/app/settings', icon: CogIcon },
      ]
    case 'admin':
      return [
        { name: 'Dashboard', to: '/app/admin/dashboard', icon: UserGroupIcon },
        {
          name: 'App Management',
          to: '/app/admin/app-management',
          icon: CogIcon,
        },
      ]
    default:
      return []
  }
}
