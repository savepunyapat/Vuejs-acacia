<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { login } from '../services/authService';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const schema = toTypedSchema(
  yup.object({
    email: yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
    password: yup.string().required('กรุณากรอกรหัสผ่าน').min(3, 'รหัสผ่านต้องมีอย่างน้อย 3 ตัว')
  })
);
const { defineField, errors, meta, handleSubmit } = useForm({
  validationSchema: schema
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await login(values.email, values.password);

    if (response.status === 200) {
      console.log(response.data);
      localStorage.setItem('token', JSON.stringify(response.data.response.access_token));
      toast.success('เข้าสู่ระบบสำเร็จ');
      router.replace({ name: 'd-index-view' });
    } else {
      toast.error(response.data.response.message);
    }
  } catch (error: any) {
    toast.error('เข้าสู่ระบบไม่สำเร็จ');
  }
});
</script>

<template>
  <SiteHeader />
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" novalidate @submit.prevent="onSubmit">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="email"
                v-bind="emailAttrs"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <p v-if="errors.email && meta.touched" class="text-sm text-red-800 mt-2">
              {{ errors.email }}
            </p>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                v-bind="passwordAttrs"
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p v-if="errors.password && meta.touched" class="text-sm text-red-800 mt-2">
                {{ errors.password }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
