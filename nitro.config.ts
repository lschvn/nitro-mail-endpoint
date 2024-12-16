//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",

  runtimeConfig: {
    smtp_host: "",
    smtp_port: "",
    smtp_user: "",
    smtp_password: "",
    auth_key: "",
  },

  compatibilityDate: "2024-12-16"
});