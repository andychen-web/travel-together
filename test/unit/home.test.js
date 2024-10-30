import renderer from "react-test-renderer";
// import Link from "../Link";
import HomePage from "../../src/pages/HomePage/HomePage.jsx";
it("changes the class when hovered", () => {

  const component = renderer.create(<HomePage></HomePage>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
