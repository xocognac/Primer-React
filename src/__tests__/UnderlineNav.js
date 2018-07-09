import React from 'react'
import UnderlineNav from '../UnderlineNav'
import {mount, render, renderClasses} from '../utils/testing'

const rendersClass = (node, klass) => renderClasses(node).includes(klass)

describe('Caret', () => {
  it('renders a <nav>', () => {
    expect(render(<UnderlineNav />).type).toEqual('nav')
  })

  it('adds the UnderlineNav class', () => {
    expect(rendersClass(<UnderlineNav />, 'UnderlineNav')).toEqual(true)
  })

  it('respects the "align" prop', () => {
    expect(rendersClass(<UnderlineNav align="right" />, 'UnderlineNav--right')).toEqual(true)
  })

  it('respects the "full" prop', () => {
    expect(rendersClass(<UnderlineNav full />, 'UnderlineNav--full')).toEqual(true)
  })

  it('sets aria-label to the "label" prop', () => {
    expect(render(<UnderlineNav label="foo" />).props['aria-label']).toEqual('foo')
  })

  it('wraps its children in an "UnderlineNav-body" div', () => {
    const children = <b>yo</b>
    const wrapper = mount(<UnderlineNav>{children}</UnderlineNav>)
    const body = wrapper.find('.UnderlineNav-body')
    expect(body.exists()).toEqual(true)
    // FIXME this seems a bit brittle -- what if we added a class?
    expect(body.html()).toEqual('<div class="UnderlineNav-body"><b>yo</b></div>')
  })

  it('respects the "actions" prop', () => {
    const content = <h1>hi!</h1>
    const wrapper = mount(<UnderlineNav actions={content} />)
    const actions = wrapper.find('.UnderlineNav-actions')
    expect(actions.exists()).toEqual(true)
    expect(actions.text()).toEqual('hi!')
  })
})
