<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue';
import { onMounted, ref } from 'vue';
import { http } from '../services/services.ts';
const categories = ref<any>([]);
const getAllCategories = async () => {
  const response = await http.get('/v1/categories');
  console.log(response.data);
  categories.value = response.data;
  console.log(categories.value[1]);
};
onMounted(() => {
  getAllCategories();
});
</script>
<template>
  <SiteHeader />
  <div class="mx-auto w-5/6 content-center flex-1">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 class="text-xl font-bold my-5 text-center">ประเภทสินค้า</h1>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3 text-lg">id ประเภทสินค้า</th>
            <th scope="col" class="px-6 py-3 text-lg">ชื่อประเภทสินค้า</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ category.id }}
            </th>
            <td class="px-6 py-4">
              {{ category.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
