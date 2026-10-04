const buttons=document.querySelectorAll("[data-section]");
buttons.forEach(button=>button.addEventListener("click",()=>navigate(button.dataset.section)));

let allMarks=[];

function navigate(section){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.section===section));
 const targets={marks:"marks",tides:"conditions",weather:"conditions",submit:"submit",home:null};
 if(targets[section]) document.getElementById(targets[section]).scrollIntoView({behavior:"smooth",block:"start"});
 else window.scrollTo({top:0,behavior:"smooth"});
}

async function loadMarks(){
 const container=document.querySelector(".marks-list");
 if(!container) return;
 try{
  const response=await fetch("data/marks.json");
  if(!response.ok) throw new Error("Could not load mark data");
  const data=await response.json();
  allMarks=Array.isArray(data.marks)?data.marks:[];
  renderMarks(allMarks);
 }catch(error){
  container.innerHTML='<div class="empty-state"><strong>Fishing marks unavailable</strong><p>Mark data could not be loaded. No unverified information has been added as a fallback.</p></div>';
 }
}

function renderMarks(marks){
 const container=document.querySelector(".marks-list");
 if(!container) return;

 if(!marks.length){
  container.innerHTML='<div class="empty-state"><strong>No fishing marks added yet</strong><p>Verified fishing marks will appear here once they have been independently checked.</p></div>';
  return;
 }

 container.innerHTML=marks.map(mark=>{
  const label=mark.status==="verified"?"Verified mark":"Community submission — unverified";
  const className=mark.status==="verified"?"verified":"unverified";
  return '<article class="mark-card"><div class="mark-card-top"><span class="status-badge '+className+'">'+label+'</span></div><h3>'+escapeHtml(mark.name||"Unnamed mark")+'</h3><p>'+escapeHtml(mark.description||"No description provided.")+'</p></article>';
 }).join("");
}

function escapeHtml(value){
 return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

document.getElementById("search").addEventListener("input",e=>{
 const query=e.target.value.trim().toLowerCase();
 if(!query){
  renderMarks(allMarks);
  return;
 }
 const filtered=allMarks.filter(mark=>{
  const text=[mark.name,mark.description,mark.location?.area,...(mark.species||[])].join(" ").toLowerCase();
  return text.includes(query);
 });
 renderMarks(filtered);
});

loadMarks();
