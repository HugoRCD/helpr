<template>
  <div class="h-screen flex flex-col md:flex-row bg-app-primary">
    <LayoutCommandConsole />
    <LayoutMobileSidebar class="md:hidden" />
    <LayoutSidebar class="hidden md:flex" />
    <slot />
  </div>
</template>

