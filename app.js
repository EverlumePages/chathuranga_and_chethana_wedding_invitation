(() => {
  'use strict';
  const c = window.INVITATION;
  if (!c) return;
  const $ = id => document.getElementById(id);
  const all = selector => [...document.querySelectorAll(selector)];
  const put = (id,value) => {$(id).textContent=value;};
  const date = new Date(`${c.date}T12:00:00+05:30`);
  const formatDate = value => new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:c.timezone}).format(new Date(`${value}T12:00:00+05:30`));
  const shortDate = c.date.split('-').reverse().join(' · ');
  const formatTime = time => {const [h,m]=time.split(':').map(Number);return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;};
  all('[data-first]').forEach(el=>el.textContent=c.names.first);
  all('[data-second]').forEach(el=>el.textContent=c.names.second);
  all('[data-first-si]').forEach(el=>el.textContent=c.names.firstSi || 'චතුරංග');
  all('[data-second-si]').forEach(el=>el.textContent=c.names.secondSi || 'චේතනා');
  all('[data-short-date]').forEach(el=>el.textContent=shortDate);
  all('[data-address]').forEach(el=>el.textContent=c.venue.address);
  all('[data-copy]').forEach(el=>el.textContent=c.copy[el.dataset.copy]);
  all('[data-demo]').forEach(el=>el.hidden=!c.demo);
  put('sinhala-names',c.names.si);put('invitation-si',c.invitationSi);put('invitation-en',c.invitationEn);
  put('hero-date',formatDate(c.date).toUpperCase());put('date-number',date.getUTCDate());
  put('date-weekday',new Intl.DateTimeFormat('en-GB',{weekday:'long',timeZone:c.timezone}).format(date).toUpperCase());
  put('date-month',new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric',timeZone:c.timezone}).format(date));
  put('venue-name',c.venue.name);put('venue-suffix',c.venue.suffix);put('rsvp-deadline',formatDate(c.rsvp.deadline));
  put('contact-display',c.rsvp.display+(c.demo?' · Demo contact':''));
  all('.directions').forEach(el=>{el.href=c.venue.mapUrl;if(c.demo)el.setAttribute('aria-label','ගමන් මඟ · Directions to sample location, Kandy');});
  if(!c.demo) document.querySelector('.mobile-actions a span').textContent='Directions';
  const timeline=$('timeline');timeline.replaceChildren();
  c.schedule.forEach(item=>{const li=document.createElement('li'),time=document.createElement('time'),wrap=document.createElement('div'),title=document.createElement('h3'),sub=document.createElement('p');time.textContent=formatTime(item.time);time.dateTime=`${c.date}T${item.time}:00+05:30`;time.lang='en';title.textContent=item.si;sub.textContent=item.en;sub.lang='en';wrap.append(title,sub);li.append(time,wrap);timeline.append(li);});
  document.title=`${c.names.first} & ${c.names.second} — A Lotus Wedding`;
  document.documentElement.classList.add('js');
  const opening=$('opening'),film=$('film'),invitation=$('invitation'),video=$('invitation-video');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const heroVideo=$('hero-video');
  let heroVisible=false;
  const syncHero=()=>{
    if(!heroVisible || reduced.matches || document.hidden){heroVideo.pause();return;}
    if(!heroVideo.getAttribute('src')) heroVideo.src='images/animated.mp4';
    heroVideo.muted=true;
    heroVideo.play().catch(()=>{});
  };
  new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncHero();},{threshold:0.05}).observe($('home'));
  reduced.addEventListener('change',syncHero);
  document.addEventListener('visibilitychange',syncHero);
  let state='sealed',timer,stallTimer;
  const completed=()=>{try{return sessionStorage.getItem('lotus-opened')==='yes';}catch{return false;}};
  const showInvitation=(focus=true)=>{clearTimeout(timer);clearTimeout(stallTimer);state='invitation';video.pause();opening.hidden=true;film.hidden=true;invitation.hidden=false;invitation.classList.add('invitation-visible');try{sessionStorage.setItem('lotus-opened','yes');}catch{}window.scrollTo(0,0);if(focus)$('invitation-heading').focus({preventScroll:true});};
  const playFilm=()=>{state='video';opening.hidden=true;film.hidden=false;video.muted=true;$('sound').textContent='Sound off';$('sound').setAttribute('aria-pressed','false');if(!video.getAttribute('src'))video.src='assets/couple-intro.mp4';video.currentTime=0;$('skip-film').focus({preventScroll:true});video.play().catch(()=>showInvitation());stallTimer=setTimeout(()=>{if(state==='video')showInvitation();},20000);};
  const open=()=>{if(state!=='sealed')return;if(reduced.matches){playFilm();return;}state='opening';if(!video.getAttribute('src')){video.src='assets/couple-intro.mp4';video.load();}$('envelope').classList.add('seal-breaking');timer=setTimeout(playFilm,240);};
  $('open-seal').addEventListener('click',open);$('open-label').addEventListener('click',open);
  $('skip-opening').addEventListener('click',()=>showInvitation());$('skip-film').addEventListener('click',()=>showInvitation());
  video.addEventListener('ended',()=>showInvitation());video.addEventListener('error',()=>{if(state==='video')showInvitation();});
  $('sound').addEventListener('click',()=>{video.muted=!video.muted;$('sound').textContent=video.muted?'Sound off':'Sound on';$('sound').setAttribute('aria-pressed',String(!video.muted));});
  $('replay').addEventListener('click',()=>{invitation.hidden=true;invitation.classList.remove('invitation-visible');window.scrollTo(0,0);if(reduced.matches){playFilm();return;}state='sealed';$('envelope').classList.remove('seal-breaking');opening.hidden=false;$('open-seal').focus();});
  const dialog=$('rsvp-dialog');
  all('.rsvp-button').forEach(button=>button.addEventListener('click',()=>{const number=c.rsvp.number.replace(/\D/g,'');if(c.demo||!/^94\d{9}$/.test(number)){dialog.showModal();return;}const message=`ආයුබෝවන්! ${c.names.first} & ${c.names.second} — wedding RSVP\nනම / Name: \nසහභාගීත්වය / Attending: \nඅමුත්තන් ගණන / Party size: `;window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');}));
  $('close-dialog').addEventListener('click',()=>dialog.close());$('dialog-done').addEventListener('click',()=>dialog.close());
  // Reveal content once as it enters the viewport; backgrounds and controls stay steady.
  if ('IntersectionObserver' in window) {
    const groups=[
      '.hero-content > *', '.invitation-wording > *', '.day-section .section-heading > *',
      '.day-section .date-card', '.timeline > li', '.venue-art', '.venue-content > *',
      '.rsvp-section > :not(noscript)', '.closing > *'
    ];
    const revealItems=[];
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(({target,isIntersecting})=>{
        if(!isIntersecting) return;
        target.classList.add('is-revealed');
        revealObserver.unobserve(target);
      });
    },{threshold:0.08,rootMargin:'0px 0px -28px 0px'});
    groups.forEach(selector=>all(selector).forEach((el,index)=>{
      if(el.hidden) return;
      el.style.setProperty('--reveal-delay',`${Math.min(index,3)*65}ms`);
      el.classList.add('scroll-reveal');
      if(el.matches('.venue-art, .date-card')) el.classList.add('reveal-bloom');
      revealItems.push(el);
      if(reduced.matches) el.classList.add('is-revealed');
      else revealObserver.observe(el);
    }));
    invitation.addEventListener('focusin',event=>{
      const el=event.target.closest('.scroll-reveal');
      if(el){el.style.setProperty('--reveal-delay','0ms');el.classList.add('is-revealed');revealObserver.unobserve(el);}
    });
    reduced.addEventListener('change',()=>{
      if(reduced.matches){revealObserver.disconnect();revealItems.forEach(el=>el.classList.add('is-revealed'));}
    });
  }
  if(completed()||reduced.matches||location.hash){showInvitation(false);if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());}}else{opening.hidden=false;invitation.hidden=true;}
})();
