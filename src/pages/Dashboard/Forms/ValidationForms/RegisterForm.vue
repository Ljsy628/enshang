<template>
  <form>
    <card>
      <div slot="header">
        <h4 class="card-title">
          注册
        </h4>
      </div>
      <div>
         <fg-input name="requiredText"
                  label="用户名"
                  v-validate="modelValidations.requiredText"
                  v-model="model.requiredText"
                  :error="getError('requiredText')"
                  >
          <div slot="infoBlock">
          </div>
        </fg-input>

        <fg-input label="密码"
                  type="password"
                  name="password"
                  v-validate="modelValidations.password"
                  :error="getError('password')"
                  v-model="model.password">
        </fg-input>

        <fg-input label="重复密码"
                  type="password"
                  name="confirm"
                  v-validate="{
            required: true,
            is:model.password
          }"
                  :error="getError('confirm')"
                  v-model="model.confirmPassword">
        </fg-input>
          <fg-input name="requiredText"
                  label="昵称"
                  v-validate="modelValidations.requiredText"
                  v-model="model.coolname"
                  :error="getError('requiredText')">
          <div slot="infoBlock">
          </div>
        </fg-input>
         <div class="col-md-6">
            <h4 class="title">ddd </h4>
            <el-slider class="slider-success"
                       v-model="sliders.simple">
            </el-slider>
            <br>
       
          </div>
        <!-- <fg-input>
          <checkbox v-model="model.subscribe"
                    name="subscribe">Subscribe to newsletter
          </checkbox>
        </fg-input> -->
      </div>
      <div class="card-footer text-right">
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">注册</button>
      </div>

    </card>
  </form>
</template>
<script>
  import {Checkbox} from 'src/components/index'
  import { DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option } from 'element-ui'

  export default {
    components: {
      Checkbox
    },
    data () {
      return {
         sliders: {
          simple: 30,
          rangeSlider: [20, 50]
        },
        components:{
          [Slider.name]: Slider
        },
        model: {
          email: '',
          password: '',
          confirmPassword: '',
          subscribe: false,
          coolname:""
        },
        modelValidations: {
          requiredText: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            min: 5
          },
          
        }
      }
    },
    methods: {
      getError (fieldName) {
        console.log(this.errors)
        return this.errors.first(fieldName)
        
      },
      validate () {
  
        // console.log($validator)
        this.$validator.validateAll().then(isValid => {
          console.log(isValid)
          this.$emit('on-submit', this.registerForm, isValid)
        })
      }
    }
  }
</script>
<style>
</style>
