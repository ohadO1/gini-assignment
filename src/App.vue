<script setup lang="ts">
import { ref } from 'vue'
import { AREA_CODES, FORM_DATA_INITIAL_VALUE, FormFields, type form } from './types'

const formData = ref<form>(FORM_DATA_INITIAL_VALUE)

const handleSubmit = () => {
  const printedObj: { [key: string]: string } = {}

  for (let [key, { data }] of Object.entries(formData.value)) {
    if (key === 'phoneNumber') {
      data = formData.value.phoneNumber.area + data
    }
    printedObj[key] = data
  }
  console.log(printedObj)
}

const validateSubmit = (): boolean => {
  for (let [_, { didUserInteract, isValid }] of Object.entries(formData.value)) {
    if (didUserInteract && !isValid) return true
  }
  return false
}

const validateFields = (field: FormFields) => {
  const {
    value: { email, firstName, lastName, password, phoneNumber }
  } = formData

  switch (field) {
    case FormFields.FIRST_NAME:
      if (!firstName.didUserInteract) firstName.didUserInteract = true
      ;/^[a-zA-Z]{2,12}$/.test(firstName.data)
        ? (firstName.isValid = true)
        : (firstName.isValid = false)
      break
    case FormFields.LAST_NAME:
      if (!lastName.didUserInteract) lastName.didUserInteract = true
      ;/^[a-zA-Z]{2,12}$/.test(lastName.data)
        ? (lastName.isValid = true)
        : (lastName.isValid = false)
      break
    case FormFields.PASSWORD:
      if (!password.didUserInteract) password.didUserInteract = true
      ;/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/.test(password.data)
        ? (password.isValid = true)
        : (password.isValid = false)
      break
    case FormFields.EMAIL:
      if (!email.didUserInteract) email.didUserInteract = true
      ;/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.data)
        ? (email.isValid = true)
        : (email.isValid = false)
      break
    case FormFields.PHONE_NUMBER:
      if (!phoneNumber.didUserInteract) phoneNumber.didUserInteract = true
      ;/^\d{10}$/.test(phoneNumber.area + phoneNumber.data)
        ? (phoneNumber.isValid = true)
        : (phoneNumber.isValid = false)
      break
  }
}
</script>

<template>
  <form class="form-container" v-on:submit.prevent="handleSubmit">
    <div class="generic-input-container">
      <label class="input-label">First Name:</label>
      <input
        type="text"
        v-model="formData.firstName.data"
        @blur="validateFields(FormFields.FIRST_NAME)"
      />
      <div class="error-container">
        <p v-if="!formData.firstName.isValid && formData.firstName.didUserInteract" class="error-p">
          no numbers are allowed, 2-14 characters
        </p>
      </div>
    </div>
    <div class="generic-input-container">
      <label class="input-label">Last Name:</label>
      <input
        type="text"
        v-model="formData.lastName.data"
        @blur="validateFields(FormFields.LAST_NAME)"
        required
      />
      <div class="error-container">
        <p v-if="!formData.lastName.isValid && formData.lastName.didUserInteract" class="error-p">
          no numbers are allowed, 2-15 characters
        </p>
      </div>
    </div>
    <div class="generic-input-container">
      <label class="input-label">Password:</label>
      <input
        type="password"
        v-model="formData.password.data"
        @blur="validateFields(FormFields.PASSWORD)"
        required
      />
      <div class="error-container">
        <p v-if="!formData.password.isValid && formData.password.didUserInteract" class="error-p">
          should include letters, numbers and special characters
        </p>
      </div>
    </div>
    <div class="generic-input-container">
      <label class="input-label">Email:</label>
      <input
        type="email"
        v-model="formData.email.data"
        @blur="validateFields(FormFields.EMAIL)"
        required
      />
      <div class="error-container">
        <p v-if="!formData.email.isValid && formData.email.didUserInteract" class="error-p">
          should be a valid email
        </p>
      </div>
    </div>
    <div class="generic-input-container">
      <label class="input-label">Phone Number:</label>
      <div class="phone-num-inputs-container">
        <select class="select" v-model="formData.phoneNumber.area" name="area">
          <option v-for="areaCode in AREA_CODES" :key="areaCode">{{ areaCode }}</option>
        </select>
        <input
          type="number"
          class="phone-num-input"
          v-model="formData.phoneNumber.data"
          required
          @blur="validateFields(FormFields.PHONE_NUMBER)"
        />
      </div>
      <div class="error-container">
        <p
          v-if="!formData.phoneNumber.isValid && formData.phoneNumber.didUserInteract"
          class="error-p"
        >
          Should only contain numbers - exactly 7 digits
        </p>
      </div>
    </div>
    <button class="submit-btn" :disabled="validateSubmit()" type="submit">Submit</button>
  </form>
</template>

<style scoped>
.form-container {
  height: 70vh;
  width: 70%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  background-color: #f9f6ee;
  top: 20vh;
  margin: 0 auto;

  .generic-input-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 10rem;

    .error-container {
      height: 1.3rem;
      .error-p {
        margin: 0;
        font-size: 0.5rem;
        color: #ff3333;
      }
    }

    .phone-num-inputs-container {
      display: flex;
      gap: 0.3rem;
      .select {
        width: 30%;
      }
      .phone-num-input {
        width: 6rem;
      }
    }
  }
}
</style>
