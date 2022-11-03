import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { __decorate, symbolIterator, getParentNode } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, customElement } from "@polymer/decorators";

import "cl-polymer-element-helpers/ct-element-style.js";

let LHa = 1;
let HHa = new Map;
const ur = function(a, b, c) {
    let e = [];
    for (let f = 2; f < arguments.length; ++f)
        e[f - 2] = arguments[f];
    return GHa(a, function() {
        e.forEach(function(h) {
            b(h, a)
        })
    })
};

const vr = function(a) {
    let b = [];
    for ( let c = 0; c < arguments.length; ++c)
        b[c - 0] = arguments[c];
    b = symbolIterator(b);
    for (let c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        let e = HHa.get(c);
        if (!e)
            throw Error("Unknown token" + c);
        if (!e.stickyUpdaters)
            throw Error("Missing sticky updaters");
        if (!e.stickyUpdaters.has(c))
            throw Error("Unknown token " + c);
        e.stickyUpdaters.delete(c);
        0 === e.stickyUpdaters.size && (e.removeEventListener("scroll", e.scrollAndResizeListener),
        window.removeEventListener("resize", e.scrollAndResizeListener),
        delete e.scrollAndResizeListener);
        HHa.delete(c)
    }
};

const wr = function(a) {
    return function(b, c) {
        c.scrollTop > a ? b.setAttribute("stuck", "") : b.removeAttribute("stuck")
    }
};

const KHa = function(a) {
    return li(a, JHa) || void 0
};

const JHa = function(a) {
    if (a.nodeType !== Node.ELEMENT_NODE)
        return false;
    let b = getComputedStyle(a).overflow;
    return !!b && ["auto", "scroll", "overlay"].some(function(c) {
        return b.includes(c)
    })
};

const li = function(a, b) {
    let c = function(e) {
        return e ? b(e) ? e : c(getParentNode(e)) : null
    };
    return c(getParentNode(a))
};

const GHa = function(a, b) {
    let c = a.stickyUpdaters || new Map;
    a.stickyUpdaters = c;
    a.scrollAndResizeListener || (a.scrollAndResizeListener = function() {
        requestAnimationFrame(function() {
            c.forEach(function(f) {
                f()
            })
        })
    }
    ,
    a.addEventListener("scroll", a.scrollAndResizeListener),
    window.addEventListener("resize", a.scrollAndResizeListener));
    let e = LHa++;
    c.set(e, b);
    HHa.set(e, a);
    b();
    return e
};

let ctStickyHeaderTemplate;
let ctStickyHeaderTemplateDefault;
let ctStickyHeaderBase = mixinBehaviors([], PolymerElement);
class ctStickyHeader extends ctStickyHeaderBase {
    constructor() {
        super();
        this.optional = false;
    }
  	
    connectedCallback () {
        super.connectedCallback();
        let a = KHa(this);
        a && (this.stickyToken = ur(a, wr(0), this))
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this.stickyToken && (vr(this.stickyToken),
        this.stickyToken = 0)
    }

  	static get template() {
    	if (void 0 === ctStickyHeaderTemplate || null === ctStickyHeaderTemplate) {

            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host{
                    display: block;
                    position: sticky;
                    z-index: 3;
                    background: var(--ct-spec-background-color);
                    top: 0;
                    --header-shadow-color: rgba(0, 0, 0, .1);
                    --header-box-shadow-transition: box-shadow 333ms cubic-bezier(0.4, 0.0, 1, 1) 167ms;
                }

                :host[stuck] {
                    box-shadow: 0 1px 3px 0 var(--header-shadow-color);
                    transition: var(--header-box-shadow-transition);
                }
            </style>
            <slot></slot> 
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let b = template.content;
            let c = b.insertBefore;
            let d;
            if (void 0 == ctStickyHeaderTemplateDefault || null == ctStickyHeaderTemplateDefault) {
                d = clDefaultTemplate();
                ctStickyHeaderTemplateDefault = d
            }
            d = ctStickyHeaderTemplateDefault;
            c.call(b, d.content.cloneNode(true), template.content.firstChild);

            return ctStickyHeaderTemplate = template;
        }

        return ctStickyHeaderTemplate;
  	}
}

__decorate(
    [
        property({ type: Boolean })
    ], 
    ctStickyHeader.prototype, 
    "optional", 
    void 0
);

ctStickyHeader = __decorate([
    customElement("ct-sticky-header")
], ctStickyHeader);

export { ctStickyHeader };