const buttons=document.querySelectorAll("[data-section]");
buttons.forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.section)));

let allMarks=[], fishingMap=null, mapMarkers=[], radiusCentre=null;

function navigate(section){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.section===section));
 const target={marks:"marks",tides:"conditions",weather:"conditions",submit:"submit",gallery:"gallery","fish-id":"fish-id",home:null}[section];
 if(target){document.getElementById(target).scrollIntoView({behavior:"smooth"});if(section==="marks"&&fishingMap)setTimeout(()=>fishingMap.invalidateSize(),250)}
 else window.scrollTo({top:0,behavior:"smooth"});
}

function initialiseMap(){
 const el=document.getElementById("fishing-map"); if(!el||typeof L==="undefined")return;
 fishingMap=L.map(el,{scrollWheelZoom:false});
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors",maxZoom:18}).addTo(fishingMap);
 fishingMap.setView([54.5,-3.5],5.5); renderMapMarkers(allMarks);
}

function renderMapMarkers(marks){
 if(!fishingMap)return;
 mapMarkers.forEach(m=>m.remove()); mapMarkers=[];
 marks.filter(m=>m.status==="verified"&&Number.isFinite(Number(m.location?.latitude))&&Number.isFinite(Number(m.location?.longitude))).forEach(mark=>{
  const marker=L.marker([+mark.location.latitude,+mark.location.longitude]).addTo(fishingMap);
  const accuracy=mark.location?.accuracy==="approximate_venue_midpoint"?"<br><em>Approximate venue midpoint.</em>":mark.location?.accuracy==="area_only"?"<br><em>Fishing area only — no exact GPS position published.</em>":"";
  marker.bindPopup("<strong>"+escapeHtml(mark.name||"Verified mark")+"</strong><br>"+escapeHtml(mark.location?.area||"")+accuracy+'<br><button type="button" class="map-view-mark" data-open-mark="'+escapeHtml(mark.id||"")+'">View fishing mark details</button>');
  marker.on("click",()=>{const card=document.getElementById("mark-"+mark.id);if(card){document.querySelectorAll(".mark-result.map-selected").forEach(x=>x.classList.remove("map-selected"));card.classList.add("map-selected");setTimeout(()=>card.scrollIntoView({behavior:"smooth",block:"center"}),150);}});
  mapMarkers.push(marker);
 });
 if(radiusCentre&&marks.length&&Number.isFinite(radiusCentre.lat))fishingMap.setView([radiusCentre.lat,radiusCentre.lon],9);
}

function countyOf(mark){
 const area=mark.location?.area||"";
 return area.split(",").pop().trim()||"Unknown";
}

