<template>
  <div class="w-1/3">
    <el-form ref="ruleFormRef" labelPosition="top" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="Title" prop="Title">
        <el-input v-model="ruleForm.Title" />
      </el-form-item>
      <el-form-item label="Year" prop="Year">
        <el-input v-model="ruleForm.Year" />
      </el-form-item>
      <el-form-item label="Director" prop="Director">
        <el-input v-model.number="ruleForm.Director" />
      </el-form-item>
      <el-form-item label="Poster" prop="Poster">
        <el-upload v-model:file-list="ruleForm.Poster" :limit="1" :auto-upload="false" list-type="picture-card">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useMoviesStore } from "~/stores/movies"
import { Plus } from "@element-plus/icons-vue"

const ruleFormRef = ref(null)
const router = useRouter()

const moviesStore = useMoviesStore()
const ruleForm = reactive({
  Title: "",
  Year: "",
  Director: "",
  Poster: [],
})

const rules = reactive({
  //easy validation, in real project better create composable for validation
  Title: [{ required: true, message: "Please input the title", trigger: "change" }],
  Year: [{ required: true, message: "Please input the year", trigger: "change" }],
  Director: [{ required: true, message: "Please input the Director", trigger: "change" }],
  //better add validation for size and type beforeImageLoad
  Poster: [{ required: true, message: "Please input the Poster", trigger: "change" }],
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let posterBlobUrl = ""
      if (ruleForm.Poster.length > 0 && ruleForm.Poster[0].raw) {
        posterBlobUrl = URL.createObjectURL(ruleForm.Poster[0].raw)
      }
      const params = { ...ruleForm, Poster: posterBlobUrl }

      moviesStore.createCustomMovie(params)

      router.push({ path: "/movies" })
    } else {
      return false
    }
  })
}
</script>
<style>
.el-upload-list > .is-ready + * {
  display: none;
}
</style>
