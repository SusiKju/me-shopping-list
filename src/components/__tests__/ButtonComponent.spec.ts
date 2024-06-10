import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ButtonComponent from '../ButtonComponent.vue'

describe('ButtonComponent', () => {

  it('emits click event when clicked', async () => {
    const wrapper = mount(ButtonComponent)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('has the correct class names', () => {
    const wrapper = mount(ButtonComponent)
    const button = wrapper.find('button')
    expect(button.classes()).toContain('mdl-button')
    expect(button.classes()).toContain('mdl-js-button')
    expect(button.classes()).toContain('mdl-button--raised')
  })
})
