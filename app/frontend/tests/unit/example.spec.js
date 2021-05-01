import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HomeHeader from '@/components/home/header/HomeHeader.vue'

describe('HomeHeader.vue', () => {
  it('renders props.title when passed', () => {
    const msg = 'Seafarers Cafe'
    const wrapper = shallowMount(HomeHeader, {
      propsData: { title: msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
