<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @mousedown.self="close">
        <div class="overlay">
          <header class="flex flex-row items-center justify-between gap-4">
            <h2>
              {{ title }}
            </h2>
            <button @mousedown="close">
              <icon name="ph:x-bold" size="30" class="text-muted-foreground" />
            </button>
          </header>

          <section class="m-4">
            <slot />
          </section>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: "Dialog Title",
  },
})

const emit = defineEmits(["update:isOpen", "confirm"])

function close() {
  emit("update:isOpen", false)
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape" && props.isOpen) {
    close()
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscape)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
