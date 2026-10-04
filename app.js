const buttons=document.querySelectorAll("[data-section]");
buttons.forEach(button=>button.addEventListener("click",()=>navigate(button.dataset.section)));
function navigate(section){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.section===section));
 const targets={marks:"marks",tides:"conditions",weather:"conditions",submit:"submit",home:null};
 if(targets[section]) document.getElementById(targets[section]).scrollIntoView({behavior:"smooth",block:"start"});
 else window.scrollTo({top:0,behavior:"smooth"});
}
document.getElementById("search").addEventListener("input",e=>{
 // Search will be connected to the real fishing-mark database in the next build stage.
 if(e.target.value.trim()) console.log("Search:",e.target.value);
});