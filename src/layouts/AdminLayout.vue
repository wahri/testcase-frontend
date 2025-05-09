<template>
  <div class="wrapper">
    <Sidebar />
    <Header />
    <!--start page wrapper -->
    <div class="page-wrapper">
      <div class="page-content">
        <slot />
      </div>
    </div>
    <!--end page wrapper -->

    <a href="javaScript:;" class="back-to-top"><i class="bx bxs-up-arrow-alt"></i></a>

    <Footer />
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
