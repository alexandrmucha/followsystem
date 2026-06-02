<script lang="ts" setup>
const route = useRoute()

definePageMeta({
  middleware: 'auth',
})

await navigateTo({ path: '/search', query: route.query }, { replace: true })
</script>