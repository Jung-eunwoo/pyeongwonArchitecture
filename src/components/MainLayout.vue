<template>
  <div>
    <header>
      <h1>평원건축</h1>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>© 2025 평원건축. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style scoped>
header {
  background: #d52e38;
  color: white;
  padding: 1rem;
  text-align: center;
}

footer {
  background: #f8f9fa;
  color: #333;
  padding: 1rem;
  text-align: center;
}
</style>
