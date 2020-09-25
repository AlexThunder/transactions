Vue.component("accordion", {
    props: {
        content: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            groupId: null
        };
    },
    template: `
    <dl class="accordion box" role="presentation">
      <accordion-item
        v-for="item in content"
        :item="item"
        :groupId="groupId"
        :key="item.id">
      </accordion-item>
    </dl>
  `,
    mounted() {
        this.groupId = this.$el.id;
    }
});



Vue.component("accordion-item", {
    props: ["item", "groupId"],
    template: `
    <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
      <dt class="accordion-item-title" >
        <button @click="toggle" class="accordion-item-trigger" :class="getTypeClassName(item)" >
          <h4 class="accordion-item-title-text">{{item.type}}   {{item.amount}}</h4>
          <span class="accordion-item-trigger-icon"></span>
        </button>
      </dt>
      <transition
        name="accordion-item"
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition">
        <dd v-if="item.active" class="accordion-item-details">
          <div v-html="getTransactionDetails(item)" class="accordion-item-details-inner"></div>
        </dd>
      </transition>
    </div>
  `,
    methods: {
        toggle(event) {
            this.$parent.$children.forEach((item, index) => {
                if (
                    item.$el.id === event.currentTarget.parentElement.parentElement.id
                )
                    item.item.active = !item.item.active;
                else item.item.active = false;
            });
        },

        startTransition(el) {
            el.style.height = el.scrollHeight + "px";
        },

        endTransition(el) {
            el.style.height = "";
        },

        getTransactionDetails(item) {
            return `<p>Your account was changed for ` + item.amount + `</p>`
        },

        getTypeClassName(item) {
            return item.type == "CREDIT" ? "accordion-item-trigger_credit" : "accordion-item-trigger_debit"
        }

    },
});



const transactionData = [
    { id: 1, active: false, type: "DEBIT", amount: 100.00 },
    { id: 2, active: false, type: "DEBIT", amount: 180.30 },
    { id: 3, active: false, type: "CREDIT", amount: 1000.00 },
    { id: 4, active: false, type: "DEBIT", amount: 105.00 },
    { id: 5, active: false, type: "DEBIT", amount: 100.00 },
    { id: 6, active: false, type: "CREDIT", amount: 300.00 },
    { id: 7, active: false, type: "DEBIT", amount: 100.00 }
]



new Vue({
    el: "#app",
    data: {
        example1: transactionData
    }
});
