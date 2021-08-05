import { ref, defineComponent, createApp } from "vue";
import html from "./html";

const App = defineComponent({
  setup() {
    const count = ref(0);

    const onInc = () => {
      count.value++;
    };

    const onDec = () => {
      if (count.value > 0) {
        count.value--;
      }
    };

    return () => {
      return html`<div>
        <p>count: ${count.value}</p>
        <button onClick=${onDec}>-</button><button onClick=${onInc}>+</button>
      </div>`;
    };
  },
});

const app = createApp(App);

app.mount(document.getElementById("app"));
