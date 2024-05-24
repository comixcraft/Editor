# How to create a component

## General Structure

All the components are structured like so:
1. script **setup**
2. template
3. style **scoped**


### Keep in mind

When creating a component, there are a few things to keep in mind:
- Some component are a **representation of a class**, therefore all **methods from that class should be called from there**.
- **Prop stability**: https://www.youtube.com/watch?v=S2wj8VX9O0M&ab_channel=LearnVue
- Look at the **props that already exist** before adding a new one.
- **Functions should be defined and used where the operation it does takes place**. (e.g.: add something to the panel should be on happen on the panel class and on the WrapperCanvas component)
- Use v-once for static elements (https://vuejs.org/api/built-in-directives.html#v-once)

## Script setup

- The elements of each part of the script should be ordered alphabetically.

The script setup tag should be ordered as follow

- Imports
- definePageMeta (Middlewares)
- defineEmits (emits)
- defineProps (props)
- Static Variables
- Reactive Variables
  - computed variables
  - reactives
  - refs
- Watchers
- Methods
- bus listeners
- Vue life cycle hooks
- defineExpose 

## Template

The template of a component should stay as clean as possible. here are a few rules to achieve that:
- Use **html tags** instead of div tags
- When calling a component, oder the attribute of the component so:
  - ref
  - v-if / v-for
  - props (alphabetically ordered)
  - emits (@) (alphabetically ordered)
- When using a tag, order the attribute so:
  - ref
  - v-if / v-for
  - class (alphabetically ordered)
  - :class
  - events (@) (alphabetically ordered)
  - others (alphabetically ordered)

## Style scoped

- The Style of a component has to be declared as scoped and with the scss lang attribute.
- Use **BEM** to name your elements (https://getbem.com/)
- Use **SCSS** to keep your code clean (https://sass-lang.com/)
- Use first the parent element to place the children elements thanks to **display**
- Use **Flex** first, Grid only if necessary

## Code Template

```
<script setup>
    // Imports

    // Middlewares

    // Emits 

    // Props

    // Static Variables (let, const)

    // Reactive Variables
        // computed

        // Reactive

        // Refs
    
    // Watchers

    // Methods

    // Bus Listeners

    // Vue life cycle hooks

    // expose (defineExpose)

</script>

<template>
    <div>
        <!-- HTML -->
    </div>
</template>

<style scoped lang="scss">
    /* SCSS */

</style>
```