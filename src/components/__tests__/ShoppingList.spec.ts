import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ShoppingListComponent from '../ShoppingList.vue'
import ButtonComponent from '../ButtonComponent.vue'
import ActionButton from '../ActionButton.vue'
import Chip from '../Chip.vue'
import type { ShoppingItem } from '../../views/ShoppingListView.vue'
describe('ShoppingListComponent', () => {
  // const items = () => <ShoppingItem[]>([
  //   { name: 'Apfel', quantity: 3, date: new Date(), isChecked: false },
  //   { name: 'Bier', quantity: 6, date: new Date(), isChecked: false }
  // ])

  const items: ShoppingItem[] = [
    { name: 'Apfel', quantity: 3, date: new Date(), isChecked: false },
    { name: 'Bier', quantity: 6, date: new Date(), isChecked: false }
  ]

  const removeFromListAction = vi.fn()
  const removeAllFromListAction = vi.fn()
  const checkAction = vi.fn()
  const editAction = vi.fn()

  it('renders the correct number of items', () => {
    const wrapper = mount(ShoppingListComponent, {
      props: {
        items,
        removeFromListAction,
        removeAllFromListAction,
        checkAction,
        editAction
      },
      global: {
        components: {
          ButtonComponent,
          ActionButton,
          Chip
        }
      }
    })
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(items.length)
  })

  it('displays the correct item names and quantities', () => {
    const wrapper = mount(ShoppingListComponent, {
      props: {
        items,
        removeFromListAction,
        removeAllFromListAction,
        checkAction,
        editAction
      },
      global: {
        components: {
          ButtonComponent,
          ActionButton,
          Chip
        }
      }
    })

    const rows = wrapper.findAll('tbody tr')
    rows.forEach((row, index) => {
      const columns = row.findAll('td')
      expect(columns[0].text()).toContain(items[index].name)
      expect(columns[1].text()).toBe(items[index].quantity.toString())
    })
  })

  it('emits removeFromListAction when action button is clicked', async () => {
    const wrapper = mount(ShoppingListComponent, {
      props: {
        items,
        removeFromListAction,
        removeAllFromListAction,
        checkAction,
        editAction
      },
      global: {
        components: {
          ButtonComponent,
          ActionButton,
          Chip
        }
      }
    })

    const actionButtons = wrapper.findAllComponents(ActionButton)
    await actionButtons[0].trigger('click')
    expect(removeFromListAction).toHaveBeenCalledWith(0)
  })

  it('emits removeAllFromListAction when remove all button is clicked', async () => {
    const wrapper = mount(ShoppingListComponent, {
      props: {
        items,
        removeFromListAction,
        removeAllFromListAction,
        checkAction,
        editAction
      },
      global: {
        components: {
          ButtonComponent,
          ActionButton,
          Chip
        }
      }
    })

    const removeAllButton = wrapper.findComponent(ButtonComponent)

    removeAllButton.find('button').trigger('click')
    await removeAllButton.trigger('click')
    expect(removeAllFromListAction).toHaveBeenCalled()
  })

  it('renders Chip component for item "Bier"', () => {
    const wrapper = mount(ShoppingListComponent, {
      props: {
        items,
        removeFromListAction,
        removeAllFromListAction,
        checkAction,
        editAction
      },
      global: {
        components: {
          ButtonComponent,
          ActionButton,
          Chip
        }
      }
    })

    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      if (item.name === 'Bier') {
        const chip = wrapper.findComponent(Chip)
        expect(chip.exists()).toBe(true)
      }
    }
  })
})
