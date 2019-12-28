import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import SectionContainer from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<SectionContainer />).toJSON()

  expect(tree).toMatchSnapshot()
})
