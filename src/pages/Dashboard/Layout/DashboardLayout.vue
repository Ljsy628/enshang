<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar>
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot-scope="props" slot="links">
        <sidebar-item :link="{name: '首页', icon: 'nc-icon nc-istanbul', path: '/admin/overview'}">
        </sidebar-item>
           <sidebar-item :link="{name: '代理管理', icon: 'nc-icon nc-single-copy-04', path: '/admin/management'}"></sidebar-item>
           <sidebar-item :link="{name: '玩家管理', icon: 'nc-icon nc-alien-33', path: '/admin/player'}"></sidebar-item>
        <sidebar-item :link="{name: 'Components', icon: 'nc-icon nc-app'}">
          <sidebar-item :link="{name: 'Buttons', path: '/components/buttons'}"></sidebar-item>
          <sidebar-item :link="{name: '侧边框', path: '/components/grid-system'}"></sidebar-item>
          <sidebar-item :link="{name: 'Panels', path: '/components/panels'}"></sidebar-item>
          <sidebar-item :link="{name: 'Sweet Alert', path: '/components/sweet-alert'}"></sidebar-item>
          <sidebar-item :link="{name: 'Notifications', path: '/components/notifications'}"></sidebar-item>
          <sidebar-item :link="{name: 'Icons', path: '/components/icons'}"></sidebar-item>
          <sidebar-item :link="{name: 'Typography', path: '/components/typography'}"></sidebar-item>
        </sidebar-item>
      
        <sidebar-item :link="{name: 'Forms', icon: 'nc-icon nc-notes'}">
          <sidebar-item :link="{name: 'Regular Forms', path: '/forms/regular'}"></sidebar-item>
          <sidebar-item :link="{name: 'Extended Forms', path: '/forms/extended'}"></sidebar-item>
          <sidebar-item :link="{name: 'Validation Forms', path: '/forms/validation'}"></sidebar-item>
          <sidebar-item :link="{name: 'Wizard', path: '/forms/wizard'}"></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{name: 'Tables', icon: 'nc-icon nc-paper-2'}">
          <sidebar-item :link="{name: 'Regular Tables', path: '/table-list/regular'}"></sidebar-item>
          <sidebar-item :link="{name: 'Extended Tables', path: '/table-list/extended'}"></sidebar-item>
          <sidebar-item :link="{name: 'Paginated Tables', path: '/table-list/paginated'}"></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{name: 'Maps', icon: 'nc-icon nc-pin-3'}">
          <sidebar-item :link="{name: 'Google Maps', path: '/maps/google'}"></sidebar-item>
          <sidebar-item :link="{name: 'Full Screen Maps', path: '/maps/full-screen'}"></sidebar-item>
          <sidebar-item :link="{name: 'Vector Maps', path: '/maps/vector-map'}"></sidebar-item>
        </sidebar-item>
        <!-- 资金管理 -->
        <sidebar-item :link="{name: '资金管理', icon: 'nc-icon nc-money-coins'}">
          <sidebar-item :link="{name: '我的分红', path: '/fundmanagement/bonus'}"></sidebar-item>
          <sidebar-item :link="{name: '银行卡管理', path: '/fundmanagement/bankcardmanagement'}"></sidebar-item>
          <sidebar-item :link="{name: '我的提现', path: '/fundmanagement/presentation'}"></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{name: 'Charts', icon: 'nc-icon nc-chart-bar-32', path: '/admin/charts'}"></sidebar-item>
        <sidebar-item :link="{name: 'Calendar', icon: 'nc-icon nc-single-copy-04', path: '/admin/calendar'}"></sidebar-item>
        <sidebar-item :link="{name: 'Pages', icon: 'nc-icon nc-puzzle-10'}">
          <sidebar-item :link="{name: 'User Page', path: '/pages/user'}"></sidebar-item>
          <sidebar-item :link="{name: 'Login Page', path: '/login'}"></sidebar-item>
          <sidebar-item :link="{name: 'Register', path: '/register'}"></sidebar-item>
          <sidebar-item :link="{name: 'Lock Screen Page', path: '/lock'}"></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './Extra/MobileMenu.vue'
  import UserMenu from './Extra/UserMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      UserMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
