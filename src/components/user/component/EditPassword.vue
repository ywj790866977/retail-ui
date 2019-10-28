<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input :value="value" @change="handleChange" @pressEnter="check">
        <a-icon slot="addonAfter" type="check" @click="check" />
      </a-input>
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ '***' }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    checkpwd: Boolean
  },
  data() {
    return {
      value: this.text,
      editable: false
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      // console.log(value)
      this.value = value;
    },
    check() {
      let isok = true;
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,8}$/.test(this.value)) {
        isok = false;
        this.$emit("change", { status: isok, value: this.text });
      }else{
        this.editable = false;
        this.$emit("change", { status: isok, value: this.value });
      }

    },
    edit() {
      this.editable = true;
    }
  }
};
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
  /* width:50%; */
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
  line-height: 18px;
}

.editable-cell-icon:hover {
  color: #108ee9;
}

</style>
