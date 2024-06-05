import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputComponent from '../InputComponent.vue';

describe('InputComponent', () => {
  it('renders label correctly', () => {
    const wrapper = mount(InputComponent, {
      props: {
        id: 'name',
        label: 'Name',
        modelValue: ''
      }
    });
    expect(wrapper.find('label').text()).toBe('Name');
  });

  it('binds input value correctly', async () => {
    const wrapper = mount(InputComponent, {
      props: {
        id: 'name',
        label: 'Name',
        modelValue: 'John Doe'
      }
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('John Doe');
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(InputComponent, {
      props: {
        id: 'name',
        label: 'Name',
        modelValue: ''
      }
    });
    const input = wrapper.find('input');
    await input.setValue('Jane Doe');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Jane Doe']);
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(InputComponent, {
      props: {
        id: 'name',
        label: 'Name',
        modelValue: '',
        disabled: true
      }
    });
    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
  });

  it('enables input when disabled prop is false', () => {
    const wrapper = mount(InputComponent, {
      props: {
        id: 'name',
        label: 'Name',
        modelValue: '',
        disabled: false
      }
    });
    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(false);
  });
});