import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import SectionHeader from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<SectionHeader />).toJSON()

  expect(tree).toMatchSnapshot()
})
