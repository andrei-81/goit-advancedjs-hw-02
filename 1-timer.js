import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as l,i as s}from"./assets/vendor-BbbuE1sJ.js";const m={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e,t){o=e[0].getTime(),a.disabled=!1}};var o=Date.now();const y=document.querySelector("#datetime-picker");document.querySelector(".value");const n={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")},a=document.querySelector("[data-start]");let r=null;function f(e){const c=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),i=Math.floor(e%864e5%36e5/6e4),d=Math.floor(e%864e5%36e5%6e4/1e3);return{days:c,hours:u,minutes:i,seconds:d}}l(y,m);a.addEventListener("click",function(){if(a.disabled=!0,clearInterval(r),Date.now()>=o){s.error({title:"Wrong date",message:"Please choose a date in the future"});return}r=setInterval(()=>{const e=f(o-Date.now());if(Date.now()>=o)clearInterval(r),s.success({title:"Done",message:"Time!"});else for(const t in n)n[t]&&(n[t].textContent=e[t])},1e3)});
//# sourceMappingURL=1-timer.js.map