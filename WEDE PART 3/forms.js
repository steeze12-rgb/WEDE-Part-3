// Hope Haven Part 3 - Form Validation + AJAX + Sanitising
function clean(v){return v.replace(/[<>&"']/g,'').trim();}
function mark(el,ok,errEl,msg){
  el.classList.remove('valid','invalid');
  el.classList.add(ok?'valid':'invalid');
  if(errEl) errEl.textContent = ok?'':msg;
  return ok;
}
function validEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);}
function validPhone(p){return /^0\d{9}$/.test(p.replace(/\s/g,''));} // SA 0825550199

// ENQUIRY FORM - on-page cost / availability response
document.getElementById('enquiryForm')?.addEventListener('submit',async function(e){
  e.preventDefault();
  const name=clean(document.getElementById('eqName').value);
  const email=document.getElementById('eqEmail').value.trim();
  const phone=document.getElementById('eqPhone').value.trim();
  const type=document.getElementById('eqType').value;
  const prog=document.getElementById('eqProgram').value;
  const msg=clean(document.getElementById('eqMsg').value);
  let ok=true;
  ok=mark(document.getElementById('eqName'),name.length>=3,document.getElementById('errName'),'Enter full name, min 3 letters')&&ok;
  ok=mark(document.getElementById('eqEmail'),validEmail(email),document.getElementById('errEmail'),'Enter a valid email e.g. you@gmail.com')&&ok;
  ok=mark(document.getElementById('eqPhone'),validPhone(phone),document.getElementById('errPhone'),'SA number must be 10 digits starting with 0, e.g. 0825550199')&&ok;
  ok=mark(document.getElementById('eqType'),type!=='',document.getElementById('errType'),'Choose an enquiry type')&&ok;
  ok=mark(document.getElementById('eqMsg'),msg.length>=10,document.getElementById('errMsg'),'Message min 10 characters')&&ok;
  if(!ok) return;

  // Cost / availability logic - this is the Part 3 requirement
  const data={
    'Education Support':{cost:'R250 per month',spots:'12 spots left',when:'Mon/Wed 15:00, Soweto'},
    'Feeding Scheme':{cost:'R50 feeds 1 child for a week',spots:'200 meals daily',when:'Daily 12:00'},
    'Mentorship Programme':{cost:'FREE',spots:'8 spots left',when:'Saturdays 10:00'},
    'Youth Empowerment Workshop':{cost:'R100 once-off',spots:'30 spots left',when:'29 August 2026'},
    'Holiday Food Parcels':{cost:'R150 per parcel',spots:'100 parcels left',when:'December 2026'},
    'Girls Confidence Club':{cost:'FREE',spots:'15 spots left',when:'Fridays 15:30'}
  };
  const d=data[prog]||{cost:'We will confirm cost',spots:'Available',when:'We will confirm time'};
  let reply=`Hi ${name}, thanks for enquiring about ${type} - ${prog}. Cost: ${d.cost}. Availability: ${d.spots}. When: ${d.when}.`;
  if(type==='Sponsor') reply+=` Your R500 sponsors 25 meals.`;

  // AJAX - no reload, fake submit like a real backend
  const btn=document.getElementById('eqBtn'); btn.textContent='Sending...'; btn.disabled=true;
  try{ await fetch('https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts&data=05%7C02%7Cst10530908%40rcconnect.edu.za%7C0d72b6cb73f64ad4b6ca08df384c0708%7Ce10c8f44f469448fbc0dd781288ff01b%7C0%7C0%7C639291571997680730%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C60000%7C%7C%7C&sdata=psd9Jz54DtrW%2F%2Fx8Lc9EMpGs5IhPsBVim1KgLoqtd0Q%3D&reserved=0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,type,prog,msg})}); }catch(err){}
  btn.textContent='Check Enquiry'; btn.disabled=false;
  const out=document.getElementById('enquiryResult'); out.style.display='block'; out.textContent=reply;
});

// CONTACT FORM - compiles mailto email
document.getElementById('contactForm')?.addEventListener('submit',async function(e){
  e.preventDefault();
  const name=clean(document.getElementById('ctName').value);
  const email=document.getElementById('ctEmail').value.trim();
  const phone=document.getElementById('ctPhone').value.trim();
  const type=document.getElementById('ctType').value;
  const msg=clean(document.getElementById('ctMsg').value);
  let ok=true;
  ok=mark(document.getElementById('ctName'),name.length>=3,document.getElementById('cerrName'),'Enter full name')&&ok;
  ok=mark(document.getElementById('ctEmail'),validEmail(email),document.getElementById('cerrEmail'),'Enter a valid email')&&ok;
  ok=mark(document.getElementById('ctPhone'),phone===''||validPhone(phone),document.getElementById('cerrPhone'),'SA number 10 digits starting with 0, or leave blank')&&ok;
  ok=mark(document.getElementById('ctMsg'),msg.length>=10,document.getElementById('cerrMsg'),'Message min 10 characters')&&ok;
  if(!ok) return;

  try{ await fetch('https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts&data=05%7C02%7Cst10530908%40rcconnect.edu.za%7C0d72b6cb73f64ad4b6ca08df384c0708%7Ce10c8f44f469448fbc0dd781288ff01b%7C0%7C0%7C639291571997693400%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C60000%7C%7C%7C&sdata=n6jwX3ONkLxsJeMHzKi4KMBwpOerHodNgZB6uA6C%2Frg%3D&reserved=0',{method:'POST',body:JSON.stringify({name,email,msg})}); }catch(err){}
  const subject=encodeURIComponent(`Hope Haven Contact: ${type} - from ${name}`);
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\n\nMessage:\n${msg}`);
  // Recipient is in the code - requirement
  window.location.href=`mailto:info@hopehaven.org.za?subject=${subject}&body=${body}`;
  const out=document.getElementById('contactResult'); out.style.display='block';
  out.textContent=`Thank you ${name}. Your email app should now open addressed to info@hopehaven.org.za. If it did not open, email us directly at info@hopehaven.org.za.`;
});
