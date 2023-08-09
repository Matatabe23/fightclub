<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-icon"></div>
  </div>
</template>

<script>
export default {
	name: 'TheLoadingComponent',
  data() {
    return {
      isLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.isLoading = true;
      // Эмулируем задержку загрузки данных
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
  }
};
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #555;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
