const buttons=document.querySelectorAll("[data-section]");
buttons.forEach(button=>button.addEventListener("click",()=>navigate(button.dataset.section)));

let allMarks=[];
let fishingMap=null;
let mapMarkers=[];

function navigate(section){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.section===section));
 const targets={marks:"marks",tides:"conditions",weather:"conditions",submit:"submit",home:null};
 if(targets[section]){
  document.getElementById(targets[section]).scrollIntoView({behavior:"smooth",block:"start"});
  if(section==="marks" && fishingMap) setTimeout(()=>fishingMap.invalidateSize(),250);
 }else window.scrollTo({top:0,behavior:"smooth"});
}

function initialiseMap(){
 const mapElement=document.getElementById("fishing-map");
 if(!mapElement || typeof L==="undefined") return;
 fishingMap=L.map(mapElement,{scrollWheelZoom:false});
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors",maxZoom:18}).addTo(fishingMap);
 fishingMap.setView([54.5,-3.5],5.5);
 renderMapMarkers(allMarks);
}

function renderMapMarkers(marks){
 if(!fishingMap) return;
 mapMarkers.forEach(marker=>marker.remove());
 mapMarkers=[];
 marks.filter(mark=>mark.status==="verified" && Number.isFinite(Number(mark.location?.latitude)) && Number.isFinite(Number(mark.location?.longitude))).forEach(mark=>{
  const accuracy=mark.location?.accuracy==="approximate_venue_midpoint" ? "<br><em>Map position is an approximate venue midpoint.</em>" : "";
  const source=mark.source?.publication ? "<br><br><strong>Source:</strong> "+escapeHtml(mark.source.publication) : "";
  const marker=L.marker([Number(mark.location.latitude),Number(mark.location.longitude)]).addTo(fishingMap);
  marker.bindPopup("<strong>"+escapeHtml(mark.name||"Verified mark")+"</strong><br>"+escapeHtml(mark.location?.area||"")+accuracy+(mark.description?"<br><br>"+escapeHtml(mark.description):"")+source);
  mapMarkers.push(marker);
 });
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
  renderMapMarkers(allMarks);
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
  const species=(mark.species||[]).length ? "<p><strong>Species:</strong> "+escapeHtml(mark.species.join(", "))+"</p>" : "";
  const source=mark.source?.publication ? "<p><strong>Verified source:</strong> "+escapeHtml(mark.source.publication)+"</p>" : "";
  const w3w=mark.location?.what3words ? "<p><strong>What3words:</strong> "+escapeHtml(mark.location.what3words)+"</p>" : "";
  const accuracy=mark.location?.accuracy==="approximate_venue_midpoint" ? "<p><em>Map location is an approximate venue midpoint, not an exact casting position.</em></p>" : "";
  return '<article class="mark-result"><span class="badge '+className+'">'+label+'</span><h3>'+escapeHtml(mark.name||"Unnamed mark")+'</h3><p>'+escapeHtml(mark.description||"No description provided.")+'</p>'+species+source+w3w+accuracy+'</article>';
 }).join("");
}

function escapeHtml(value){
 return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

const search=document.getElementById("search");
if(search) search.addEventListener("input",e=>{
 const query=e.target.value.trim().toLowerCase();
 const filtered=!query?allMarks:allMarks.filter(mark=>{
  const text=[mark.name,mark.description,mark.location?.area,...(mark.species||[])].join(" ").toLowerCase();
  return text.includes(query);
 });
 renderMarks(filtered);
 renderMapMarkers(filtered);
});

const markForm=document.getElementById("mark-form");
if(markForm) markForm.addEventListener("submit",e=>{
 e.preventDefault();
 const message=document.getElementById("submit-message");
 if(message){
  message.hidden=false;
  message.textContent="Thanks. Your mark has been prepared as a community submission. It will not appear as a verified mark until it has been independently checked.";
 }
 markForm.reset();
});

initialiseMap();
loadMarks();
