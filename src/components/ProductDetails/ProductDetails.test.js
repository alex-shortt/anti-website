import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import ProductDetails from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<ProductDetails />).toJSON()

  expect(tree).toMatchSnapshot()
})