function milesBetween(a,b,c,d){
 const R=3958.7613, p=Math.PI/180, x=(c-a)*p, y=(d-b)*p;
 const q=Math.sin(x/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin(y/2)**2;
 return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
}

function populateCounties(){
 const select=document.getElementById("county-filter"); if(!select)return;
 [...new Set(allMarks.map(countyOf))].sort((a,b)=>a.localeCompare(b)).forEach(c=>{
  const o=document.createElement("option");o.value=c;o.textContent=c;select.appendChild(o);
 });
}

function refreshMarkResults(){
 const q=document.getElementById("search")?.value.trim().toLowerCase()||"";
 const county=document.getElementById("county-filter")?.value||"";
 const radius=Number(document.getElementById("radius-filter")?.value||10);
 let marks=allMarks.filter(m=>{
  const text=[m.name,m.description,m.location?.area,...(m.species||[])].join(" ").toLowerCase();
  return (!q||text.includes(q))&&(!county||countyOf(m)===county)&&(!document.getElementById("easy-access-filter")?.checked||m.easy_access===true)&&(!document.getElementById("accessible-filter")?.checked||m.accessible_access===true);
 });
 if(radiusCentre){
  marks=marks.map(m=>{
   const lat=Number(m.location?.latitude),lon=Number(m.location?.longitude);
   return {...m,_distance:Number.isFinite(lat)&&Number.isFinite(lon)?milesBetween(radiusCentre.lat,radiusCentre.lon,lat,lon):Infinity};
  }).filter(m=>m._distance<=radius).sort((a,b)=>a._distance-b._distance);
 }
 renderMarks(marks);renderMapMarkers(marks);
 const s=document.getElementById("result-summary");
 if(s)s.textContent=radiusCentre?marks.length+" verified mark"+(marks.length===1?"":"s")+" within "+radius+" miles":marks.length+" mark"+(marks.length===1?"":"s")+" shown";
}


function markAreaName(mark){
 const parts=String(mark.location?.area||"").split(",").map(x=>x.trim()).filter(Boolean);
 return parts.length?parts[parts.length-1]:"Other areas";
}
function renderAreaDirectory(){
 const directory=document.getElementById("area-directory");if(!directory)return;
 const verified=allMarks.filter(m=>m.status==="verified");
 const areas=[...new Set(verified.map(markAreaName))].sort((a,b)=>a.localeCompare(b));
 if(!areas.length){directory.innerHTML='<div class="empty-state"><strong>No verified areas available yet</strong><p>New areas will appear when genuine fishing marks have been checked.</p></div>';return}
 directory.innerHTML=areas.map(area=>{
  const marks=verified.filter(m=>markAreaName(m)===area);
  const species=[...new Set(marks.flatMap(m=>m.species||[]))];
  return '<button type="button" class="area-card" data-open-area="'+escapeHtml(area)+'"><span class="area-card-icon">🧭</span><strong>'+escapeHtml(area)+'</strong><span>'+marks.length+' verified mark'+(marks.length===1?'':'s')+'</span><small>'+(species.length?escapeHtml(species.slice(0,4).join(' · ')):'Species information being checked')+'</small><b>Open area guide →</b></button>';
 }).join("");
}
function openAreaGuide(area){
 const detail=document.getElementById("area-detail");if(!detail)return;
 const marks=allMarks.filter(m=>m.status==="verified"&&markAreaName(m)===area);
 const species=[...new Set(marks.flatMap(m=>m.species||[]))].sort((a,b)=>a.localeCompare(b));
 const markRows=marks.map(m=>'<article class="area-mark"><div><strong>'+escapeHtml(m.name)+'</strong><span class="badge verified">Verified mark</span></div><p>'+escapeHtml(m.description||"No description recorded.")+'</p>'+(m.parking?'<p><strong>Parking:</strong> '+escapeHtml(m.parking)+'</p>':'')+(m.access?'<p><strong>Access:</strong> '+escapeHtml(m.access)+'</p>':'')+(m.source?.url?'<p><a href="'+escapeHtml(m.source.url)+'" target="_blank" rel="noopener noreferrer">View source / verification ↗</a></p>':'')+'</article>').join("");
 detail.hidden=false;
 detail.innerHTML='<div class="area-detail-head"><div><p class="eyebrow">AREA ENCYCLOPAEDIA</p><h3>'+escapeHtml(area)+'</h3><p>One place for the fishing information currently recorded for this area.</p></div><button type="button" class="secondary" id="close-area-guide">Close</button></div><div class="area-action-grid"><button type="button" class="area-action" data-area-action="weather"><span>☁️</span><strong>Weather</strong><small>Local 36-hour forecast</small></button><button type="button" class="area-action" data-area-action="tides"><span>🌊</span><strong>Tides</strong><small>Official tide predictions</small></button><button type="button" class="area-action" data-area-action="fish"><span>🐟</span><strong>Fish ID</strong><small>Species and restrictions</small></button></div><div class="area-info-grid"><section class="area-info"><h4>Fishing marks</h4><p>'+marks.length+' verified mark'+(marks.length===1?'':'s')+' currently recorded for '+escapeHtml(area)+'.</p>'+markRows+'</section><section class="area-info"><h4>Species recorded</h4>'+(species.length?'<div class="species-chips">'+species.map(s=>'<span>'+escapeHtml(s)+'</span>').join('')+'</div>':'<p>No species information has been verified for this area yet.</p>')+'<h4>Bait & tactics</h4><p>Area-specific bait and tactics will only be published when supported by a reliable source or clearly labelled angler contribution. No local advice has been independently verified for this area yet.</p><h4>Local knowledge & gallery</h4><p>Photos and angler tips can be collected here. Community contributions will be labelled unverified until checked.</p><button type="button" class="secondary" data-area-action="gallery">Open angler gallery</button><button type="button" class="secondary" data-area-action="submit">Suggest local information</button></section></div>';
 detail.scrollIntoView({behavior:"smooth",block:"start"});
 detail.querySelector("#close-area-guide")?.addEventListener("click",()=>{detail.hidden=true;document.getElementById("area-directory")?.scrollIntoView({behavior:"smooth",block:"center"})});
 detail.querySelectorAll("[data-area-action]").forEach(button=>button.addEventListener("click",()=>{
  const action=button.dataset.areaAction;
  if(action==="weather"||action==="tides"){
   const input=document.getElementById("conditions-place");if(input)input.value=area;
   document.getElementById("conditions")?.scrollIntoView({behavior:"smooth",block:"start"});
   if(action==="weather")loadConditions();
   else document.querySelector(".tide-link")?.focus();
  }else if(action==="fish-id")navigate("fish-id");
  else if(action==="gallery")navigate("gallery");
  else if(action==="submit")navigate("submit");
 }));
}
document.getElementById("area-directory")?.addEventListener("click",e=>{
 const card=e.target.closest("[data-open-area]");if(card)openAreaGuide(card.dataset.openArea);
});

function renderMarks(marks){
 const c=document.querySelector(".marks-list");if(!c)return;
 if(!marks.length){c.innerHTML='<div class="empty-state"><strong>No matching marks</strong><p>Try a larger radius or another county. No unverified data is promoted as verified.</p></div>';return}
 c.innerHTML=marks.map(m=>{
  const historical=m.status==="historical";
  const label=m.status==="verified"?"Verified mark":historical?"Historical mark":m.status==="community_unverified"?"Community submission — unverified":"Unverified mark";
  const cls=m.status==="verified"?"verified":historical?"historical":"unverified";
  const lastChecked=m.source?.checked_at?"<p><strong>Last checked:</strong> "+escapeHtml(m.source.checked_at)+"</p>":"<p><strong>Last checked:</strong> Not recorded</p>";
  const historicalWarning=historical?"<p class=\"historical-warning\"><strong>Historical information:</strong> this is a genuine recorded mark, but current access, conditions and restrictions have not been confirmed. Check locally before fishing.</p>":"";
  const dist=Number.isFinite(m._distance)?"<p><strong>Distance:</strong> "+m._distance.toFixed(1)+" miles</p>":"";
  const rating=m.rating&&Number(m.rating.count)>0?"<p><strong>★★★★★</strong> "+Number(m.rating.average).toFixed(1)+" / 5 ("+m.rating.count+" ratings)</p>":"<p><strong>★★★★★</strong> Not yet rated</p>";
  const species=(m.species||[]).length?"<p><strong>Species:</strong> "+escapeHtml(m.species.join(", "))+"</p>":"";
  const source=m.source?.publication?"<p><strong>Verified source:</strong> "+escapeHtml(m.source.publication)+"</p>":"";
  const access=m.access?"<p><strong>Access:</strong> "+escapeHtml(m.access)+"</p>":"";
  const report='<button class="report-button" type="button" data-report-mark="'+escapeHtml(m.id||"")+'" data-report-name="'+escapeHtml(m.name||"this mark")+'">🚨 Report a problem with this mark</button>';
  const parking=m.parking?"<p><strong>Parking:</strong> "+escapeHtml(m.parking)+"</p>":"";
  const accuracy=m.location?.accuracy==="approximate_venue_midpoint"?"<p><em>Map position is an approximate venue midpoint, not an exact casting position.</em></p>":m.location?.accuracy==="area_only"?"<p><em>Fishing area only — no exact GPS position published. Parking/access may be mapped separately.</em></p>":"";
  return '<article class="mark-result" id="mark-'+escapeHtml(m.id||"")+'"><span class="badge '+cls+'">'+label+'</span><h3>'+escapeHtml(m.name||"Unnamed mark")+'</h3><p>'+escapeHtml(m.description||"No description provided.")+'</p>'+dist+rating+species+source+lastChecked+historicalWarning+parking+access+accuracy+report+'</article>';
 }).join("");
}

function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

function addDiscoveryControls(){
 const marks=document.getElementById("marks"); if(!marks||document.getElementById("county-filter"))return;
 const tools=document.createElement("div"); tools.className="browse-tools";
 tools.innerHTML='<label>County / area<select id="county-filter"><option value="">All UK marks</option></select></label><label>Find nearby marks<input id="radius-place" placeholder="Town, village or postcode"></label><div class="radius-row"><label>Radius<select id="radius-filter"><option value="5">5 miles</option><option value="10" selected>10 miles</option><option value="25">25 miles</option><option value="50">50 miles</option><option value="100">100 miles</option></select></label><button class="secondary" id="find-radius">Find nearby</button><button class="secondary" id="use-location">Use my location</button><button class="secondary" id="clear-radius">Clear</button></div><p id="radius-status" class="tool-status">Enter a town such as Felinheli, or use your location, to see nearby verified marks.</p>';
 marks.querySelector(".section-head")?.after(tools);
}
addDiscoveryControls();

async function geocode(place){
 const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=gb&q="+encodeURIComponent(place);
 const r=await fetch(url,{headers:{Accept:"application/json"}});if(!r.ok)throw Error("Location search failed");
 const data=await r.json();if(!data.length)throw Error("Location not found");
 return {lat:+data[0].lat,lon:+data[0].lon,label:data[0].display_name};
}

async function setRadiusFromPlace(place){
 const status=document.getElementById("radius-status");
 if(status)status.textContent="Finding "+place+"…";
 try{radiusCentre=await geocode(place);if(status)status.textContent="Showing verified marks near "+radiusCentre.label;refreshMarkResults()}
 catch(e){radiusCentre=null;if(status)status.textContent="Location not found. Try a town, village or UK postcode.";refreshMarkResults()}
}

const place=document.getElementById("radius-place");
document.getElementById("find-radius")?.addEventListener("click",()=>{if(place?.value.trim())setRadiusFromPlace(place.value.trim())});
place?.addEventListener("keydown",e=>{if(e.key==="Enter"&&place.value.trim())setRadiusFromPlace(place.value.trim())});
document.getElementById("use-location")?.addEventListener("click",()=>{
 const status=document.getElementById("radius-status");
 if(!navigator.geolocation){if(status)status.textContent="Location services are not available in this browser.";return}
 if(status)status.textContent="Requesting your location…";
 navigator.geolocation.getCurrentPosition(p=>{radiusCentre={lat:p.coords.latitude,lon:p.coords.longitude,label:"your location"};if(status)status.textContent="Showing verified marks near your location.";refreshMarkResults()},()=>{if(status)status.textContent="Location permission was not available. Enter a town or postcode instead."});
});
document.getElementById("clear-radius")?.addEventListener("click",()=>{radiusCentre=null;if(place)place.value="";document.getElementById("radius-status").textContent="Nearby search cleared.";refreshMarkResults()});
document.getElementById("radius-filter")?.addEventListener("change",refreshMarkResults);
document.getElementById("county-filter")?.addEventListener("change",refreshMarkResults);
document.getElementById("search")?.addEventListener("input",refreshMarkResults);
document.getElementById("easy-access-filter")?.addEventListener("change",refreshMarkResults);
document.getElementById("accessible-filter")?.addEventListener("change",refreshMarkResults);

async function loadMarks(){
 const c=document.querySelector(".marks-list");if(!c)return;
 try{
  const r=await fetch("data/marks.json");if(!r.ok)throw Error();
  const d=await r.json();allMarks=Array.isArray(d.marks)?d.marks:[];
  populateCounties();refreshMarkResults();renderAreaDirectory();
 }catch(e){c.innerHTML='<div class="empty-state"><strong>Fishing marks unavailable</strong><p>Mark data could not be loaded. No unverified information has been added as a fallback.</p></div>'}
}

document.addEventListener("click",e=>{const open=e.target.closest("[data-open-mark]");if(open){const card=document.getElementById("mark-"+open.dataset.openMark);if(card){document.querySelectorAll(".mark-result.map-selected").forEach(x=>x.classList.remove("map-selected"));card.classList.add("map-selected");card.scrollIntoView({behavior:"smooth",block:"center"});}return;}const b=e.target.closest("[data-report-mark]");if(!b)return;const form=document.getElementById("problem-form");if(form){form.dataset.markId=b.dataset.reportMark;form.dataset.markName=b.dataset.reportName;form.scrollIntoView({behavior:"smooth",block:"center"});const details=form.querySelector('[name="details"]');if(details)details.value="Problem with "+b.dataset.reportName+": ";}});

document.getElementById("problem-form")?.addEventListener("submit",e=>{e.preventDefault();const form=e.currentTarget;const data=Object.fromEntries(new FormData(form).entries());data.mark_id=form.dataset.markId||"";data.mark_name=form.dataset.markName||"General report";data.reported_at=new Date().toISOString();const reports=JSON.parse(localStorage.getItem("ukSeaFishingProblemReports")||"[]");reports.push(data);localStorage.setItem("ukSeaFishingProblemReports",JSON.stringify(reports));const msg=document.getElementById("problem-message");if(msg){msg.hidden=false;msg.textContent="Thank you. Your report has been saved for review. It will not automatically change verified information."; }form.reset();});

document.getElementById("mark-form")?.addEventListener("submit",e=>{
 e.preventDefault();const m=document.getElementById("submit-message");
 if(m){m.hidden=false;m.textContent="Thanks. Your mark has been prepared as a community submission. It will not appear as verified until independently checked."}
 e.target.reset();
});

initialiseMap();loadMarks();
const fishRules=[
 {name:"Bass",scientific:"Dicentrarchus labrax",size:"42 cm",catch:"3 retained fish per person per day outside 1 February–31 March in the covered UK waters.",season:"1 February–31 March: recreational rod-and-handline fishing is catch-and-release in the covered UK areas.",notes:"Bass nursery areas and local restrictions can also apply.",source:"MMO MCRS guidance"},
 {name:"Cod",scientific:"Gadus morhua",size:"35 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Haddock",scientific:"Melanogrammus aeglefinus",size:"30 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Hake",scientific:"Merluccius merluccius",size:"27 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Herring",scientific:"Clupea harengus",size:"20 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Horse mackerel / Scad",scientific:"Trachurus trachurus",size:"15 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Plaice",scientific:"Pleuronectes platessa",size:"27 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Pollack",scientific:"Pollachius pollachius",size:"30 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Whiting",scientific:"Merlangius merlangus",size:"27 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Ling",scientific:"Molva molva",size:"63 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Rules can vary by area and fishery.",source:"MMO MCRS guidance"},
 {name:"Brill",scientific:"Scophthalmus rhombus",size:"30 cm in ICES 7d/7e",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"The listed size applies to ICES areas 7d/7e.",source:"MMO MCRS guidance"},
 {name:"Mackerel",scientific:"Scomber scombrus",size:"20 cm generally; 30 cm in the North Sea",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Minimum size varies by area.",source:"MMO MCRS guidance"},
  {name:"Flounder",scientific:"Platichthys flesus",size:"No national MCRS listed in the current MMO MCRS table.",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Local IFCA, Welsh Government, Scottish or Northern Ireland rules may apply.",source:"MMO MCRS guidance"},
  {name:"Dab",scientific:"Limanda limanda",size:"No national MCRS listed in the current MMO MCRS table.",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Local IFCA, Welsh Government, Scottish or Northern Ireland rules may apply.",source:"MMO MCRS guidance"},
  {name:"Sole",scientific:"Solea spp.",size:"24 cm",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Local rules may be stricter.",source:"MMO MCRS guidance"},
  {name:"Pouting",scientific:"Trisopterus luscus",size:"No national MCRS listed in the current MMO MCRS table.",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"Often called bib in some areas; local rules may apply.",source:"MMO MCRS guidance"},
  {name:"Smoothhound",scientific:"Mustelus spp.",size:"No national MCRS currently listed.",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"The Southern North Sea Fisheries Management Plan says introduction of an MCRS for smoothhound is being considered, so check current local rules.",source:"MMO / Southern North Sea FMP"},
  {name:"Dogfish",scientific:"Scyliorhinus canicula / Mustelus spp. depending on species",size:"No national MCRS listed in the current MMO MCRS table.",catch:"No national recreational daily bag limit stated in the MMO MCRS guidance.",season:"Check current local and seasonal rules before retaining.",notes:"'Dogfish' can refer to more than one species. Check species identification and local rules.",source:"MMO MCRS guidance"}
];
function renderFishId(){
 const c=document.getElementById("fish-results"); if(!c)return;
 const q=document.getElementById("fish-search")?.value.trim().toLowerCase()||"";
 const rows=fishRules.filter(f=>[f.name,f.scientific,f.notes,f.protection].join(" ").toLowerCase().includes(q));
 c.innerHTML=rows.map(f=>'<article class="fish-result '+(f.protection?"protected-fish":"")+'">'+(f.protection?'<div class="fish-protection">'+escapeHtml(f.protection)+'</div>':"")+'<div><span class="fish-name">'+escapeHtml(f.name)+'</span><small>'+escapeHtml(f.scientific)+'</small></div><p><strong>Minimum size:</strong> '+escapeHtml(f.size)+'</p><p><strong>Recreational catch:</strong> '+escapeHtml(f.catch)+'</p><p><strong>Season / timing:</strong> '+escapeHtml(f.season)+'</p><p><strong>Notes:</strong> '+escapeHtml(f.notes)+'</p></article>').join("")||'<div class="empty-state"><strong>No species found</strong><p>Try another fish name.</p></div>';
}
document.getElementById("fish-search")?.addEventListener("input",renderFishId);
renderFishId();



function renderGallery(){
 const grid=document.getElementById("gallery-grid"); if(!grid)return;
 const photos=JSON.parse(localStorage.getItem("ukSeaFishingGallery")||"[]");
 if(!photos.length){grid.innerHTML='<div class="empty-state"><strong>No gallery photos yet</strong><p>Be one of the first anglers to share a catch or location photo.</p></div>';return}
 grid.innerHTML=photos.map(p=>'<figure class="gallery-item"><img src="'+p.dataUrl+'" alt="'+escapeHtml(p.caption||"Angler gallery photo")+'"><figcaption>'+escapeHtml(p.caption||"UK coastal fishing photo")+'</figcaption></figure>').join("");
}
document.getElementById("gallery-upload")?.addEventListener("click",async()=>{
 const input=document.getElementById("gallery-files"), caption=document.getElementById("gallery-caption"), msg=document.getElementById("gallery-message");
 if(!input?.files?.length){if(msg){msg.hidden=false;msg.textContent="Choose at least one photo first."}return}
 if(msg){msg.hidden=false;msg.textContent="Gallery uploads are currently a local prototype. Premium access and central photo storage will be connected later."}
 const photos=JSON.parse(localStorage.getItem("ukSeaFishingGallery")||"[]");
 for(const file of [...input.files].slice(0,6)){
  if(!file.type.startsWith("image/"))continue;
  const dataUrl=await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.readAsDataURL(file)});
  photos.unshift({dataUrl,caption:caption?.value.trim()||"",uploaded_at:new Date().toISOString()});
 }
 localStorage.setItem("ukSeaFishingGallery",JSON.stringify(photos.slice(0,60)));
 input.value="";if(caption)caption.value="";renderGallery();
});
renderGallery();


async function loadConditions(){
 const place=document.getElementById("conditions-place")?.value.trim();
 const status=document.getElementById("conditions-status");
 const results=document.getElementById("weather-results");
 if(!place){if(status)status.textContent="Enter a coastal town or harbour first.";return}
 if(status)status.textContent="Finding "+place+" and loading the forecast…";
 if(results)results.innerHTML='<p class="condition-placeholder">Loading local weather…</p>';
 try{
  const location=await geocode(place);
  const url="https://api.open-meteo.com/v1/forecast?latitude="+location.lat+"&longitude="+location.lon+"&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=3&timezone=auto";
  const response=await fetch(url);if(!response.ok)throw Error("Weather service unavailable");
  const data=await response.json();
  const codeLabel=code=>({0:"Clear",1:"Mostly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Freezing fog",51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",61:"Light rain",63:"Rain",65:"Heavy rain",71:"Light snow",73:"Snow",75:"Heavy snow",80:"Rain showers",81:"Showers",82:"Heavy showers",95:"Thunderstorms",96:"Thunderstorms with hail",99:"Severe thunderstorms"}[code]||"Changeable");
  const direction=deg=>{const dirs=["N","NE","E","SE","S","SW","W","NW"];return dirs[Math.round((Number(deg)||0)/45)%8]};
  const now=new Date();
  const times=data.hourly.time.map((t,i)=>({t:new Date(t),i})).filter(x=>x.t>=now&&x.t<=new Date(now.getTime()+36*60*60*1000)).filter((x)=>x.t.getHours()%3===0).slice(0,12);
  const current=data.current;
  const rows=times.map(x=>'<div class="weather-hour"><span>'+x.t.toLocaleString("en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})+'</span><span>'+Math.round(data.hourly.temperature_2m[x.i])+'°C · '+escapeHtml(codeLabel(data.hourly.weather_code[x.i]))+'</span><span>Wind '+Math.round(data.hourly.wind_speed_10m[x.i])+' km/h '+direction(data.hourly.wind_direction_10m[x.i])+'</span><span>Rain '+(data.hourly.precipitation_probability[x.i]??0)+'%</span></div>').join("");
  if(results)results.innerHTML='<div class="weather-current"><strong>'+Math.round(current.temperature_2m)+'°C</strong><span>'+escapeHtml(codeLabel(current.weather_code))+' · feels like '+Math.round(current.apparent_temperature)+'°C</span><span>Wind '+Math.round(current.wind_speed_10m)+' km/h '+direction(current.wind_direction_10m)+' · gusts '+Math.round(current.wind_gusts_10m)+' km/h</span><span>Humidity '+Math.round(current.relative_humidity_2m)+'%</span></div><div class="weather-hour-list">'+rows+'</div><small>Forecast for '+escapeHtml(location.label)+'. Weather from Open-Meteo; forecast values can change.</small>';
  if(status)status.textContent="Weather loaded for "+location.label+". Forecast shown for the next 36 hours.";
 }catch(error){
  if(status)status.textContent="Could not load conditions for that place. Try a nearby town or harbour.";
  if(results)results.innerHTML='<p class="condition-placeholder">Weather could not be loaded just now. Please try again.</p>';
 }
}
document.getElementById("load-conditions")?.addEventListener("click",loadConditions);
document.getElementById("conditions-place")?.addEventListener("keydown",e=>{if(e.key==="Enter")loadConditions()});
