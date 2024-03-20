import { ref, watch, createVNode, render } from 'vue';

// dynamic elements
const elementsInCanvas = ref([]);

// functions
function renderComponent({ el, component, props, appContext }) {
  let vnode = createVNode(component, props)
  vnode.appContext = { ...appContext } // must spread new object here
  render(vnode, el)

  return () => {

  }
}

export {renderComponent, elementsInCanvas};