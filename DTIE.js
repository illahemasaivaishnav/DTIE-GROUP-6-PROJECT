// Mobile menu
  const menu = document.getElementById('menu');
  document.getElementById('menuBtn').onclick = () => menu.classList.toggle('open');
  menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Checklist
  const items = ['Drinking water (4 L per person per day)','Non-perishable food (3 days)','First-aid kit & medicines','Torch with extra batteries','Power bank & phone charger','Whistle','Copies of ID & documents','Cash in small notes','Blankets / warm clothing','Battery or hand-crank radio','Masks & sanitiser','Family contact list'];
  const list = document.getElementById('checklist');
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem('dr_kit') || '[]'); } catch(e){}
  items.forEach((t,i) => {
    const l = document.createElement('label'); l.className = 'check';
    l.innerHTML = `<input type="checkbox" ${saved.includes(i)?'checked':''}><span>${t}</span>`;
    l.querySelector('input').onchange = update;
    list.appendChild(l);
  });
  function update(){
    const boxes = [...list.querySelectorAll('input')];
    const done = boxes.map((b,i)=>b.checked?i:null).filter(v=>v!==null);
    try { localStorage.setItem('dr_kit', JSON.stringify(done)); } catch(e){}
    document.getElementById('progBar').style.width = (done.length/items.length*100)+'%';
    document.getElementById('progLabel').textContent = `${done.length} of ${items.length} packed`;
  }
  update();

  // Quiz
  const Q = [
    {q:'What should you do during an earthquake?',o:['Run outside immediately','Drop, Cover, and Hold On','Stand in a doorway','Use the lift'],a:1},
    {q:'What is the emergency number for all services in India?',o:['911','999','112','100 only'],a:2},
    {q:'How much drinking water per person per day should you store?',o:['0.5 litre','1 litre','2 litres','About 4 litres'],a:3},
    {q:'Is it safe to drive through floodwater?',o:['Yes, if it looks shallow','Only in an SUV','No, never','Yes, at high speed'],a:2},
    {q:'During a fire in a building you should…',o:['Use the lift','Stay low and use the stairs','Open all windows','Hide in a bathroom'],a:1}
  ];
  let qi = 0, score = 0;
  const body = document.getElementById('quizBody'), next = document.getElementById('nextBtn'), step = document.getElementById('quizStep');
  function show(){
    next.classList.add('hidden');
    if(qi >= Q.length){
      body.innerHTML = `<h3>You scored ${score} / ${Q.length} ${score>=4?'🎉':'💪'}</h3><p>${score>=4?'Great job! You are well prepared.':'Review the sections above and try again.'}</p><br><button class="btn btn-primary" onclick="qi=0;score=0;show()">Retake quiz</button>`;
      step.textContent = ''; return;
    }
    const c = Q[qi];
    step.textContent = `Question ${qi+1} of ${Q.length}`;
    body.innerHTML = `<h3>${c.q}</h3>` + c.o.map((t,i)=>`<button class="opt" data-i="${i}">${t}</button>`).join('');
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      body.querySelectorAll('.opt').forEach(x => x.disabled = true);
      body.querySelectorAll('.opt')[c.a].classList.add('correct');
      if(i === c.a) score++; else b.classList.add('wrong');
      next.textContent = qi === Q.length-1 ? 'See result' : 'Next';
      next.classList.remove('hidden');
    });
  }
  next.onclick = () => { qi++; show(); };
  show();

  // Contact form
  document.getElementById('contactForm').onsubmit = e => {
    e.preventDefault();
    document.getElementById('formMsg').textContent = 'Thank you! We will get back to you soon.';
    e.target.reset();
  };