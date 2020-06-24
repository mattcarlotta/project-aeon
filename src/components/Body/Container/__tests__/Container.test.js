import Container from "../index";

const wrapper = mount(
  <Container>
    <p>children</p>
  </Container>
);

describe("Container", () => {
  it("renders without errors", () => {
    expect(wrapper.find("p").exists()).toBeTruthy();
  });
});
