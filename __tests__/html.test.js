import {
  defineComponent,
  Fragment,
  Directive,
} from "vue";
import { mount } from "@vue/test-utils";
import html from "../src/html";

jest.spyOn(global.console, "log")

describe("html", () => {
  test("returns vnode", () => {
    const wrapper = mount(() => html`<div>Hello World</div>`);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("supports Fragment", () => {
    const wrapper = mount(
      () =>
        html`<${Fragment}
          ><div>Hello World</div>
          <div>Hello World</div><//
        >`
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("supports custom components", () => {
    const TestComponent = defineComponent({
      template: "<div>Hello World</div>",
    });
    const wrapper = mount(() => html`<${TestComponent} />`);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("supports v-show", () => {
    const wrapper = mount(() => html`<div v-show=${false}>Hello World</div>`);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("suports custom directives", () => {

    /**
     * @type Directive<any, string>
     */
    const directive = {
      mounted(_, { value }) {
        console.log(`Hello ${value}`)
      }
    }

    const spy = jest.spyOn(global.console, "log").mockImplementation(() => {})
  
    const wrapper = mount(() => html`<div v-greeting="World">Hello World</div>`, {
      global: {
        directives: { 'greeting': directive }
      }
    });
    expect(spy).toHaveBeenCalledWith("Hello World")
    expect(wrapper.html()).toMatchSnapshot();

    spy.mockRestore();
  });

})





