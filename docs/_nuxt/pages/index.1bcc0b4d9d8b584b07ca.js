webpackJsonp([0],{"+G+D":function(t,e,s){"use strict";var i=s("Dd8w"),o=s.n(i),a=s("NYxO");e.a={computed:o()({fullCircles:function(){return Math.min(this.completed,this.goal)},shouldShowHalfCircle:function(){return this.isPomActive&&this.completed<this.goal},emptyCircles:function(){var t=this.goal-this.completed,e=this.shouldShowHalfCircle?t-1:t;return Math.max(e,0)},extras:function(){return Math.max(this.completed-this.goal,0)}},Object(a.mapState)(["goal","completed"]),Object(a.mapGetters)(["isPomActive"]))}},"+ptz":function(t,e,s){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return this.isLoading?e("div"):e("div",{staticClass:"container fade-in"},[e("page-title"),e("timer",{class:this.hasNonMobileClass("is-flex-between"),on:{"toggle-toolbar":this.toggleToolbar}}),e("progress-tracker",{class:this.hasMobileClass("has-large-h-pad")}),e("toolbar",{class:this.animateToolbar}),e("preference-box",{class:[this.hasMobileClass("is-flex-centered"),this.animateToolbar]})],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},"/StQ":function(t,e,s){"use strict";var i=s("bOdI"),o=s.n(i),a=s("Etqc");e.a={mixins:[a.a],data:function(){return{showPrefTitle:!1,showPreferences:!1}},computed:{autostart:{get:function(){return this.$store.state.preferences.autostart},set:function(t){this.$store.dispatch("preferences/setAutostart",{value:t})}},shouldNotify:{get:function(){return this.$store.state.preferences.shouldNotify},set:function(t){this.$store.dispatch("preferences/setShouldNotify",{value:t})}},shouldShowTimerInTitle:{get:function(){return this.$store.state.preferences.shouldShowTimerInTitle},set:function(t){this.$store.dispatch("preferences/setShouldShowTimer",{value:t})}},shouldShowToolbar:{get:function(){return this.$store.state.preferences.shouldShowToolbar},set:function(t){this.$store.dispatch("preferences/setShouldShowToolbar",{value:t})}},fadePrefTitle:function(){return{"fade-in-left":this.showPrefTitle,"fade-out-left":!this.showPrefTitle}},prefTitleText:function(){return this.showPreferences?"Preferences":"Show Preferences"},animatePreferences:function(){return{"reveal-top-left":this.showPreferences,"hide-top-left":!this.showPreferences}},hasNotifications:function(){return"mobile"!==this.$mq&&!!Notification}},methods:{hasMobileClass:function(t){return o()({},t,"mobile"===this.$mq)},togglePreferences:function(){this.showPreferences=!this.showPreferences,this.showPreferences&&(this.showPrefTitle=!1)},togglePrefTitle:function(){this.showPrefTitle=!0,this.showPreferences&&(this.showPrefTitle=!1)}},mounted:function(){"mobile"===this.$mq&&(this.showPreferences=!0)}}},"/TYz":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("98yP"),o=s("+ptz"),a=!1;var r=function(t){a||s("yalg")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="pages/index.vue",e.default=n.exports},"03t6":function(t,e,s){"use strict";var i=s("/StQ"),o=s("p8jy"),a=!1;var r=function(t){a||s("OCDx")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="components/preference-box.vue",e.a=n.exports},"0SBZ":function(t,e,s){var i=s("MidZ");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("0efb71b3",i,!1,{sourceMap:!1})},"2fwX":function(t,e,s){var i=s("NDtO");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("306f2ab6",i,!1,{sourceMap:!1})},"5qw9":function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,"",""])},"98yP":function(t,e,s){"use strict";var i=s("Xxa5"),o=s.n(i),a=s("//Fk"),r=s.n(a),n=s("exGp"),l=s.n(n),c=s("rvLI"),u=s("aUIQ"),h=s("n5N8"),f=s("lIAb"),d=s("03t6"),m=s("Etqc");e.a={mixins:[m.a],components:{PageTitle:c.a,ProgressTracker:u.a,Timer:h.a,Toolbar:f.a,PreferenceBox:d.a},data:function(){return{showToolbar:!0,isLoading:!0}},computed:{animateToolbar:function(){return{"fade-in":this.showToolbar,"fade-out":!this.showToolbar}}},methods:{toggleToolbar:function(){this.showToolbar=!this.showToolbar}},mounted:function(){var t=l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$store.dispatch("initialize"),t.next=3,this.$store.dispatch("preferences/initialize");case 3:return this.showToolbar=this.$store.state.preferences.shouldShowToolbar,"mobile"===this.$mq&&(this.showToolbar=!0),t.next=7,new r.a(function(t){return setTimeout(t,200)});case 7:this.isLoading=!1;case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},CwFh:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"circle-container is-flex-centered"},[t._l(t.fullCircles,function(t){return s("span",{key:t+"full",staticClass:"circle"})}),t.shouldShowHalfCircle?s("span",{staticClass:"circle"},[s("span",{staticClass:"is-full-half"}),s("span",{staticClass:"is-empty-half"})]):t._e(),t._l(t.emptyCircles,function(t){return s("span",{key:t,staticClass:"circle is-empty"})}),t.extras>0?s("span",{staticClass:"circle-text"},[t._v(t._s("+"+t.extras))]):t._e()],2)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},DLal:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"is-flex-centered"},["mobile"!==t.$mq?s("button",{staticClass:"button is-medium is-spacer"},[s("font-awesome-icon",{staticClass:"primary icon",attrs:{icon:"chevron-down"}})],1):t._e(),s("div",{staticClass:"has-large-t-pad has-med-v-pad"},[s("h1",{staticClass:"is-huge is-number",class:t.hasMobileClass("is-less-huge"),on:{click:t.toggleBlock}},[t._v(t._s(t.parsedTime))]),s("progress",{staticClass:"progress is-small",class:t.progressColor,attrs:{max:"100"},domProps:{value:t.blockProgress}},[t._v(t._s(t.blockProgress+"%"))])]),"mobile"!==t.$mq?s("button",{staticClass:"button is-medium show-button",on:{click:t.toggleToolbar}},[s("font-awesome-icon",{staticClass:"primary icon",attrs:{icon:"chevron-down"}})],1):t._e()])};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},Etqc:function(t,e,s){"use strict";var i=s("bOdI"),o=s.n(i);e.a={methods:{hasMobileClass:function(t){return o()({},t,"mobile"===this.$mq)},hasNonMobileClass:function(t){return o()({},t,"mobile"!==this.$mq)}}}},IKgT:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"level"},[s("div",{staticClass:"level-left"},[s("div",{staticClass:"level-item has-text-centered"},[s("div",{staticClass:"has-small-h-pad"},[s("p",{staticClass:"heading"},[t._v("Goal Today")]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{staticClass:"input title has-text-centered",attrs:{type:"number",min:"1",max:"16",pattern:"\\d*"},domProps:{value:t.goal},on:{change:t.changeGoal}})])])]),s("div",{staticClass:"buttons"},[s("button",{staticClass:"button is-large is-primary",on:{click:t.toggleBlock}},[s("font-awesome-icon",{attrs:{icon:t.startStopIcon,size:"lg"}})],1),s("button",{staticClass:"button is-large is-info",on:{click:t.resetBlock}},[s("font-awesome-icon",{attrs:{icon:"redo",size:"lg"}})],1)])])]),s("div",{staticClass:"level-right"},[s("div",{staticClass:"level-item"},[s("div",{staticClass:"buttons has-addons"},[s("button",{staticClass:"button",class:t.isBlockActive(t.isBlockTypePomodoro),on:{click:t.changeToPomodoro}},[t._v("Pomodoro")]),s("button",{staticClass:"button",class:t.isBlockActive(t.isBlockTypeShortBreak),on:{click:t.changeToShortBreak}},[t._v("Short Break")]),s("button",{staticClass:"button",class:t.isBlockActive(t.isBlockTypeLongBreak),on:{click:t.changeToLongBreak}},[t._v("Long Break")])])])])])};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},K8t9:function(t,e,s){var i=s("jmAJ");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("1bfdb264",i,!1,{sourceMap:!1})},MidZ:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".logo{height:4rem}.page-title{font-size:3rem;font-weight:300;padding:1rem}",""])},NDtO:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,"",""])},OCDx:function(t,e,s){var i=s("5qw9");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("015761f0",i,!1,{sourceMap:!1})},OhhH:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".show-button{align-self:end;margin-bottom:3.5rem}.has-med-v-pad{padding:1rem 0}.has-large-t-pad{padding-top:4rem}.is-huge{font-size:10rem;line-height:1}.is-less-huge{font-size:8rem}.is-number{font-family:Arial,monospace}",""])},TDej:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".has-small-h-pad{padding:0 .5rem}.has-large-h-pad{padding:0 3rem}.input.title{width:5.5rem;height:inherit;padding-top:0;padding-bottom:0;line-height:1}.is-flex-centered{display:flex;justify-content:center;align-items:center}.is-flex-between{display:flex;justify-content:space-between;align-items:center}.primary.icon{color:#00d1b2;pointer-events:none}.pane{border-radius:.5rem;width:20rem;padding:.5rem;background-color:#f5f5f5}.overlay-container{position:relative}.overlay{position:absolute;padding:.5rem;z-index:2}.is-spacer{visibility:hidden}.fade-in-left{-webkit-animation:fade-in-left .3s cubic-bezier(.39,.575,.565,1) both;animation:fade-in-left .3s cubic-bezier(.39,.575,.565,1) both;pointer-events:none}.fade-out-left{-webkit-animation:fade-out-left .3s cubic-bezier(.25,.46,.45,.94) both;animation:fade-out-left .3s cubic-bezier(.25,.46,.45,.94) both}.fade-in{-webkit-animation:fade-in .3s cubic-bezier(.39,.575,.565,1) both;animation:fade-in .3s cubic-bezier(.39,.575,.565,1) both}.fade-out{-webkit-animation:fade-out .3s cubic-bezier(.39,.575,.565,1) both;animation:fade-out .3s cubic-bezier(.39,.575,.565,1) both}.reveal-top-left{transform-origin:left;animation:reveal-text cubic-bezier(.785,.135,.15,.86) .3s forwards}.hide-top-left{transform-origin:left;animation:hide-text cubic-bezier(.785,.135,.15,.86) .3s forwards}.reveal-color{transform-origin:left;animation:reveal-color cubic-bezier(.785,.135,.15,.86) .3s forwards}.hide-color{transform-origin:left;animation:hide-color cubic-bezier(.785,.135,.15,.86) .3s forwards}@-webkit-keyframes fade-in-left{0%{-webkit-transform:translateX(-10px);transform:translateX(-10px);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes fade-in-left{0%{-webkit-transform:translateX(-10px);transform:translateX(-10px);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes fade-out-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-10px);transform:translateX(-10px);opacity:0}}@keyframes fade-out-left{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-10px);transform:translateX(-10px);opacity:0}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes reveal-text{0%{clip-path:inset(0 100% 100% 0)}to{clip-path:inset(0 0 0 0)}}@keyframes hide-text{0%{clip-path:inset(0 0 0 0)}to{clip-path:inset(0 100% 100% 0)}}@keyframes reveal-color{0%{background-color:#fff}to{background-color:#f5f5f5}}@keyframes hide-color{0%{background-color:#f5f5f5}to{background-color:#fff}}",""])},TFyB:function(t,e,s){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"is-flex-centered has-text-centered"},[e("document-title",{attrs:{title:this.title}}),e("img",{staticClass:"logo",attrs:{src:s("sLcH")}}),e("h1",{staticClass:"title page-title"},[this._v("PandaPom")])],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.a=o},aUIQ:function(t,e,s){"use strict";var i=s("+G+D"),o=s("CwFh"),a=!1;var r=function(t){a||s("K8t9")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="components/progress-tracker.vue",e.a=n.exports},fQXM:function(t,e,s){"use strict";var i=s("Dd8w"),o=s.n(i),a=s("NYxO"),r=s("tQ84");e.a={components:{DocumentTitle:r.a},computed:o()({parsedTime:function(){var t=Math.floor(this.time/60),e=this.time%60;return(t<10?"0"+t:t)+":"+(e<10?"0"+e:e)},title:function(){return this.isBlockStateActive&&this.shouldShowTimerInTitle?"("+this.parsedTime+") PandaPom":"PandaPom"},shouldShowTimerInTitle:function(){return this.$store.state.preferences.shouldShowTimerInTitle}},Object(a.mapGetters)(["isBlockStateActive"]),Object(a.mapState)(["time"]))}},hEv7:function(t,e,s){"use strict";var i=s("Dd8w"),o=s.n(i),a=s("NYxO");e.a={computed:o()({startStopIcon:function(){return this.isBlockStateActive?"pause":"play"}},Object(a.mapState)(["goal"]),Object(a.mapGetters)(["isBlockStateActive","isBlockTypePomodoro","isBlockTypeLongBreak","isBlockTypeShortBreak"])),methods:o()({isBlockActive:function(t){return{"is-primary is-selected is-outlined":t}},changeGoal:function(t){var e=t.target.value,s=parseInt(e||"0");this.setGoal({goal:s>0?s:1})}},Object(a.mapActions)(["setGoal","resetBlock","toggleBlock","changeToPomodoro","changeToLongBreak","changeToShortBreak"]))}},jmAJ:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".circle-container{display:flex;padding-bottom:1rem;flex-wrap:wrap}.circle{width:2rem;height:2rem;background-color:#00d1b2;border-radius:50%;border:2px solid #00d1b2;margin:.25rem;overflow:hidden;display:flex}.is-empty,.is-empty-half{background-color:#fff}.is-empty-half,.is-full-half{display:inline-block;height:2rem;width:1rem}.circle-text{line-height:2.5rem;font-size:1.5rem;color:#00d1b2;font-weight:700}",""])},lIAb:function(t,e,s){"use strict";var i=s("hEv7"),o=s("IKgT"),a=!1;var r=function(t){a||s("2fwX")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="components/toolbar.vue",e.a=n.exports},m1TK:function(t,e,s){"use strict";e.a={name:"document-title",props:["title"],mounted:function(){document.title=this.title},watch:{title:function(){document.title=this.title}},render:function(){}}},n5N8:function(t,e,s){"use strict";var i=s("qQ9C"),o=s("DLal"),a=!1;var r=function(t){a||s("qmCj")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="components/timer.vue",e.a=n.exports},p8jy:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"overlay-container"},[s("div",{staticClass:"level is-mobile overlay"},[s("div",{staticClass:"level-left"},[s("div",{staticClass:"level-item"},[s("button",{staticClass:"button is-medium",class:t.hasMobileClass("is-static"),on:{click:t.togglePreferences,mouseover:t.togglePrefTitle,mouseout:function(e){t.showPrefTitle=!1}}},[s("font-awesome-icon",{staticClass:"primary icon",attrs:{icon:"cog"}})],1)]),s("div",{staticClass:"level-item",class:t.fadePrefTitle},[s("span",{staticClass:"is-size-4"},[t._v("Show Preferences")])])])]),s("div",{staticClass:"pane",class:t.animatePreferences},[s("div",{staticClass:"level is-mobile"},[s("div",{staticClass:"level-left"},[s("div",{staticClass:"level-item"},[s("button",{staticClass:"button is-medium is-spacer"},[s("font-awesome-icon",{staticClass:"primary icon",attrs:{icon:"cog"}})],1)]),t._m(0)])]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.autostart,expression:"autostart"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.autostart)?t._i(t.autostart,null)>-1:t.autostart},on:{change:function(e){var s=t.autostart,i=e.target,o=!!i.checked;if(Array.isArray(s)){var a=t._i(s,null);i.checked?a<0&&(t.autostart=s.concat([null])):a>-1&&(t.autostart=s.slice(0,a).concat(s.slice(a+1)))}else t.autostart=o}}}),t._v("\n          Auto-start pomodoros and breaks?\n        ")])])]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.shouldShowTimerInTitle,expression:"shouldShowTimerInTitle"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.shouldShowTimerInTitle)?t._i(t.shouldShowTimerInTitle,null)>-1:t.shouldShowTimerInTitle},on:{change:function(e){var s=t.shouldShowTimerInTitle,i=e.target,o=!!i.checked;if(Array.isArray(s)){var a=t._i(s,null);i.checked?a<0&&(t.shouldShowTimerInTitle=s.concat([null])):a>-1&&(t.shouldShowTimerInTitle=s.slice(0,a).concat(s.slice(a+1)))}else t.shouldShowTimerInTitle=o}}}),t._v("\n          Show timer in page title?\n        ")])])]),t.hasNotifications?s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.shouldNotify,expression:"shouldNotify"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.shouldNotify)?t._i(t.shouldNotify,null)>-1:t.shouldNotify},on:{change:function(e){var s=t.shouldNotify,i=e.target,o=!!i.checked;if(Array.isArray(s)){var a=t._i(s,null);i.checked?a<0&&(t.shouldNotify=s.concat([null])):a>-1&&(t.shouldNotify=s.slice(0,a).concat(s.slice(a+1)))}else t.shouldNotify=o}}}),t._v("\n          Browser notifications?\n        ")])])]):t._e(),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.shouldShowToolbar,expression:"shouldShowToolbar"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.shouldShowToolbar)?t._i(t.shouldShowToolbar,null)>-1:t.shouldShowToolbar},on:{change:function(e){var s=t.shouldShowToolbar,i=e.target,o=!!i.checked;if(Array.isArray(s)){var a=t._i(s,null);i.checked?a<0&&(t.shouldShowToolbar=s.concat([null])):a>-1&&(t.shouldShowToolbar=s.slice(0,a).concat(s.slice(a+1)))}else t.shouldShowToolbar=o}}}),t._v("\n          Show toolbar on page load?\n        ")])])])])])};i._withStripped=!0;var o={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"level-item"},[e("span",{staticClass:"is-size-4"},[this._v("Preferences")])])}]};e.a=o},qQ9C:function(t,e,s){"use strict";var i=s("bOdI"),o=s.n(i),a=s("Dd8w"),r=s.n(a),n=s("NYxO"),l=s("Etqc");e.a={mixins:[l.a],computed:r()({parsedTime:function(){var t=Math.floor(this.time/60),e=this.time%60;return(t<10?"0"+t:t)+":"+(e<10?"0"+e:e)},blockProgress:function(){return this.isBlockStateTransition?100:100-this.time/this.blockLength*100},progressColor:function(){return{"is-primary":!this.isBlockStateTransition,"is-info":this.isBlockStateTransition}}},Object(n.mapGetters)(["isBlockStateTransition"]),Object(n.mapState)(["time","blockLength"])),methods:r()({},Object(n.mapActions)(["toggleBlock"]),{toggleToolbar:function(){this.$emit("toggle-toolbar")},hasMobileClass:function(t){return o()({},t,"mobile"===this.$mq)}})}},qmCj:function(t,e,s){var i=s("OhhH");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("ce46dcfc",i,!1,{sourceMap:!1})},rvLI:function(t,e,s){"use strict";var i=s("fQXM"),o=s("TFyB"),a=!1;var r=function(t){a||s("0SBZ")},n=s("VU/8")(i.a,o.a,!1,r,null,null);n.options.__file="components/page-title.vue",e.a=n.exports},sLcH:function(t,e,s){t.exports=s.p+"img/panda.69e05d5.png"},tQ84:function(t,e,s){"use strict";var i=s("m1TK"),o=s("VU/8")(i.a,null,!1,null,null,null);o.options.__file="components/document-title.vue",e.a=o.exports},yalg:function(t,e,s){var i=s("TDej");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("150e7c18",i,!1,{sourceMap:!1})}});