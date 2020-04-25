<template>
  <modal size="s" :title="title" :show="show" @close="$emit('cancel')">
    <template slot="body">
      <slot></slot>
    </template>
    <template slot="buttons">
      <custom-button style="margin-right: 10px" type="primary" @click="$emit('confirm')">Confirm</custom-button>
      <custom-button type="secondary" @click="$emit('cancel')">Cancel</custom-button>
    </template>
  </modal>
</template>

<script>
export default {
    name: 'confirmation-dialog',
    props: {
        title: String,
        show: Boolean
    },
};
</script>

<style>
</style>