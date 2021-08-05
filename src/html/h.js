import * as vue from "vue";

function h(type, props, ...children) {
  const newProps = {};

  const directives = [];

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const result = /^v-(?<directiveName>[a-zA-Z_][0-9a-zA-Z_]*)$/.exec(key);
      if (!result) {
        newProps[key] = props[key];
      } else {
        const { directiveName } = result.groups;
        const directive =
          directiveName === "show"
            ? vue.vShow
            : vue.resolveDirective(directiveName);
        if (directive) {
          directives.push([directive, props[key]]);
        }
      }
    }
  }

  let slots = props?.["v-slots"];

  if (children.length === 1) {
    if (typeof children[0] === "function") {
      slots = slots ?? {};

      if (!slots.hasOwnProperty("default")) {
        slots.default = children[0];
      }
    }
  } else if (children.length === 0) {
    return vue.withDirectives(vue.h(type, newProps), directives);
  }

  return vue.withDirectives(
    vue.h(type, newProps, slots ? slots : children),
    directives
  );
}
export default h;
