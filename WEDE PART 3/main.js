// Hope Haven Part 3 - 2.1 + 2.2 Dynamic Content, Search Filter Sort
const programs = [
 {id:1,title:"Education Support",cat:"Education",price:250,spots:12,desc:"After-school tutoring for Grades 1-7 in Soweto, Mon/Wed 15:00.",img:"hope-haven-education-tutoring-soweto.jpg"},
 {id:2,title:"Feeding Scheme",cat:"Feeding",price:50,spots:200,desc:"Nutritious meals daily. R50 feeds 1 child for a week.",img:"hope-haven-feeding-scheme-children.jpg"},
 {id:3,title:"Mentorship Programme",cat:"Mentorship",price:0,spots:8,desc:"1-on-1 mentoring for teens 13-18, life skills and careers.",img:"hope-haven-mentorship-teenagers.jpg"},
 {id:4,title:"Youth Empowerment Workshop",cat:"Education",price:100,spots:30,desc:"CV, interview and study skills workshop, 29 August 2026.",img:"hope-haven-youth-workshop.jpg"},
 {id:5,title:"Holiday Food Parcels",cat:"Feeding",price:150,spots:100,desc:"December food parcels for vulnerable families in Soweto.",img:"hope-haven-food-parcels.jpg"},
 {id:6,title:"Girls Confidence Club",cat:"Mentorship",price:0,spots:15,desc:"Weekly confidence and safety club for girls 10-16.",img:"hope-haven-girls-club.jpg"}
];
const newsPosts = [
 {id:1,title:"New feeding scheme partnership with Soweto primary schools",date:"2026-08-10",cat:"Feeding",text:"We now serve 300 meals daily thanks to our donors."},
 {id:2,title:"Mentorship program graduates its first cohort",date:"2026-07-22",cat:"Mentorship",text:"12 teens graduated, 9 now in high school leadership roles."},
 {id:3,title:"Hope Haven hosts annual community fun day",date:"2026-06-15",cat:"Events",text:"Over 500 children joined us for games, food and prizes."},
 {id:4,title:"Education: 85% pass rate in tutoring programme",date:"2026-05-30",cat:"Education",text:"Our tutoring learners improved maths marks by 22% on average."}
];
// Render programs dynamically - 2.2
function renderPrograms(list){
 const el=document.getElementById('programList'); if(!el) return;
 el.innerHTML=list.map(p=>`<article class="card fade show"><h3>${p.title}</h3><p><b>${p.cat}</b> | R${p.price} | ${p.spots} spots left</p><p>${p.desc}</p><button class="btn" onclick="openModal('${p.title}')">Enquire</button></article>`).join('') || '<p>No programmes found. <button onclick="clearFilters()">Clear filters</button></p>';
}
// Render news dynamically - 2.2
function renderNews(list){
 const el=document.getElementById('newsList'); if(!el) return;
 el.innerHTML=list.map(n=>`<article class="card fade show"><h3>${n.title}</h3><p>${n.date} | ${n.cat}</p><p>${n.text}</p></article>`).join('') || '<p>No stories found.</p>';
}
// Search + Filter + Sort - 2.2
function applyFilters(){
 const q=(document.getElementById('searchBox')?.value||'').toLowerCase();
 const cat=document.getElementById('filterCat')?.value||'All';
 const sort=document.getElementById('sortBy')?.value||'name';
 let list=programs.filter(p=>(cat==='All'||p.cat===cat)&&(p.title.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
 if(sort==='name') list.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==='priceLow') list.sort((a,b)=>a.price-b.price);
 if(sort==='priceHigh') list.sort((a,b)=>b.price-a.price);
 renderPrograms(list);
 // Also filter news by same search
 if(document.getElementById('newsList')){
   renderNews(newsPosts.filter(n=>n.title.toLowerCase().includes(q)||n.text.toLowerCase().includes(q)));
 }
}
function clearFilters(){document.getElementById('searchBox').value='';document.getElementById('filterCat').value='All';applyFilters();}
// Accordion, Tabs, Modal, Lightbox - 2.1
document.addEventListener('click',e=>{
 if(e.target.classList.contains('acc-head')) e.target.parentElement.classList.toggle('open');
 if(e.target.id==='donateBtn') document.getElementById('donateModal').classList.add('open');
 if(e.target.id==='closeModal'||e.target.id==='donateModal') document.getElementById('donateModal').classList.remove('open');
 if(e.target.classList.contains('gallery-img')){document.getElementById('lightboxImg').src=e.target.src;document.getElementById('lightbox').classList.add('open');}
 if(e.target.id==='lightbox'||e.target.id==='closeLightbox') document.getElementById('lightbox').classList.remove('open');
});
function openModal(title){document.getElementById('donateModal').classList.add('open');document.getElementById('modalTitle').textContent='Enquire: '+title;}
// Fade in animation
const obs=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show')}));
document.querySelectorAll('.fade').forEach(el=>obs.observe(el));
// Load on start
renderPrograms(programs); renderNews(newsPosts);
